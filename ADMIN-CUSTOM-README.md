# 🎛️ Admin Customizado - GO Alianças

Interface administrativa customizada e leve para gerenciar produtos, hospedada diretamente no Vercel (100% gratuito).

## 🌟 Por que usar o Admin Customizado?

O Payload CMS Admin UI requer ~1GB+ de RAM para compilar o webpack, o que ultrapassa os limites dos planos gratuitos do Railway (512MB) e Render (512MB).

A solução foi criar uma **interface admin simplificada** que:
- ✅ Roda no Vercel (100% gratuito)
- ✅ Sem compilação pesada de webpack
- ✅ Interface limpa e responsiva
- ✅ Funcionalidades essenciais de CRUD
- ✅ Cliente pode testar online

## 🔐 Acesso

**URL**: https://goaliancas.vercel.app/admin-custom/login

**Credenciais padrão**:
- Usuário: `admin`
- Senha: `goaliancas2024`

## ✨ Funcionalidades

### ✅ Implementado

1. **Dashboard** (`/admin-custom`)
   - Estatísticas de produtos e categorias
   - Navegação rápida

2. **Gestão de Produtos** (`/admin-custom/produtos`)
   - ✅ Listar todos os produtos
   - ✅ Adicionar novo produto
   - ✅ Deletar produto
   - ⏳ Editar produto (em desenvolvimento)
   - ⏳ Upload de imagens (em desenvolvimento)

3. **Visualização de Categorias** (`/admin-custom/categorias`)
   - ✅ Listar categorias existentes
   - ⏳ CRUD completo (em desenvolvimento)

4. **Autenticação**
   - ✅ Login simples com usuário/senha
   - ✅ Proteção de rotas
   - ✅ Logout

### 🚧 Em Desenvolvimento

- Edição de produtos existentes
- Upload de imagens de produtos
- CRUD completo de categorias
- Gestão de banners
- Gestão de depoimentos

## 🏗️ Arquitetura

```
┌─────────────────────────────────┐
│   Frontend Vercel               │
│   /admin-custom/*               │
│   - Next.js 15                  │
│   - React                       │
│   - Tailwind CSS                │
└────────────┬────────────────────┘
             │
             │ API Routes (/api/admin/*)
             │
             ▼
┌─────────────────────────────────┐
│   Payload API (Railway)         │
│   payload-api-production-9a40   │
│   - REST API                    │
│   - MongoDB Atlas               │
└─────────────────────────────────┘
```

## 🔧 Configuração de Variáveis de Ambiente

As seguintes variáveis já estão configuradas no Vercel:

- `NEXT_PUBLIC_API_URL`: `https://payload-api-production-9a40.up.railway.app/api`
- `ADMIN_USERNAME`: `admin` (opcional, padrão já definido)
- `ADMIN_PASSWORD`: `goaliancas2024` (opcional, padrão já definido)

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em dev
npm run dev

# Acessar admin
http://localhost:3000/admin-custom/login
```

## 📝 Fluxo de Uso

1. **Login**: Acesse `/admin-custom/login` e faça login
2. **Dashboard**: Visualize estatísticas gerais
3. **Produtos**: Clique em "Gerenciar Produtos"
4. **Adicionar**: Clique em "+ Novo Produto" e preencha o formulário
5. **Salvar**: O produto é criado na API do Railway e aparece no site

## 🚀 Deploy

O admin customizado está hospedado no Vercel junto com o frontend principal:
- URL do site: https://goaliancas.vercel.app
- URL do admin: https://goaliancas.vercel.app/admin-custom

Qualquer push para o branch `master` no GitHub dispara um deploy automático.

## 🔒 Segurança

**⚠️ IMPORTANTE**: Antes de colocar em produção real:

1. **Altere as credenciais**:
   - Configure `ADMIN_USERNAME` e `ADMIN_PASSWORD` nas variáveis de ambiente do Vercel
   - Use senhas fortes

2. **Implemente JWT**:
   - O sistema atual usa autenticação básica
   - Para produção, implemente JWT com refresh tokens

3. **Adicione rate limiting**:
   - Proteja contra ataques de força bruta
   - Use middleware do Next.js

4. **Configure HTTPS**:
   - O Vercel já fornece HTTPS automático ✅

## 🆘 Suporte

**Problemas comuns**:

1. **"Credenciais inválidas"**
   - Verifique usuário/senha
   - Padrão: admin / goaliancas2024

2. **"Erro ao carregar produtos"**
   - Verifique se a API do Railway está online
   - URL: https://payload-api-production-9a40.up.railway.app/api/products

3. **Não consegue adicionar produto**
   - Verifique o console do navegador (F12)
   - Verifique logs da API do Railway

## 📚 Próximos Passos

1. Implementar edição de produtos
2. Adicionar upload de imagens
3. CRUD completo de categorias
4. Melhorar autenticação (JWT)
5. Adicionar logs de auditoria
6. Implementar busca e filtros avançados

---

**Criado com** ❤️ **usando Claude Code**
