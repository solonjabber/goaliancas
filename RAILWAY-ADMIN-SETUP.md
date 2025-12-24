# Deploy do Admin UI Separado no Railway

Este guia explica como criar um segundo serviço no Railway dedicado APENAS ao painel admin do Payload CMS.

## Por que fazer isso?

- O plano free do Railway tem limite de 512MB de RAM
- O admin UI do Payload consome muita memória durante a compilação
- Com 2 serviços separados, cada um tem sua própria alocação de memória
- O serviço da API (para o site) fica sempre estável
- O serviço do admin (para gerenciar) funciona em produção

## Passo a Passo

### 1. Criar novo serviço no Railway

Via Railway CLI (no diretório D:\goaliancas):

```bash
# Criar novo serviço no mesmo projeto
railway service create payload-admin
```

Ou via Dashboard do Railway:
1. Acesse: https://railway.com/project/ab87c600-990d-4dca-bfb4-9578f81b9389
2. Clique em **"+ New Service"**
3. Selecione **"Empty Service"**
4. Renomeie para **"payload-admin"**

### 2. Configurar variáveis de ambiente

No novo serviço **payload-admin**, adicione as mesmas variáveis do serviço principal, MAS:

- ✅ **MONGODB_URI**: (mesma do payload-api)
- ✅ **PAYLOAD_SECRET**: (mesma do payload-api)
- ✅ **NODE_ENV**: production
- ✅ **PORT**: 8080
- ✅ **NEXT_PUBLIC_SERVER_URL**: https://[URL-DO-ADMIN].up.railway.app
- ✅ **NEXT_PUBLIC_API_URL**: https://[URL-DO-ADMIN].up.railway.app/api
- ❌ **DISABLE_PAYLOAD_ADMIN**: NÃO adicionar (ou definir como "false")

### 3. Fazer deploy

```bash
# Linkar ao novo serviço
railway service link payload-admin

# Fazer upload do código
railway up --service payload-admin
```

### 4. Configurar domínio público

```bash
railway domain
```

Isso criará uma URL como: `payload-admin-production-xxxx.up.railway.app`

## Estrutura Final

```
┌─────────────────────────────────────┐
│   payload-api (Serviço 1)           │
│   - API REST para o site            │
│   - Admin UI: DESABILITADO          │
│   - Memória: 512MB                  │
└──────────────┬──────────────────────┘
               │
               │ Ambos usam o
               │ mesmo MongoDB
               │
┌──────────────▼──────────────────────┐
│   payload-admin (Serviço 2)         │
│   - Admin UI: HABILITADO            │
│   - Memória: 512MB                  │
│   - Apenas para gerenciar           │
└─────────────────────────────────────┘
```

## URLs Finais

- **Site Público**: https://goaliancas.vercel.app (usa a API do payload-api)
- **API REST**: https://payload-api-production-9a40.up.railway.app/api
- **Admin UI**: https://payload-admin-production-xxxx.up.railway.app/admin

## Custos

- Plano Free: $5 de crédito/mês
- 2 serviços no free: ~$2.50 cada
- Se ultrapassar o limite free, considere upgrade para Hobby ($5/mês)
