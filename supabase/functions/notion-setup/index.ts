const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const DATABASES: Record<string, { id: string; properties: Record<string, any> }> = {
  viabilidade: {
    id: '3350152a574e81eead55d62d5647f1ae',
    properties: {
      'Nome': { rich_text: {} },
      'Marca': { rich_text: {} },
      'WhatsApp': { phone_number: {} },
      'Email': { email: {} },
      'Segmento': { rich_text: {} },
      'Como encontrou': { rich_text: {} },
    },
  },
  registrar_marca: {
    id: '3350152a574e81c9b49bf4c06e440ba4',
    properties: {
      'Nome': { rich_text: {} },
      'Marca': { rich_text: {} },
      'Email': { email: {} },
      'Telefone': { phone_number: {} },
      'Segmento': { rich_text: {} },
      'Descrição': { rich_text: {} },
    },
  },
  contato: {
    id: '3350152a574e81d98754c662cc8842fe',
    properties: {
      'WhatsApp': { phone_number: {} },
      'Email': { email: {} },
      'Interesse': { rich_text: {} },
      'Mensagem': { rich_text: {} },
    },
  },
  parceiros: {
    id: '3350152a574e81c1859befdfbc3c9bbc',
    properties: {
      'WhatsApp': { phone_number: {} },
      'Email': { email: {} },
      'Perfil': { rich_text: {} },
      'Tipo': { select: { options: [{ name: 'cadastro' }, { name: 'indicacao' }] } },
      'Código': { rich_text: {} },
      'Nome Indicado': { rich_text: {} },
      'Serviço': { rich_text: {} },
    },
  },
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const notionKey = Deno.env.get('NOTION_API_KEY')
  if (!notionKey) {
    return new Response(JSON.stringify({ error: 'No API key' }), { status: 500, headers: corsHeaders })
  }

  const results: Record<string, any> = {}

  for (const [name, db] of Object.entries(DATABASES)) {
    const res = await fetch(`https://api.notion.com/v1/databases/${db.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${notionKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: db.properties }),
    })
    const data = await res.json()
    results[name] = res.ok ? 'ok' : data
  }

  return new Response(JSON.stringify(results), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
