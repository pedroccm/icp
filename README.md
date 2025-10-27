# MADE ICP Personas - Next.js Application

Este é um projeto Next.js que transforma o HTML original de análise de personas em uma aplicação moderna com React e TypeScript.

## Estrutura do Projeto

```
front-end/
├── app/
│   ├── layout.tsx          # Layout principal da aplicação
│   ├── page.tsx            # Página principal com navegação
│   └── globals.css         # Estilos globais (CSS custom properties)
├── components/
│   ├── Header.tsx          # Componente de cabeçalho
│   ├── Navigation.tsx      # Navegação principal (Dashboard/Personas/Channels)
│   ├── Dashboard.tsx       # Seção de dashboard com estatísticas
│   ├── PersonasSection.tsx # Seção de personas com busca
│   └── PersonaCard.tsx     # Card detalhado de cada persona
├── lib/
│   └── personasData.ts     # Dados das personas (tipos e dados)
└── package.json            # Dependências do projeto
```

## Tecnologias Utilizadas

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS (com CSS custom properties para tema)

## Executando o Projeto

### Modo Desenvolvimento

```bash
cd front-end
npm run dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
npm start
```

## Funcionalidades Implementadas

### ✅ Dashboard
- Estatísticas gerais (Total Processed, Classified, Success Rate, Unclassified)
- Gráfico de barras com distribuição de ICPs
- Informações sobre canais não classificados

### ✅ Personas
- Navegação por tabs entre personas
- Busca de personas por nome, cluster ou definição
- Cards detalhados com todas as informações:
  - Demographics (Age, Gender, Channel Size, Upload Cadence)
  - Geographic Distribution
  - MADE Must-Have Benefits (Milo & Zara)
  - Example Channel Types
  - Tasks & Workflows
  - Expected Benefits
  - Revenue Mix
  - Pain Points
  - Communications & Marketing
  - Purchase Behavior & Decision Making
  - Psychographic Profile
  - Software & Tools Stack

### 🚧 Channels (Próximos Passos)
- Listagem de todos os canais
- Paginação
- Filtros

## Componentes

### Header
Cabeçalho simples com título e descrição do projeto.

### Navigation
Navegação principal com 3 seções:
- Dashboard
- Personas
- All Channels

### Dashboard
Exibe estatísticas e distribuição dos ICPs em formato visual.

### PersonasSection
Gerencia a navegação entre personas e a busca. Renderiza o PersonaCard da persona ativa.

### PersonaCard
Exibe todos os detalhes de uma persona em um layout organizado e responsivo.

## Dados

Os dados das personas estão em `lib/personasData.ts`. Atualmente, temos 3 personas como exemplo:
- JAX
- ELI
- LUCY

Você pode adicionar mais personas seguindo a interface `Persona` definida no arquivo.

## Supabase - Banco de Dados

O projeto está configurado para usar Supabase como banco de dados.

### Configuração Rápida:

1. **Criar as tabelas no Supabase**
   - Acesse o [Dashboard do Supabase](https://app.supabase.com)
   - Vá em **SQL Editor**
   - Execute o arquivo `supabase-schema.sql`

2. **Popular o banco com as personas**
   ```bash
   npm run seed
   ```

3. **Documentação completa**:
   - `GUIA_SUPABASE.md` - Configuração e uso do Supabase
   - `EXEMPLOS_SUPABASE.md` - Exemplos de código

### Arquivos de Configuração:

- ✅ `.env.local` - Variáveis de ambiente (já configurado)
- ✅ `lib/supabase.ts` - Cliente do Supabase
- ✅ `lib/database.types.ts` - TypeScript types
- ✅ `supabase-schema.sql` - Schema SQL
- ✅ `scripts/seed-personas.ts` - Script para popular dados

## Próximos Passos

1. ✅ **Adicionar todas as personas** - Todas as 13 personas estão incluídas
2. ✅ **Supabase configurado** - Banco de dados pronto para uso
3. **Implementar a seção de Channels** - Listagem com paginação
4. **Tabela de comparação** - Adicionar tabela comparativa entre personas
5. **Buscar dados do Supabase** - Integrar consultas dinâmicas
6. **Melhorias de UI/UX** - Animações, transições suaves
7. **Responsividade** - Otimizar para mobile
8. **Testes** - Adicionar testes unitários e E2E

## Estilo Visual

O projeto mantém o tema escuro do HTML original usando CSS custom properties:
- Background primário: `#09090b`
- Background secundário: `#18181b`
- Texto primário: `#fafafa`
- Accent: `#3b82f6` (azul)

## Licença

Projeto RHEI - MADE ICP Personas
