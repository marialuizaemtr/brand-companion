import { useMemo, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { gestao } from '@/lib/gestaoClient'
import jsPDF from 'jspdf'

type StepStatus = 'pending' | 'running' | 'ok' | 'fail'
interface Step {
  id: string
  label: string
  status: StepStatus
  startedAt?: string
  finishedAt?: string
  durationMs?: number
  detail?: string
  payload?: unknown
  response?: unknown
  error?: unknown
}

const initialSteps = (): Step[] => [
  { id: 'gestao-rpc', label: '1. Gestão Supabase — RPC upsert_lead', status: 'pending' },
  { id: 'notion', label: '2. Notion — edge function notion-form', status: 'pending' },
  { id: 'email', label: '3. Email — edge function notify-lead-email', status: 'pending' },
  { id: 'whatsapp', label: '4. WhatsApp — edge function notify-whatsapp', status: 'pending' },
]

const ts = () => new Date().toISOString()

const newCorrelationId = () => {
  const rnd = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2) + Date.now().toString(36))
  return `dbg-${rnd}`
}

export default function Debug() {
  const [steps, setSteps] = useState<Step[]>(initialSteps())
  const [running, setRunning] = useState(false)
  const [correlationId, setCorrelationId] = useState<string>('')
  const [form, setForm] = useState({
    nome: 'TESTE Debug',
    email: 'debug@permarke.com.br',
    whatsapp: '+55 11 90000-0000',
    marca: 'MarcaDebug',
    segmento: 'Moda',
  })

  const update = (id: string, patch: Partial<Step>) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  const runStep = async <T,>(id: string, payload: unknown, fn: () => Promise<T>) => {
    const startedAt = ts()
    const t0 = performance.now()
    update(id, { status: 'running', startedAt, payload, finishedAt: undefined, durationMs: undefined, detail: undefined, response: undefined, error: undefined })
    try {
      const response = await fn()
      const durationMs = Math.round(performance.now() - t0)
      update(id, { status: 'ok', finishedAt: ts(), durationMs, response, detail: 'OK' })
      return { ok: true, response }
    } catch (err: any) {
      const durationMs = Math.round(performance.now() - t0)
      update(id, {
        status: 'fail',
        finishedAt: ts(),
        durationMs,
        error: { message: err?.message, name: err?.name, details: err?.details, hint: err?.hint, code: err?.code, stack: err?.stack },
        detail: err?.message || 'Falhou',
      })
      return { ok: false, error: err }
    }
  }

  const handleRun = async () => {
    setRunning(true)
    setSteps(initialSteps())
    const cid = newCorrelationId()
    setCorrelationId(cid)
    console.log(`[debug] correlationId=${cid}`)
    const fnHeaders = { 'x-correlation-id': cid }

    // 1. Gestão (Supabase outro projeto) — upsert_lead
    const leadData = {
      nome: form.nome,
      email: form.email,
      telefone: form.whatsapp,
      nome_marca: form.marca,
      origem: 'site-viabilidade',
      observacoes: `[DEBUG cid=${cid} ${ts()}] Segmento: ${form.segmento}`,
      correlation_id: cid,
    }
    await runStep('gestao-rpc', leadData, async () => {
      const { data, error } = await gestao.rpc('upsert_lead', { lead_data: leadData })
      if (error) throw error
      return data
    })

    // 2. Notion edge function
    const notionPayload = { form: 'viabilidade', correlation_id: cid, data: { ...form, ncls_recomendadas: '25, 35', correlation_id: cid } }
    await runStep('notion', notionPayload, async () => {
      const { data, error } = await supabase.functions.invoke('notion-form', { body: notionPayload, headers: fnHeaders })
      if (error) throw error
      if (!data?.success) throw new Error(data?.error || 'Notion retornou success=false')
      return data
    })

    // 3. Email
    const emailPayload = { form_id: 'viabilidade', correlation_id: cid, data: { ...form, correlation_id: cid } }
    await runStep('email', emailPayload, async () => {
      const { data, error } = await supabase.functions.invoke('notify-lead-email', { body: emailPayload, headers: fnHeaders })
      if (error) throw error
      return data
    })

    // 4. WhatsApp
    const waPayload = { form_id: 'viabilidade', correlation_id: cid, lead: { nome: form.nome, email: form.email, whatsapp: form.whatsapp, marca: form.marca, correlation_id: cid } }
    await runStep('whatsapp', waPayload, async () => {
      const { data, error } = await supabase.functions.invoke('notify-whatsapp', { body: waPayload, headers: fnHeaders })
      if (error) throw error
      return data
    })

    setRunning(false)
  }

  const summary = useMemo(() => {
    const total = steps.length
    const ok = steps.filter((s) => s.status === 'ok').length
    const fail = steps.filter((s) => s.status === 'fail').length
    const pending = steps.filter((s) => s.status === 'pending' || s.status === 'running').length
    const failed = steps.filter((s) => s.status === 'fail')
    const totalMs = steps.reduce((acc, s) => acc + (s.durationMs || 0), 0)
    return { total, ok, fail, pending, failed, totalMs }
  }, [steps])

  const buildReportObject = () => ({
    generatedAt: ts(),
    correlationId: correlationId || null,
    form,
    summary: {
      total: summary.total,
      ok: summary.ok,
      fail: summary.fail,
      pending: summary.pending,
      totalDurationMs: summary.totalMs,
      failedSteps: summary.failed.map((s) => ({
        id: s.id,
        label: s.label,
        detail: s.detail,
        error: s.error,
      })),
    },
    steps,
  })

  const buildReport = () => {
    return [
      `=== Permarke Debug Report ===`,
      `Gerado: ${ts()}`,
      `CorrelationId: ${correlationId || '(não executado)'}`,
      `Form: ${JSON.stringify(form)}`,
      ``,
      `RESUMO: ${summary.ok}/${summary.total} OK · ${summary.fail} falha(s) · ${summary.totalMs}ms total`,
      summary.failed.length > 0
        ? `FALHAS:\n${summary.failed.map((s) => `  - ${s.label}: ${s.detail || 'erro'}`).join('\n')}`
        : `Nenhuma falha.`,
      ``,
      ...steps.map((s) =>
        [
          `--- ${s.label} ---`,
          `Status: ${s.status}`,
          s.startedAt && `Início: ${s.startedAt}`,
          s.finishedAt && `Fim:    ${s.finishedAt}`,
          s.durationMs != null && `Duração: ${s.durationMs}ms`,
          s.detail && `Detalhe: ${s.detail}`,
          s.payload && `Payload: ${JSON.stringify(s.payload, null, 2)}`,
          s.response && `Response: ${JSON.stringify(s.response, null, 2)}`,
          s.error && `Erro: ${JSON.stringify(s.error, null, 2)}`,
          ``,
        ].filter(Boolean).join('\n'),
      ),
    ].join('\n')
  }

  const downloadFile = (name: string, blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const fileStem = () => {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    const cidShort = (correlationId || 'no-cid').slice(-8)
    return `permarke-debug_${stamp}_${cidShort}`
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(buildReportObject(), null, 2)], { type: 'application/json' })
    downloadFile(`${fileStem()}.json`, blob)
  }

  const exportPdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const margin = 36
    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()
    const maxW = pageW - margin * 2
    let y = margin

    const writeLine = (text: string, opts: { size?: number; bold?: boolean; color?: [number, number, number] } = {}) => {
      doc.setFont('courier', opts.bold ? 'bold' : 'normal')
      doc.setFontSize(opts.size ?? 9)
      if (opts.color) doc.setTextColor(...opts.color)
      else doc.setTextColor(20, 20, 20)
      const lines = doc.splitTextToSize(text, maxW)
      for (const ln of lines) {
        if (y > pageH - margin) { doc.addPage(); y = margin }
        doc.text(ln, margin, y)
        y += (opts.size ?? 9) + 2
      }
    }

    writeLine('Permarke — Debug Report', { size: 14, bold: true })
    writeLine(`Gerado: ${ts()}`)
    writeLine(`CorrelationId: ${correlationId || '(não executado)'}`)
    writeLine(`Form: ${JSON.stringify(form)}`)
    y += 6
    writeLine(`RESUMO: ${summary.ok}/${summary.total} OK · ${summary.fail} falha(s) · ${summary.totalMs}ms total`, { bold: true })
    if (summary.failed.length > 0) {
      writeLine('Etapas com falha:', { bold: true, color: [180, 30, 30] })
      summary.failed.forEach((s) => writeLine(`  - ${s.label}: ${s.detail || 'erro'}`, { color: [180, 30, 30] }))
    } else {
      writeLine('Nenhuma falha.', { color: [20, 120, 40] })
    }
    y += 6

    steps.forEach((s) => {
      y += 4
      const color: [number, number, number] =
        s.status === 'ok' ? [20, 120, 40] :
        s.status === 'fail' ? [180, 30, 30] :
        [80, 80, 80]
      writeLine(`--- ${s.label} ---`, { bold: true, color })
      writeLine(`Status: ${s.status}${s.durationMs != null ? ` · ${s.durationMs}ms` : ''}`)
      if (s.startedAt) writeLine(`Início: ${s.startedAt}`)
      if (s.finishedAt) writeLine(`Fim:    ${s.finishedAt}`)
      if (s.detail) writeLine(`Detalhe: ${s.detail}`)
      if (s.payload != null) {
        writeLine('Payload:', { bold: true })
        writeLine(JSON.stringify(s.payload, null, 2), { size: 8 })
      }
      if (s.response != null) {
        writeLine('Response:', { bold: true })
        writeLine(JSON.stringify(s.response, null, 2), { size: 8 })
      }
      if (s.error != null) {
        writeLine('Error:', { bold: true, color: [180, 30, 30] })
        writeLine(JSON.stringify(s.error, null, 2), { size: 8, color: [180, 30, 30] })
      }
    })

    doc.save(`${fileStem()}.pdf`)
  }

  const copyReport = async () => {
    await navigator.clipboard.writeText(buildReport())
    alert('Relatório copiado para a área de transferência.')
  }

  const statusColor = (s: StepStatus) =>
    s === 'ok' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
    s === 'fail' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
    s === 'running' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40 animate-pulse' :
    'bg-muted text-muted-foreground border-border'

  return (
    <div className="min-h-screen bg-foreground text-primary-foreground p-6 font-mono text-sm">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-primary">Permarke — Debug do Formulário</h1>
        <p className="text-primary-foreground/60 mb-3">
          Dispara um envio de teste em sequência para Gestão (Supabase RPC), Notion, Email e WhatsApp,
          mostrando onde a cadeia para.
        </p>
        {correlationId && (
          <div className="mb-6 inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-3 py-2 rounded">
            <span className="opacity-70 text-xs uppercase">correlationId</span>
            <code className="text-xs">{correlationId}</code>
            <button
              onClick={() => navigator.clipboard.writeText(correlationId)}
              className="text-xs underline opacity-80 hover:opacity-100"
            >copiar</button>
          </div>
        )}

        <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-4 mb-6 grid sm:grid-cols-2 gap-3">
          {(['nome', 'email', 'whatsapp', 'marca', 'segmento'] as const).map((k) => (
            <label key={k} className="flex flex-col gap-1">
              <span className="text-xs uppercase text-primary-foreground/50">{k}</span>
              <input
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                className="bg-foreground border border-primary-foreground/20 rounded px-3 py-2 text-primary-foreground"
              />
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleRun}
            disabled={running}
            className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded disabled:opacity-50"
          >
            {running ? 'Executando...' : 'Disparar envio de teste'}
          </button>
          <button
            onClick={copyReport}
            className="border border-primary-foreground/30 px-6 py-3 rounded hover:bg-primary-foreground/5"
          >
            Copiar relatório
          </button>
          <button
            onClick={exportJson}
            className="border border-primary-foreground/30 px-6 py-3 rounded hover:bg-primary-foreground/5"
          >
            Exportar JSON
          </button>
          <button
            onClick={exportPdf}
            className="border border-primary-foreground/30 px-6 py-3 rounded hover:bg-primary-foreground/5"
          >
            Exportar PDF
          </button>
        </div>

        {/* Resumo automático */}
        {(summary.ok > 0 || summary.fail > 0) && (
          <div className={`mb-6 border rounded-lg p-4 ${
            summary.fail > 0
              ? 'border-red-500/40 bg-red-500/10'
              : 'border-green-500/40 bg-green-500/10'
          }`}>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <strong className={summary.fail > 0 ? 'text-red-400' : 'text-green-400'}>
                Resumo: {summary.ok}/{summary.total} OK · {summary.fail} falha(s)
              </strong>
              <span className="text-xs opacity-70">{summary.totalMs}ms total</span>
            </div>
            {summary.failed.length > 0 ? (
              <ul className="text-xs space-y-1 mt-2">
                {summary.failed.map((s) => (
                  <li key={s.id} className="text-red-400">
                    ✗ <strong>{s.label}</strong> — {s.detail || 'erro'}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-green-400">Toda a cadeia executou com sucesso.</p>
            )}
          </div>
        )}

        <div className="space-y-4">

        <div className="space-y-4">
          {steps.map((s) => (
            <div key={s.id} className={`border rounded-lg p-4 ${statusColor(s.status)}`}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <strong>{s.label}</strong>
                <span className="text-xs uppercase">
                  {s.status} {s.durationMs != null && `· ${s.durationMs}ms`}
                </span>
              </div>
              {s.startedAt && <div className="text-xs opacity-70">início: {s.startedAt}</div>}
              {s.finishedAt && <div className="text-xs opacity-70">fim:    {s.finishedAt}</div>}
              {s.detail && <div className="text-xs mt-1">→ {s.detail}</div>}
              {(s.payload != null || s.response != null || s.error != null) && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs opacity-80">ver payload / response / erro</summary>
                  <pre className="mt-2 text-xs whitespace-pre-wrap break-all bg-foreground/50 p-3 rounded overflow-auto max-h-80">
{s.payload != null && `PAYLOAD:\n${JSON.stringify(s.payload, null, 2)}\n\n`}
{s.response != null && `RESPONSE:\n${JSON.stringify(s.response, null, 2)}\n\n`}
{s.error != null && `ERROR:\n${JSON.stringify(s.error, null, 2)}`}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-xs text-primary-foreground/40">
          Página interna. Não indexada. Use somente para diagnóstico.
        </div>
      </div>
    </div>
  )
}
