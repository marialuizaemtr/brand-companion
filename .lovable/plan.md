

## Add "Responsável" column to Notion integration

**What it does**: Every form submission (viabilidade, registrar_marca, contato, parceiros) will automatically assign both Rita and Maria Luiza as responsible in Notion, triggering notifications for new entries.

**Notion User IDs extracted from URLs**:
- Rita Monteiro: `36a0152a-574e-8234-9bec-81c2ff237303`
- Maria Luiza Monteiro: `55a0152a-574e-8200-9e3f-812604e23364`

### Changes

**File: `supabase/functions/notion-form/index.ts`**

Add a `RESPONSAVEIS` constant with both user IDs, then append a "Responsável" people-type property to every form submission in the `buildProperties` function:

```typescript
const RESPONSAVEIS = [
  { object: 'user', id: '36a0152a-574e-8234-9bec-81c2ff237303' }, // Rita
  { object: 'user', id: '55a0152a-574e-8200-9e3f-812604e23364' }, // Maria Luiza
]
```

At the end of `buildProperties`, before returning, add:
```typescript
props['Responsável'] = { people: RESPONSAVEIS }
```

This applies to all four form types automatically.

### Prerequisites

Each of the four Notion databases must have a **"Responsável"** property of type **People**. If not already created, you'll need to add it in Notion before deploying.

