const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-correlation-id, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Expose-Headers': 'x-correlation-id',
}

const DATABASE_IDS: Record<string, string> = {
  viabilidade: '3350152a574e81eead55d62d5647f1ae',
  registrar_marca: '3350152a574e81c9b49bf4c06e440ba4',
  contato: '3350152a574e81d98754c662cc8842fe',
  parceiros: '3350152a574e81c1859befdfbc3c9bbc',
  guia: '3390152a574e800e8290e65d299ab4a0',
}

const RESPONSAVEIS = [
  { object: 'user', id: '1bdd872b-594c-8125-a494-000237b7ebeb' }, // Rita
  { object: 'user', id: '1e0d872b-594c-811b-b449-0002d9ac7833' }, // Maria Luiza
]

const FORM_LABELS: Record<string, string> = {
  viabilidade: 'Viabilidade',
  registrar_marca: 'Registrar Marca',
  contato: 'Contato',
  parceiros: 'Parceiros',
  guia: 'Guia',
}

function buildProperties(form: string, data: Record<string, string>) {
  const props: Record<string, any> = {}

  const text = (value: string) => ({ rich_text: [{ text: { content: value || '' } }] })
  const title = (value: string) => ({ title: [{ text: { content: value || '' } }] })
  const email = (value: string) => ({ email: value || null })
  const phone = (value: string) => ({ phone_number: value || null })
  const sel = (value: string) => ({ select: { name: value } })
  const multiSel = (values: string[]) => ({ multi_select: values.map(v => ({ name: v.trim() })) })

  switch (form) {
    case 'viabilidade':
      props['Name'] = title(`[Viabilidade] ${data.marca || data.nome || ''}`)
      if (data.nome) props['Nome'] = text(data.nome)
      if (data.marca) props['Marca'] = text(data.marca)
      if (data.whatsapp) props['WhatsApp'] = phone(data.whatsapp)
      if (data.email) props['Email'] = email(data.email)
      if (data.segmento) props['Segmento'] = text(data.segmento)
      if (data.como_encontrou) props['Como encontrou'] = text(data.como_encontrou)
      if (data.ncls_recomendadas) props['NCL'] = multiSel(data.ncls_recomendadas.split(','))
      props['Data de Cadastro'] = { date: { start: new Date().toISOString() } }
      props['Status'] = sel('Análise de viabilidade pendente')
      break

    case 'registrar_marca':
      props['Name'] = title(`[Registrar Marca] ${data.nomeMarca || data.nome || ''}`)
      if (data.nome) props['Nome'] = text(data.nome)
      if (data.email) props['Email'] = email(data.email)
      if (data.telefone) props['Telefone'] = phone(data.telefone)
      if (data.nomeMarca) props['Marca'] = text(data.nomeMarca)
      if (data.segmento) props['Segmento'] = text(data.segmento)
      if (data.descricao) props['Descrição'] = text(data.descricao)
      props['Data de Cadastro'] = { date: { start: new Date().toISOString() } }
      break

    case 'contato':
      props['Name'] = title(`[Contato] ${data.nome || ''}`)
      if (data.whatsapp) props['WhatsApp'] = phone(data.whatsapp)
      if (data.email) props['Email'] = email(data.email)
      if (data.interesse) props['Interesse'] = text(data.interesse)
      if (data.mensagem) props['Mensagem'] = text(data.mensagem)
      props['Data de Cadastro'] = { date: { start: new Date().toISOString() } }
      break

    case 'parceiros':
      props['Name'] = title(`[Parceiros] ${data.nome || ''}`)
      if (data.whatsapp) props['WhatsApp'] = phone(data.whatsapp)
      if (data.email) props['Email'] = email(data.email)
      if (data.perfil) props['Perfil'] = text(data.perfil)
      if (data.tipo) props['Tipo'] = sel(data.tipo)
      if (data.codigo) props['Código'] = text(data.codigo)
      if (data.nome_indicado) props['Nome Indicado'] = text(data.nome_indicado)
      if (data.servico) props['Serviço'] = text(data.servico)
      props['Data de Cadastro'] = { date: { start: new Date().toISOString() } }
      break

    case 'guia':
      props['Name'] = title(`[Guia] ${data.nome || ''}`)
      if (data.nome) props['Nome'] = text(data.nome)
      if (data.email) props['Email'] = email(data.email)
      if (data.whatsapp) props['WhatsApp'] = phone(data.whatsapp)
      if (data.profissao) props['Profissão'] = text(data.profissao)
      props['Tem Marca'] = { checkbox: data.tem_marca === 'true' || data.tem_marca === true }
      if (data.nome_marca) props['Nome da Marca'] = text(data.nome_marca)
      if (data.segmento) props['Segmento'] = text(data.segmento)
      if (data.marca_registrada) props['Marca Registrada'] = sel(data.marca_registrada)
      if (data.interesse_registro) props['Interesse Registro'] = sel(data.interesse_registro)
      props['Data de Cadastro'] = { date: { start: new Date().toISOString() } }
      break
  }

  props['Responsável'] = { people: RESPONSAVEIS }

  return props
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const headerCid = req.headers.get('x-correlation-id') || ''
  let cid = headerCid

  try {
    const body = await req.json()
    const { form, data, correlation_id } = body
    cid = headerCid || correlation_id || data?.correlation_id || `notion-${crypto.randomUUID()}`
    console.log(`[notion-form] cid=${cid} form=${form}`)

    if (!form || !DATABASE_IDS[form]) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid form type', correlation_id: cid }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-correlation-id': cid } }
      )
    }

    const notionKey = Deno.env.get('NOTION_API_KEY')
    if (!notionKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Notion API key not configured', correlation_id: cid }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-correlation-id': cid } }
      )
    }

    const properties = buildProperties(form, data || {})

    console.log(`[notion-form] cid=${cid} creating page in ${form} database`)

    const notionHeaders = {
      'Authorization': `Bearer ${notionKey}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    }

    let response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: notionHeaders,
      body: JSON.stringify({
        parent: { database_id: DATABASE_IDS[form] },
        properties,
      }),
    })

    let result = await response.json()

    const fallbackProps = ['Responsável', 'NCL', 'Data de Cadastro', 'Status']
    for (const propName of fallbackProps) {
      if (!response.ok && result.message?.includes(propName)) {
        console.error(`[notion-form] cid=${cid} rejected ${propName}:`, result.message)
        console.log(`[notion-form] cid=${cid} retrying ${form} without ${propName} property`)
        delete properties[propName]
        response = await fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: notionHeaders,
          body: JSON.stringify({
            parent: { database_id: DATABASE_IDS[form] },
            properties,
          }),
        })
        result = await response.json()
      }
    }

    if (!response.ok) {
      console.error(`[notion-form] cid=${cid} api error:`, JSON.stringify(result))
      return new Response(
        JSON.stringify({ success: false, error: result.message || 'Notion API error', correlation_id: cid }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-correlation-id': cid } }
      )
    }

    console.log(`[notion-form] cid=${cid} page created successfully in ${form}`)
    return new Response(
      JSON.stringify({ success: true, id: result.id, correlation_id: cid }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-correlation-id': cid } }
    )
  } catch (error) {
    console.error(`[notion-form] cid=${cid} error:`, error)
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error', correlation_id: cid }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'x-correlation-id': cid } }
    )
  }
})
