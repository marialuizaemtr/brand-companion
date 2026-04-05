import { supabase } from '@/integrations/supabase/client';

const CONSENT_VERSION = 'v1.0';

export async function logConsent(formSource: string, data: { nome: string; email: string; telefone?: string }) {
  try {
    // Try to get IP (best effort)
    let ip: string | null = null;
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const json = await res.json();
      ip = json.ip;
    } catch {}

    await supabase.from('consent_logs').insert({
      form_source: formSource,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone || null,
      ip_address: ip,
      consent_version: CONSENT_VERSION,
    });
  } catch (err) {
    console.error('Consent log error:', err);
  }
}
