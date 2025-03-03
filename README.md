# CRUD de Livraria

Este projeto é um CRUD (Create, Read, Update, Delete) desenvolvido com **React**, **TypeScript** e **Vite**, focado em gerenciar livros e autores de uma livraria. O objetivo principal é demonstrar a capacidade de implementar funcionalidades básicas de maneira eficiente e bem estruturada.

---

## Funcionalidades

### Autores
- **Adicionar autor**: Adicione novos autores com nome e email (opcional).
- **Visualizar autores**: Lista de autores cadastrados.
- **Excluir autor**: Remova autores e seus livros associados.

### Livros
- **Adicionar livro**: Adicione novos livros com nome, autor associado e número de páginas (opcional).
- **Visualizar livros**: Lista de livros cadastrados.
- **Excluir livro**: Remova livros individualmente.
- **Editar livro**: Edite informações dos livros cadastrados.

### Contexto e Persistência
- **Context API**: Gerencia o estado global da aplicação (autores e livros).
- **Persistência no LocalStorage**: Os dados são salvos no `localStorage` para persistência entre sessões.

---

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Vite
- **Gerenciamento de Estado**: Context API
- **Persistência de Dados**: `localStorage` (via hook personalizado `useLocalStorage`)
- **Estilização**: [CSS]
- **Bibliotecas de UI**: [react-hook-form]

---

## Instalação e Execução

### 1️⃣ Instale as Dependências
```bash
npm install
# ou
yarn install

### 2️⃣ Execute o Projeto

npm run dev
# ou
yarn dev


## 📂 Estrutura do Projeto

CRUD-LIVROS/
├── public/
├── src/
│   ├── components/          # Componentes reutilizáveis (Modal,Table e Forms)
│   ├── context/             # Contextos para gerenciamento de estado
│   ├── hooks/               # Hooks personalizados (ex: useLocalStorage)
│   ├── pages/               # Páginas da aplicação
│   ├── types/               # Tipos TypeScript
│   ├── App.css              # Componente styles
│   ├── main.tsx             # Ponto de entrada da aplicação
│   └── App.tsx              # Componente principal
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── README.md