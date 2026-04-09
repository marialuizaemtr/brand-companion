
create table public.whatsapp_config (
  id uuid default gen_random_uuid() primary key,
  form_id text not null unique,
  form_label text not null,
  message_template text not null,
  active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.whatsapp_config enable row level security;

create policy "Authenticated users can read whatsapp_config"
on public.whatsapp_config for select to authenticated using (true);

create policy "Authenticated users can insert whatsapp_config"
on public.whatsapp_config for insert to authenticated with check (true);

create policy "Authenticated users can update whatsapp_config"
on public.whatsapp_config for update to authenticated using (true);

create policy "Authenticated users can delete whatsapp_config"
on public.whatsapp_config for delete to authenticated using (true);

insert into public.whatsapp_config (form_id, form_label, message_template) values
('viabilidade', 'Análise de Viabilidade', 'Olá, {{nome}}! 👋 Recebi sua solicitação de análise de viabilidade para a marca *{{marca}}*. Vou analisar e te retorno em até 24h. Qualquer dúvida, é só responder essa mensagem. — Malu, Permarke 🎀'),
('guia', 'Guia Jurídico (Lead Magnet)', 'Oi, {{nome}}! 🎀 Seu acesso ao Guia Jurídico das Donas de Marcas está pronto! Acesse aqui: {{link}}. Qualquer dúvida sobre registro de marca, pode me chamar. — Malu, Permarke'),
('contato', 'Formulário de Contato', 'Olá, {{nome}}! Recebi sua mensagem e já estou vendo aqui. Te respondo em breve. — Malu, Permarke 🎀');
