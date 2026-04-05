
CREATE TABLE public.consent_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  form_source TEXT NOT NULL,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  consent_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  consent_version TEXT NOT NULL DEFAULT 'v1.0'
);

ALTER TABLE public.consent_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on consent_logs" ON public.consent_logs
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
