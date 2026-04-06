import { corsHeaders } from '@supabase/supabase-js/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Simple shared-secret gate so only our admin UI can call this
  const authHeader = req.headers.get('authorization') ?? ''
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  if (!authHeader.includes(anonKey) && !authHeader.includes('Bearer')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const token = Deno.env.get('BLOG_PERMARKE_GITHUB')
  if (!token) {
    return new Response(JSON.stringify({ error: 'Token not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ token }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
