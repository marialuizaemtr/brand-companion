const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const DATABASE_IDS: Record<string, string> = {
  viabilidade: '3350152a574e81eead55d62d5647f1ae',
  registrar_marca: '3350152a574e81c9b49bf4c06e440ba4',
  contato: '3350152a574e81d98754c662cc8842fe',
  parceiros: '3350152a574e81c1859befdfbc3c9bbc',
}

const RESPONSAVEIS = [
  { object: 'user', id: '36a0152a-574e-8234-9bec-81c2ff237303' }, // Rita
  { object: 'user', id: '55a0152a-574e-8200-9e3f-812604e23364' }, // Maria Luiza
]

function buildProperties(form: string, data: Record<string, string>) {
  const props: Record<string, any> = {}

  const text = (value: string) => ({ rich_text: [{ text: { content: value || '' } }] })
  const title = (value: string) => ({ title: [{ text: { content: value || '' } }] })
  const email = (value: string) => ({ email: value || null })
  const phone = (value: string) => ({ phone_number: value || null })
  const sel = (value: string) => ({ select: { name: value } })

  switch (form) {
    case 'viabilidade':
      props['Name'] = title(data.marca || data.nome || '')
      if (data.nome) props['Nome'] = text(data.nome)
      if (data.marca) props['Marca'] = text(data.marca)
      if (data.whatsapp) props['WhatsApp'] = phone(data.whatsapp)
      if (data.email) props['Email'] = email(data.email)
      if (data.segmento) props['Segmento'] = text(data.segmento)
      if (data.como_encontrou) props['Como encontrou'] = text(data.como_encontrou)
      break

    case 'registrar_marca':
      props['Name'] = title(data.nomeMarca || data.nome || '')
      if (data.nome) props['Nome'] = text(data.nome)
      if (data.email) props['Email'] = email(data.email)
      if (data.telefone) props['Telefone'] = phone(data.telefone)
      if (data.nomeMarca) props['Marca'] = text(data.nomeMarca)
      if (data.segmento) props['Segmento'] = text(data.segmento)
      if (data.descricao) props['Descrição'] = text(data.descricao)
      break

    case 'contato':
      props['Name'] = title(data.nome || '')
      if (data.whatsapp) props['WhatsApp'] = phone(data.whatsapp)
      if (data.email) props['Email'] = email(data.email)
      if (data.interesse) props['Interesse'] = text(data.interesse)
      if (data.mensagem) props['Mensagem'] = text(data.mensagem)
      break

    case 'parceiros':
      props['Name'] = title(data.nome || '')
      if (data.whatsapp) props['WhatsApp'] = phone(data.whatsapp)
      if (data.email) props['Email'] = email(data.email)
      if (data.perfil) props['Perfil'] = text(data.perfil)
      if (data.tipo) props['Tipo'] = sel(data.tipo)
      if (data.codigo) props['Código'] = text(data.codigo)
      if (data.nome_indicado) props['Nome Indicado'] = text(data.nome_indicado)
      if (data.servico) props['Serviço'] = text(data.servico)
      break
  }

  return props
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { form, data } = await req.json()

    if (!form || !DATABASE_IDS[form]) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid form type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const notionKey = Deno.env.get('NOTION_API_KEY')
    if (!notionKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Notion API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const properties = buildProperties(form, data || {})

    console.log(`Creating page in ${form} database`)

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: DATABASE_IDS[form] },
        properties,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Notion API error:', JSON.stringify(result))
      return new Response(
        JSON.stringify({ success: false, error: result.message || 'Notion API error' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Page created successfully in ${form}`)
    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
