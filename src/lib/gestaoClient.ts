import { createClient } from '@supabase/supabase-js'

// Cliente Supabase do sistema de gestão Permarke (permarke-gestao)
export const gestao = createClient(
  'https://rturrhgvwkwbixizzorv.supabase.co',
  'sb_publishable_FKHHbC4rDOr2JdAYQ5AEbw_oSiPJoGQ',
)
