

## Plano: Página /guia — Lead Capture Standalone

### Resumo
Criar uma página standalone em `/guia` com formulário de captura de leads, armazenamento no banco de dados, e estado de agradecimento pós-envio com embed de vídeo do YouTube.

### Etapas

**1. Criar tabela `guia_leads` no banco de dados**
- Colunas: `id` (uuid PK), `created_at`, `nome`, `email`, `whatsapp`, `profissao`, `tem_marca` (boolean), `nome_marca` (nullable), `segmento` (nullable), `marca_registrada` (nullable), `interesse_registro`
- RLS: permitir INSERT anônimo (página pública, sem autenticação)
- SELECT restrito (apenas service_role)

**2. Criar componente `src/pages/Guia.tsx`**
- Página completa com: header (logo only), hero com badge/H1/subtítulo/bullets, formulário em card branco, social proof, footer minimalista
- Toda a copy exatamente como especificada
- Máscara de telefone brasileiro no campo WhatsApp
- Campos condicionais (nome_marca, segmento, marca_registrada) visíveis apenas quando `tem_marca = "Sim"`
- Validação client-side com mensagens de erro inline
- Submit → insert no banco → transição fade para estado de agradecimento
- Estado de agradecimento: badge, H2, texto, embed YouTube (16:9), botão WhatsApp outlined
- Tipografia: Awesome Serif (headings), Red Hat Display (body) — já disponíveis no projeto
- Cores: #E73B97 (primary pink), #C42880 (hover), off-white (#F9F6F1) background

**3. Adicionar rota em `src/App.tsx`**
- Adicionar `<Route path="/guia" element={<Guia />} />` — sem alterar nav ou footer

### Detalhes técnicos
- Usar `react-hook-form` + `zod` para validação
- Máscara de telefone via handler manual (sem lib extra)
- Transição CSS `opacity` 300ms para thank-you state
- Logo importada de `@/assets/logo-branca.png` (versão branca sobre fundo escuro) — será necessário verificar se há logo escura; caso contrário, usar a branca sobre fundo colorido ou ajustar
- Placeholders VIDEO_ID_AQUI e NUMERO_AQUI mantidos no código para preenchimento posterior

