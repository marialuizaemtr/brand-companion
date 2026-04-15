/**
 * Integração com o sistema de gestão Permarke (permarke-gestao / Supabase)
 * Roda em paralelo com o Notion — não bloqueia o formulário se falhar.
 */
import { gestao } from '@/lib/gestaoClient'

/** Valida código de parceiro contra o banco real. Retorna nome do parceiro ou null. */
export async function validarCodigoParceiro(codigo: string): Promise<string | null> {
  try {
    const { data } = await gestao.rpc('validar_codigo_parceiro', { codigo: codigo.toUpperCase().trim() })
    if (data && data.length > 0) return data[0].parceiro_nome as string
    return null
  } catch {
    return null
  }
}

type FormType = 'viabilidade' | 'registrar_marca' | 'contato' | 'parceiros' | 'guia'

export async function submitToGestao(form: FormType, data: Record<string, string>) {
  try {
    if (form === 'contato') {
      await gestao.from('mensagens_contato').insert({
        email: data.email || null,
        assunto: data.interesse || 'Contato do site',
        mensagem: [
          data.nome && `Nome: ${data.nome}`,
          data.whatsapp && `WhatsApp: ${data.whatsapp}`,
          data.mensagem && `Mensagem: ${data.mensagem}`,
        ].filter(Boolean).join('\n'),
      })
      return
    }

    // Todos os outros formulários viram leads
    const leadData: Record<string, unknown> = {
      nome:    data.nome      || data.nome_indicado || '',
      email:   data.email     || '',
      telefone: data.whatsapp || data.telefone      || '',
    }

    if (form === 'viabilidade') {
      leadData.nome_marca = data.marca || ''
      leadData.origem     = 'site-viabilidade'
      const nclsStr = data.ncls_recomendadas || ''
      if (nclsStr) {
        const arr = nclsStr.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n))
        if (arr.length) leadData.classes_ncl = arr
      }
      leadData.observacoes = [
        data.segmento       && `Segmento: ${data.segmento}`,
        data.como_encontrou && `Como encontrou: ${data.como_encontrou}`,
      ].filter(Boolean).join(' | ') || undefined
    }

    if (form === 'registrar_marca') {
      leadData.nome_marca   = data.nomeMarca  || ''
      leadData.descricao_uso = data.descricao || ''
      leadData.origem        = 'site-registro'
      if (data.segmento) leadData.observacoes = `Segmento: ${data.segmento}`
    }

    if (form === 'guia') {
      leadData.nome_marca = data.nome_marca || ''
      leadData.origem     = 'site-guia'
      leadData.observacoes = [
        data.profissao           && `Profissão: ${data.profissao}`,
        data.tem_marca           && `Tem marca: ${data.tem_marca}`,
        data.interesse_registro  && `Interesse registro: ${data.interesse_registro}`,
        data.marca_registrada    && `Marca registrada: ${data.marca_registrada}`,
        data.segmento            && `Segmento: ${data.segmento}`,
      ].filter(Boolean).join(' | ') || undefined
    }

    if (form === 'parceiros') {
      if (data.tipo === 'indicacao') {
        // Indicação via site: vincula ao parceiro pelo código real
        leadData.parceiro_codigo = data.codigo || ''
        leadData.nome_marca      = data.nome_marca || ''
        leadData.observacoes     = data.observacoes || undefined
      } else {
        // Cadastro de interesse em ser parceiro → cria parceiro pendente + lead
        leadData.origem = 'parceiro'
        if (data.perfil) leadData.observacoes = `Perfil: ${data.perfil}`

        // Cria parceiro pendente (ativo = false) para aprovação no sistema
        console.warn('[gestao] inserindo parceiro:', data.nome, data.email)
        const { error: pErr, data: pData } = await gestao.from('parceiros').insert({
          nome:     data.nome     || '',
          email:    data.email    || '',
          telefone: data.whatsapp || null,
          perfil:   data.perfil   || null,
          ativo:    false,
        }).select()
        console.warn('[gestao] resultado insert parceiro:', JSON.stringify(pData), JSON.stringify(pErr))
        if (pErr && pErr.code !== '23505') {
          console.error('[gestao] parceiro pendente insert error:', pErr)
        }
      }
    }

    await gestao.rpc('upsert_lead', { lead_data: leadData })
  } catch (err) {
    // Silently fail — não bloqueia o fluxo principal
    console.error('[gestao] submit error:', err)
  }
}
