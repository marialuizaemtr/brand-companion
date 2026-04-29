/**
 * Notificação por e-mail para marialuiza@permarke.com.br a cada novo lead.
 * Roda em paralelo com Notion e Supabase de Gestão — não bloqueia o fluxo.
 */
import { supabase } from '@/integrations/supabase/client'

type FormType = 'viabilidade' | 'registrar_marca' | 'contato' | 'parceiros' | 'guia'

export async function notifyLeadEmail(form_id: FormType, data: Record<string, any>) {
  try {
    await supabase.functions.invoke('notify-lead-email', {
      body: { form_id, data },
    })
  } catch (err) {
    console.error('[notify-lead-email] invoke error:', err)
  }
}
