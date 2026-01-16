# Portfólio - Jônatas Dourado Porto

Portfólio pessoal desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## 🚀 Tecnologias

Este projeto foi construído com:

- **Vite** - Build tool e dev server
- **React** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn-ui** - Componentes UI baseados em Radix UI
- **React Router** - Roteamento para aplicações React
- **i18next** - Internacionalização (PT/EN)
- **Framer Motion** - Biblioteca de animações

## 📦 Instalação

```sh
# Clone o repositório
git clone <YOUR_GIT_URL>

# Navegue até o diretório do projeto
cd jonatasporto

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter
- `npm run deploy` - Build e deploy para GitHub Pages

## 🌐 Internacionalização

O site suporta dois idiomas:

- **Português** - Rota padrão (`/`)
- **Inglês** - Rota `/en`

O idioma pode ser alterado através do seletor no header do site.

## 📄 Estrutura do Projeto

```
src/
├── components/     # Componentes React
├── pages/         # Páginas da aplicação
├── i18n/          # Configuração de traduções
│   └── locales/   # Arquivos de tradução (pt.json, en.json)
├── assets/         # Imagens e recursos estáticos
├── hooks/          # Custom hooks
└── lib/            # Utilitários
```

## 🚢 Deploy

O projeto está configurado para deploy no GitHub Pages. O build é feito automaticamente através do GitHub Actions.

Para fazer deploy manual:

```sh
npm run deploy
```

## 📝 Licença

Este projeto é de uso pessoal.
