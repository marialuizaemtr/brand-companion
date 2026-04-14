import { supabase } from '@/integrations/supabase/client'
import { submitToGestao } from '@/lib/api/gestao'

type FormType = 'viabilidade' | 'registrar_marca' | 'contato' | 'parceiros' | 'guia'

export async function submitToNotion(form: FormType, data: Record<string, string>) {
  // Envia para o sistema de gestão em paralelo (não bloqueia se falhar)
  submitToGestao(form, data).catch((err) => console.error('[gestao] parallel error:', err))

  // Continua com o Notion normalmente
  const { data: result, error } = await supabase.functions.invoke('notion-form', {
    body: { form, data },
  })

  if (error) {
    console.error('Edge function error:', error)
    throw new Error('Falha ao enviar formulário')
  }

  if (!result?.success) {
    console.error('Notion error:', result?.error)
    throw new Error(result?.error || 'Falha ao enviar formulário')
  }

  return result
}
