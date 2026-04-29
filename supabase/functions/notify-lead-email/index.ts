// Edge Function: notify-lead-email
// Envia e-mail de notificação para marialuiza@permarke.com.br a cada novo lead.
// Usa Resend API diretamente (sem SDK).

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const NOTIFY_TO = 'marialuiza@permarke.com.br'
const FROM = 'Permarke Site <noreply@permarke.com.br>'

const FORM_LABELS: Record<string, string> = {
  viabilidade: 'Análise de Viabilidade',
  registrar_marca: 'Registrar Marca',
  contato: 'Contato',
  parceiros: 'Parceiros',
  guia: 'Guia',
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildBody(formId: string, data: Record<string, any>) {
  const label = FORM_LABELS[formId] || formId
  const rows = Object.entries(data)
    .filter(([_, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => {
      const val = typeof v === 'object' ? JSON.stringify(v) : String(v)
      return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#222;">${escapeHtml(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#444;">${escapeHtml(val)}</td></tr>`
    })
    .join('')

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;">
    <div style="background:#000;color:#fff;padding:20px 24px;">
      <h1 style="margin:0;font-size:18px;">Novo lead — ${escapeHtml(label)}</h1>
      <p style="margin:6px 0 0;font-size:13px;color:#ccc;">Recebido pelo site Permarke</p>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:8px;font-size:14px;">${rows}</table>
    <p style="padding:16px 24px;color:#888;font-size:12px;">Esta é uma notificação automática. Os dados também foram salvos no Notion e no sistema de gestão.</p>
  </div>`

  const text = `Novo lead — ${label}\n\n` +
    Object.entries(data)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
      .join('\n')

  return { html, text, subject: `[Permarke] Novo lead — ${label}` }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured')

    const { form_id, data } = await req.json()
    if (!form_id || !data) {
      return new Response(JSON.stringify({ error: 'form_id and data required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { html, text, subject } = buildBody(form_id, data)

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [NOTIFY_TO],
        reply_to: data.email || undefined,
        subject,
        html,
        text,
      }),
    })

    const result = await r.json()
    if (!r.ok) {
      console.error('[notify-lead-email] resend error:', result)
      return new Response(JSON.stringify({ error: result }), {
        status: r.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error('[notify-lead-email] error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
