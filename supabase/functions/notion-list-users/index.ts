const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const notionKey = Deno.env.get('NOTION_API_KEY')
  if (!notionKey) {
    return new Response(JSON.stringify({ error: 'No key' }), { status: 500, headers: corsHeaders })
  }

  const res = await fetch('https://api.notion.com/v1/users', {
    headers: {
      'Authorization': `Bearer ${notionKey}`,
      'Notion-Version': '2022-06-28',
    },
  })

  const data = await res.json()
  return new Response(JSON.stringify(data, null, 2), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
