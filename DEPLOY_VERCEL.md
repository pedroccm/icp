# Deploy no Vercel - Guia Rápido

## Problema: Build Falhando

O erro `supabaseUrl is required` acontece porque o Vercel não tem acesso às variáveis de ambiente do Supabase.

## Solução: Configurar Variáveis de Ambiente no Vercel

### Passo 1: Acessar o Dashboard do Vercel

1. Acesse: https://vercel.com/dashboard
2. Entre no projeto `icp` (ou o nome do seu projeto)
3. Clique em **Settings** (Configurações)

### Passo 2: Adicionar Variáveis de Ambiente

1. No menu lateral, clique em **Environment Variables**
2. Adicione as seguintes variáveis:

#### Variável 1:
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://ynxopsogitjvbfuhdjoi.supabase.co`
- **Environment:** Selecione todas (Production, Preview, Development)
- Clique em **Add**

#### Variável 2:
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `sb_publishable_Bpaed8BirwO0bKEq6z_iDA_yFmlE8_T`
- **Environment:** Selecione todas (Production, Preview, Development)
- Clique em **Add**

### Passo 3: Fazer Redeploy

Depois de adicionar as variáveis, você tem duas opções:

#### Opção A: Redeploy pelo Dashboard
1. Vá em **Deployments** no menu lateral
2. Clique nos 3 pontinhos do último deploy
3. Clique em **Redeploy**
4. Confirme

#### Opção B: Fazer novo commit
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

### Passo 4: Verificar

Aguarde o build completar (1-2 minutos) e acesse o link do seu projeto!

## Resumo Visual

```
Vercel Dashboard
  └── Seu Projeto (icp)
      └── Settings
          └── Environment Variables
              ├── NEXT_PUBLIC_SUPABASE_URL = https://ynxopsogitjvbfuhdjoi.supabase.co
              └── NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_Bpaed8BirwO0bKEq6z_iDA_yFmlE8_T
```

## Notas de Segurança

✅ **É seguro** expor `NEXT_PUBLIC_SUPABASE_ANON_KEY` porque:
- É uma chave pública (anon key)
- O Supabase usa Row Level Security (RLS) para proteger os dados
- Apenas operações permitidas pelas políticas RLS funcionarão

⚠️ **NUNCA** exponha:
- `SUPABASE_SERVICE_ROLE_KEY` (chave privada)
- Senhas
- Tokens de API privados

## Troubleshooting

### Build ainda falha após adicionar variáveis?

1. Verifique se os nomes estão EXATAMENTE corretos:
   - `NEXT_PUBLIC_SUPABASE_URL` (case-sensitive)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Verifique se selecionou todos os ambientes (Production, Preview, Development)

3. Tente fazer redeploy manualmente

### Como verificar se as variáveis estão configuradas?

No Vercel Dashboard:
1. Settings → Environment Variables
2. Você deve ver as 2 variáveis listadas

## Alternativa: Usar Vercel CLI

Se preferir fazer via CLI:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Adicionar variáveis
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Cole o valor: https://ynxopsogitjvbfuhdjoi.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Cole o valor: sb_publishable_Bpaed8BirwO0bKEq6z_iDA_yFmlE8_T

# Redeploy
vercel --prod
```

## Deploy Automático

Após configurar as variáveis uma vez:
- ✅ Cada `git push` no GitHub fará deploy automático
- ✅ As variáveis já estarão disponíveis
- ✅ O build funcionará sem erros

---

**Pronto!** Depois de configurar as variáveis, seu deploy funcionará perfeitamente! 🚀
