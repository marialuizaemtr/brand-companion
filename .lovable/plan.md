

## Ajustes no Funil de Viabilidade

### O que muda

**1. Ícone de loading**: Trocar o "™" pelo Mzinho da Permarke (imagem enviada) durante a tela de carregamento.

**2. Seleção de segmento com todas as 45 NCLs**: Substituir o dropdown de segmentos por uma lista completa de todas as 45 classes NCL com toggles (checkboxes estilizados). O usuário poderá selecionar múltiplas classes. A opção "Outro" terá um campo de texto livre; com base no que for digitado, o sistema sugere a NCL correspondente (mapeamento por palavras-chave).

**3. Notion -- incluir NCLs recomendadas**: Na submissão ao Notion, enviar o segmento e as NCLs selecionadas/recomendadas como propriedades separadas.

---

### Detalhes técnicos

**Arquivo: `src/assets/`**
- Copiar `Icone_Site_4.png` para `src/assets/permarke-icon.png`

**Arquivo: `src/components/ViabilitySection.tsx`**

1. **Loading (step 2)**: Substituir `<div className="text-primary font-heading text-8xl animate-pulse-tm mb-8">™</div>` por `<img src={permarkeIcon} className="w-20 h-20 animate-pulse-tm mb-8" />` importando a imagem.

2. **Dados NCL completos**: Criar constante com todas as 45 classes NCL (1-45) com nome e descrição curta, usando a classificação de Nice atualizada (incluindo NCL 13 atualizada -- "Armas de fogo" foi reclassificada).

3. **Seleção de segmento**: Manter o dropdown de segmentos como está (para pré-selecionar NCLs recomendadas), mas adicionar abaixo uma seção de toggles com todas as 45 classes. As classes recomendadas para o segmento ficam pré-selecionadas. O usuário pode ativar/desativar qualquer classe.

4. **Campo "Outro"**: Quando "Outro" é selecionado no segmento, exibir campo de texto. Com base em palavras-chave digitadas, sugerir NCLs correspondentes (mapeamento interno por keywords).

5. **Resultado (step 3)**: Exibir as classes selecionadas pelo usuário (não apenas as pré-definidas do segmento).

**Arquivo: `supabase/functions/notion-form/index.ts`**

- Adicionar propriedade `'NCLs Recomendadas'` como rich_text contendo as classes selecionadas (ex: "25, 35, 42")
- A propriedade `'Segmento'` já existe na integração

**Arquivo: `src/lib/api/notion.ts`**
- Passar as NCLs selecionadas junto com os dados do formulário

### Pré-requisito no Notion
- Criar propriedade **"NCLs Recomendadas"** (tipo Text) na base de Viabilidade

