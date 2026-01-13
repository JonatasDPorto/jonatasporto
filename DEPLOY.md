# Como fazer deploy no GitHub Pages

## Passo a Passo

### 1. Preparar o repositório

Certifique-se de que seu código está no GitHub:
```bash
git add .
git commit -m "Preparar para deploy no GitHub Pages"
git push origin main
```

### 2. Habilitar GitHub Pages (IMPORTANTE - FAÇA ISSO PRIMEIRO!)

⚠️ **Você DEVE fazer isso ANTES de fazer push do código, ou o workflow vai falhar!**

1. Vá para o seu repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione **GitHub Actions** (não "Deploy from a branch")
5. Salve as configurações

**Nota:** Se você não vir a opção "GitHub Actions", pode ser que o repositório ainda não tenha o workflow. Nesse caso:
- Faça o push primeiro
- Depois volte em Settings > Pages e selecione "GitHub Actions"

### 3. Deploy Automático

O workflow já está configurado! Toda vez que você fizer push para a branch `main`, o site será automaticamente construído e publicado.

### 4. Acessar seu site

Após o primeiro deploy (pode levar alguns minutos), seu site estará disponível em:

- Se o repositório se chama `username.github.io`: `https://username.github.io`
- Se o repositório tem outro nome: `https://username.github.io/nome-do-repositorio`

### 5. Verificar o deploy

1. Vá para a aba **Actions** no seu repositório
2. Você verá o workflow "Deploy to GitHub Pages" rodando
3. Quando terminar (ícone verde), clique nele para ver os detalhes
4. O link do site estará disponível na seção de deploy

## Configuração do Base Path

O `vite.config.ts` está configurado para detectar automaticamente o nome do repositório. Se você precisar ajustar manualmente:

1. Abra `vite.config.ts`
2. Se seu repositório é `username.github.io`, altere `base` para `'/'`
3. Se seu repositório tem outro nome, altere `base` para `'/nome-do-repositorio/'`

## Troubleshooting

### Site não carrega
- Verifique se o workflow foi executado com sucesso na aba Actions
- Aguarde alguns minutos após o push (o deploy pode levar tempo)
- Verifique se o base path está correto no `vite.config.ts`

### Imagens não aparecem
- Certifique-se de que as imagens estão na pasta `public/` ou `src/assets/`
- Verifique se os caminhos das imagens estão corretos

### Erro 404 em rotas
- Se você usa React Router, pode precisar configurar um arquivo `404.html` que redirecione para `index.html`

## Deploy Manual (Alternativa)

Se preferir fazer deploy manual:

```bash
# 1. Fazer build
npm run build

# 2. Entrar na pasta dist
cd dist

# 3. Inicializar git (se ainda não tiver)
git init
git add .
git commit -m "Deploy"

# 4. Adicionar remote (substitua USERNAME e REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# 5. Fazer push para branch gh-pages
git branch -M gh-pages
git push -f origin gh-pages
```

Depois, configure o GitHub Pages para usar a branch `gh-pages` em vez de GitHub Actions.

