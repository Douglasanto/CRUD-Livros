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