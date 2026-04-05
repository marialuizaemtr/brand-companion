
CREATE TABLE public.guia_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  profissao TEXT NOT NULL,
  tem_marca BOOLEAN NOT NULL,
  nome_marca TEXT,
  segmento TEXT,
  marca_registrada TEXT,
  interesse_registro TEXT NOT NULL
);

ALTER TABLE public.guia_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.guia_leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
