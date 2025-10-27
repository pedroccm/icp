# Exemplos de Uso do Supabase

## 1. Buscar Dados com Hooks (Recomendado)

### Buscar todas as personas

```typescript
'use client';

import { usePersonas } from '@/lib/hooks/usePersonas';

export function PersonasList() {
  const { personas, loading, error } = usePersonas();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {personas.map(persona => (
        <div key={persona.id}>
          <h3>{persona.name}</h3>
          <p>{persona.definition}</p>
        </div>
      ))}
    </div>
  );
}
```

### Buscar uma persona específica

```typescript
'use client';

import { usePersona } from '@/lib/hooks/usePersonas';

export function PersonaDetail({ id }: { id: string }) {
  const { persona, loading, error } = usePersona(id);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!persona) return <div>Persona não encontrada</div>;

  return (
    <div>
      <h1>{persona.name}</h1>
      <p>{persona.definition}</p>
      {/* Resto dos dados... */}
    </div>
  );
}
```

## 2. Consultas Diretas com Supabase Client

### Buscar todas as personas

```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('personas')
  .select('*');

if (error) console.error('Error:', error);
else console.log('Personas:', data);
```

### Buscar por ID

```typescript
const { data, error } = await supabase
  .from('personas')
  .select('*')
  .eq('id', 'jax')
  .single();
```

### Buscar com filtros

```typescript
// Personas de plataforma TikTok
const { data } = await supabase
  .from('personas')
  .select('*')
  .eq('primary_platform', 'TikTok');

// Personas que usam CapCut
const { data } = await supabase
  .from('personas')
  .select('*')
  .contains('software', ['CapCut']);
```

### Buscar com ordenação

```typescript
const { data } = await supabase
  .from('personas')
  .select('*')
  .order('name', { ascending: true });
```

### Buscar com limite

```typescript
const { data } = await supabase
  .from('personas')
  .select('*')
  .limit(5);
```

## 3. Buscar Canais

### Canais classificados

```typescript
const { data } = await supabase
  .from('channels')
  .select('*, personas(*)')
  .eq('status', 'classified');
```

### Canais de uma persona específica

```typescript
const { data } = await supabase
  .from('channels')
  .select('*')
  .eq('persona_id', 'jax');
```

### Contar canais por persona

```typescript
const { count } = await supabase
  .from('channels')
  .select('*', { count: 'exact', head: true })
  .eq('persona_id', 'jax');

console.log(`JAX tem ${count} canais`);
```

## 4. Inserir Dados (requer autenticação)

### Inserir uma nova persona

```typescript
const { data, error } = await supabase
  .from('personas')
  .insert({
    id: 'new-persona',
    name: 'NEW PERSONA',
    cluster: 'Creator-as-X',
    // ... resto dos campos
  });
```

### Inserir um canal

```typescript
const { data, error } = await supabase
  .from('channels')
  .insert({
    channel_id: 'UCxxxxxxx',
    channel_url: 'https://youtube.com/channel/UCxxxxxxx',
    persona_id: 'jax',
    status: 'classified'
  });
```

## 5. Atualizar Dados

### Atualizar uma persona

```typescript
const { data, error } = await supabase
  .from('personas')
  .update({ primary_platform: 'YouTube Shorts' })
  .eq('id', 'jax');
```

## 6. Busca em Tempo Real (Realtime)

### Escutar mudanças nas personas

```typescript
const channel = supabase
  .channel('personas-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'personas'
    },
    (payload) => {
      console.log('Mudança detectada:', payload);
    }
  )
  .subscribe();

// Cleanup
channel.unsubscribe();
```

## 7. Busca com Full Text Search

```typescript
// Buscar personas por palavra-chave na definição
const { data } = await supabase
  .from('personas')
  .select('*')
  .textSearch('definition', 'creator');
```

## 8. Agregações

### Contar personas por plataforma

```typescript
const { data } = await supabase
  .from('personas')
  .select('primary_platform')
  .then(result => {
    const counts = result.data?.reduce((acc, p) => {
      acc[p.primary_platform] = (acc[p.primary_platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return counts;
  });
```

## 9. Server Components (Next.js App Router)

```typescript
// app/personas/page.tsx
import { supabase } from '@/lib/supabase';

export default async function PersonasPage() {
  const { data: personas } = await supabase
    .from('personas')
    .select('*');

  return (
    <div>
      {personas?.map(persona => (
        <div key={persona.id}>{persona.name}</div>
      ))}
    </div>
  );
}
```

## 10. API Routes (Next.js)

```typescript
// app/api/personas/route.ts
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase
    .from('personas')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
```

## Dicas de Performance

### 1. Use select específico
```typescript
// ❌ Ruim - busca tudo
const { data } = await supabase.from('personas').select('*');

// ✅ Bom - busca apenas o necessário
const { data } = await supabase
  .from('personas')
  .select('id, name, cluster');
```

### 2. Use paginação
```typescript
const pageSize = 10;
const page = 1;

const { data } = await supabase
  .from('channels')
  .select('*')
  .range((page - 1) * pageSize, page * pageSize - 1);
```

### 3. Cache com Next.js
```typescript
// Revalidar a cada hora
export const revalidate = 3600;

export default async function Page() {
  const { data } = await supabase.from('personas').select('*');
  return <div>{/* ... */}</div>;
}
```

## Troubleshooting

### Erro: "Failed to fetch"
- Verifique se as variáveis de ambiente estão corretas
- Confirme que as tabelas existem no Supabase
- Verifique as políticas de RLS

### Erro: "Row Level Security"
- As políticas de leitura pública estão habilitadas
- Para escrita, você precisa autenticação

### Dados não aparecem
- Execute `npm run seed` para popular o banco
- Verifique no Table Editor do Supabase se os dados existem
