# Guia Completo do Supabase

Este guia consolida todas as informações sobre configuração e uso do Supabase no projeto.

## Configuração Inicial

### Variáveis de Ambiente

As variáveis já estão configuradas no `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ynxopsogitjvbfuhdjoi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Bpaed8BirwO0bKEq6z_iDA_yFmlE8_T
```

⚠️ **IMPORTANTE**: O arquivo `.env.local` está no `.gitignore` e não será commitado.

## Passo 1: Criar as Tabelas

### Via Dashboard (Recomendado)

1. Acesse: [Dashboard do Supabase](https://app.supabase.com)
2. Entre no projeto: `ynxopsogitjvbfuhdjoi`
3. Clique em **SQL Editor** no menu lateral
4. Clique em **New Query**
5. Copie **TODO** o conteúdo do arquivo `supabase-schema.sql`
6. Cole no editor SQL
7. Clique no botão **Run** (ou pressione Ctrl+Enter)

Você verá uma mensagem de sucesso confirmando que as tabelas foram criadas! ✅

### Via CLI (Alternativo)

```bash
# Instalar Supabase CLI (se ainda não tiver)
npm install -g supabase

# Login no Supabase
supabase login

# Executar o schema
supabase db push
```

## Passo 2: Popular o Banco

Agora que as tabelas existem, vamos adicionar os dados das 13 personas:

```bash
cd front-end
npm run seed
```

Você verá algo assim:
```
🌱 Starting personas seed...
✅ Successfully seeded 13 personas!
Personas: JAX, ELI, LUCY, MIRA, CASEY, ZANE, AVA, LEX, NOAH, ETHAN, RIO, LUNA, KAI
🎉 Seed completed!
```

## Passo 3: Verificar

1. Volte ao Dashboard do Supabase
2. No menu lateral, clique em **Table Editor**
3. Clique na tabela **personas**
4. Você verá todas as 13 personas listadas! 🎉

## Estrutura das Tabelas

### Tabela: `personas`

Armazena todas as informações detalhadas de cada persona:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | text | Identificador único ('jax', 'eli', etc) |
| name | text | Nome da persona ('JAX', 'ELI') |
| cluster | text | Categoria/cluster da persona |
| definition | text | Definição/descrição |
| age_range | text | Faixa etária |
| gender | text | Distribuição de gênero |
| channel_size | text | Tamanho do canal |
| upload_cadence | text | Frequência de upload |
| top_cities | text[] | Array com principais cidades |
| example_channels | text[] | Array com exemplos de canais |
| milo_must_haves | text[] | Array com recursos do Milo |
| zara_must_haves | text[] | Array com recursos do Zara |
| tasks | text[] | Array com tarefas típicas |
| benefits | text[] | Array com benefícios esperados |
| revenue | jsonb | Mix de receita (%) |
| pain_points | text[] | Array com pontos de dor |
| tonality | text | Tom de comunicação |
| keywords | text[] | Array com palavras-chave |
| purchase_behavior | text | Comportamento de compra |
| success_looks | text | Como o sucesso se parece |
| logic_buying | text | Lógica de compra |
| primary_platform | text | Plataforma principal |
| software | text[] | Array com ferramentas usadas |
| psychographics | text | Perfil psicográfico |
| life_stage | text | Estágio de vida |
| interests | text[] | Array com interesses |
| favorite_brands | text[] | Array com marcas favoritas |
| hobbies | text[] | Array com hobbies |
| created_at | timestamp | Data de criação |
| updated_at | timestamp | Data de atualização |

### Tabela: `channels`

Armazena os canais do YouTube analisados:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | UUID automático |
| channel_id | text | ID do canal do YouTube |
| channel_url | text | URL completa do canal |
| persona_id | text | Referência para a persona (FK) |
| status | text | 'classified' ou 'unclassified' |
| created_at | timestamp | Data de criação |
| updated_at | timestamp | Data de atualização |

## Políticas de Segurança (RLS)

As tabelas têm Row Level Security (RLS) habilitado com:

- ✅ **Leitura pública**: Qualquer usuário pode ler os dados
- ❌ **Escrita restrita**: Apenas usuários autenticados podem inserir/atualizar

## Uso no Código

### Exemplo básico

```typescript
import { supabase } from '@/lib/supabase';

// Buscar todas as personas
const { data: personas, error } = await supabase
  .from('personas')
  .select('*');

// Buscar uma persona específica
const { data: persona } = await supabase
  .from('personas')
  .select('*')
  .eq('id', 'jax')
  .single();

// Buscar canais classificados
const { data: channels } = await supabase
  .from('channels')
  .select('*, personas(*)')
  .eq('status', 'classified');
```

Para mais exemplos de código, consulte `EXEMPLOS_SUPABASE.md`.

## Arquivos Criados

- ✅ `.env.local` - Variáveis de ambiente
- ✅ `lib/supabase.ts` - Cliente do Supabase
- ✅ `lib/database.types.ts` - TypeScript types
- ✅ `lib/api/personas.ts` - API Layer centralizada
- ✅ `supabase-schema.sql` - Schema do banco de dados
- ✅ `scripts/seed-personas.ts` - Script para popular dados

## Próximos Passos

1. ✅ Executar o schema SQL no Supabase
2. ✅ Popular a tabela `personas` com os dados
3. Popular a tabela `channels` com os canais analisados
4. Atualizar os componentes para buscar dados do Supabase
5. Implementar cache/revalidação com Next.js

## Troubleshooting

### Dados não aparecem?

```bash
# 1. Verifique se executou o seed
npm run seed

# 2. Verifique o .env.local
cat .env.local

# 3. Verifique o Supabase Dashboard
# Vá em Table Editor → personas
```

### Erro: "Failed to fetch"

- Verifique se as variáveis de ambiente estão corretas
- Confirme que as tabelas existem no Supabase
- Verifique as políticas de RLS

### Erro: "Row Level Security"

- As políticas de leitura pública estão habilitadas
- Para escrita, você precisa autenticação

## Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Next.js com Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
