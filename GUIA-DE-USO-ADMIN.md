# 🎯 Guia de Uso - Admin Customizado GO Alianças

## 🔗 URLs Importantes

### Produção
- **Site Público**: https://goaliancas.vercel.app
- **Admin Panel**: https://goaliancas.vercel.app/admin-custom/login
- **API REST**: https://payload-api-production-9a40.up.railway.app/api

### Deploy Atual
- **URL Vercel**: https://goaliancas-r09zusrzr-solonjabers-projects.vercel.app
- **Admin**: https://goaliancas-r09zusrzr-solonjabers-projects.vercel.app/admin-custom/login

---

## 🔐 Credenciais de Acesso

**Admin Panel**
- **Usuário**: `admin`
- **Senha**: `goaliancas2024`

⚠️ **IMPORTANTE**: Altere essas credenciais antes de usar em produção real!

---

## 📱 Como Usar o Admin

### 1. Fazer Login

1. Acesse: https://goaliancas.vercel.app/admin-custom/login
2. Digite:
   - Usuário: `admin`
   - Senha: `goaliancas2024`
3. Clique em **Entrar**

### 2. Dashboard Principal

Após login, você verá:
- **Total de Produtos**: 14 produtos
- **Total de Categorias**: 4 categorias
- Botões de acesso rápido para:
  - Gerenciar Produtos
  - Gerenciar Categorias

### 3. Gerenciar Produtos

**Listar Produtos:**
1. No dashboard, clique em **"Gerenciar Produtos"**
2. Você verá todos os 14 produtos com:
   - Imagem em miniatura
   - Nome do produto
   - Categoria
   - Preço (e preço promocional se houver)
   - Estoque
   - Botões de ação (Editar/Excluir)

**Adicionar Novo Produto:**
1. Na página de produtos, clique em **"+ Novo Produto"**
2. Preencha o formulário:
   - **Nome do Produto** * (obrigatório)
   - **Descrição** (opcional)
   - **Categoria** * (obrigatório - escolha da lista)
   - **Preço (R$)** * (obrigatório)
   - **Preço Promocional (R$)** (opcional)
   - **Estoque** * (obrigatório)
   - **Metal** (ex: Ouro 18k)
   - **Peso (g)** (peso em gramas)
   - **Largura (mm)** (largura em milímetros)
   - ☑️ **Produto em destaque** (aparecer na home)
   - ☑️ **Permite personalização**
3. Clique em **"Criar Produto"**
4. Aguarde a confirmação
5. O produto aparecerá na lista

**Deletar Produto:**
1. Na lista de produtos, clique em **"Excluir"** no produto desejado
2. Confirme a exclusão
3. O produto será removido imediatamente

### 4. Visualizar Categorias

1. No dashboard, clique em **"Gerenciar Categorias"**
2. Você verá as 4 categorias existentes:
   - Anéis de Formatura
   - Anéis
   - Alianças de Noivado
   - Alianças de Casamento

**Nota**: A criação/edição de categorias está em desenvolvimento. Use o admin local ou a API diretamente.

### 5. Fazer Logout

- Clique no botão **"Sair"** no canto superior direito

---

## ✅ Funcionalidades Implementadas

- ✅ Login e autenticação
- ✅ Dashboard com estatísticas em tempo real
- ✅ Listar todos os produtos (com imagens, preços, estoque)
- ✅ Adicionar novos produtos
- ✅ Deletar produtos
- ✅ Visualizar categorias
- ✅ Interface responsiva (funciona em mobile/tablet/desktop)

## 🚧 Em Desenvolvimento

- ⏳ Editar produtos existentes
- ⏳ Upload de imagens de produtos
- ⏳ CRUD completo de categorias
- ⏳ Gestão de banners
- ⏳ Gestão de depoimentos

---

## 🔄 Fluxo de Trabalho

```
┌─────────────────────────────────────────┐
│  1. Admin faz login no painel          │
│     /admin-custom/login                 │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  2. Adiciona/edita produto              │
│     Formulário com todos os campos      │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  3. Salva via API Routes do Vercel      │
│     /api/admin/produtos                 │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  4. API Routes comunica com Railway     │
│     POST/PUT/DELETE para Payload API    │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  5. Payload salva no MongoDB Atlas      │
│     Banco de dados atualizado           │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  6. Site público reflete mudanças       │
│     https://goaliancas.vercel.app       │
└─────────────────────────────────────────┘
```

---

## 🎨 Interface do Admin

### Cores e Estilo
- **Cor principal**: Amber/Dourado (tema de joalheria)
- **Fonte**: Inter (moderna e limpa)
- **Ícones**: Lucide React
- **Framework**: Tailwind CSS

### Páginas

1. **Login** (`/admin-custom/login`)
   - Design clean com gradiente amber
   - Credenciais visíveis para facilitar

2. **Dashboard** (`/admin-custom`)
   - Cards de estatísticas
   - Acesso rápido às funcionalidades

3. **Produtos** (`/admin-custom/produtos`)
   - Tabela com todas as informações
   - Imagens em miniatura
   - Status de estoque com cores

4. **Novo Produto** (`/admin-custom/produtos/novo`)
   - Formulário completo
   - Validação de campos obrigatórios
   - Feedback visual

5. **Categorias** (`/admin-custom/categorias`)
   - Lista simples
   - Preparado para expansão

---

## 🐛 Resolução de Problemas

### "Credenciais inválidas"
- Verifique se está usando: `admin` / `goaliancas2024`
- Certifique-se de não ter espaços antes/depois

### "Erro ao carregar produtos"
- Verifique se a API do Railway está online
- Acesse: https://payload-api-production-9a40.up.railway.app/api/products
- Se retornar JSON, está funcionando

### "Erro ao adicionar produto"
- Preencha todos os campos obrigatórios (marcados com *)
- Verifique se selecionou uma categoria
- Abra o Console do navegador (F12) para ver erros detalhados

### Admin não carrega (404)
- Limpe cache do navegador (Ctrl+Shift+R)
- Verifique se está na URL correta
- Tente em modo anônimo

---

## 📊 Dados Atuais do Sistema

**Produtos**: 14 produtos cadastrados
- Alianças de Casamento
- Alianças de Noivado
- Anéis de Formatura
- Anéis

**Categorias**: 4 categorias ativas

**Preços**: R$ 4.650 - R$ 9.070

**Estoque**: Todos com 10 unidades

---

## 🔒 Segurança

⚠️ **ANTES DE IR PARA PRODUÇÃO REAL**:

1. **Altere as credenciais**:
   - Vá no Vercel > Settings > Environment Variables
   - Adicione:
     - `ADMIN_USERNAME`: seu_usuario_seguro
     - `ADMIN_PASSWORD`: SuaSenhaForte123!@#

2. **Use HTTPS** (Vercel já fornece ✅)

3. **Adicione rate limiting** para evitar brute force

4. **Implemente JWT** para tokens seguros

5. **Adicione logs de auditoria** para rastrear mudanças

---

## 🚀 Próximos Passos Recomendados

1. **Teste completo**:
   - Adicione um produto de teste
   - Verifique se aparece no site
   - Delete o produto de teste

2. **Personalize**:
   - Altere credenciais de admin
   - Configure domínio customizado (goaliancas.com.br)

3. **Expanda**:
   - Adicione upload de imagens
   - Implemente edição de produtos
   - Adicione mais filtros e buscas

4. **Monitore**:
   - Configure alertas no Vercel
   - Monitore uso da API do Railway
   - Acompanhe performance

---

**Criado com** ❤️ **por Claude Code**
