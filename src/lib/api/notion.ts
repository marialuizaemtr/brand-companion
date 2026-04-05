import { supabase } from '@/integrations/supabase/client'

type FormType = 'viabilidade' | 'registrar_marca' | 'contato' | 'parceiros' | 'guia'

export async function submitToNotion(form: FormType, data: Record<string, string>) {
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
