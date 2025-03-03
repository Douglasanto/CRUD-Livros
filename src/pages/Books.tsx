import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BookList from "../components/Book/BookList";
import { Modal } from "../components/Modal";
import styled from "styled-components";
import BookForm from "../components/Book/BookForm";

const Books: React.FC = () => {
  const { books, removeBook } = useContext(AppContext)!;
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleBookClick = (bookId: string) => {
    setSelectedBookId(bookId);
  };

  const handleCloseModal = () => {
    setSelectedBookId(null);
  };

  const selectedBook = books.find((book) => book.id === selectedBookId);

  // Estilos com styled-components
  const Container = styled.div`
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  `;

  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  `;

  const Title = styled.h1`
    font-size: 2rem;
    color: #333;
    margin: 0; // Remove a margem inferior para alinhar com o formulário
  `;

  const FormContainer = styled.div`
    width: 300px; // Largura fixa para o formulário
  `;

  const BackLink = styled(Link)`
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    &:hover {
      background-color: #2563eb;
    }
  `;

  return (
    <Container>
      <Header>
        <Title>Lista de Livros</Title>
        <FormContainer>
          <BookForm />
        </FormContainer>
      </Header>

      <BookList
        books={books}
        onBookClick={handleBookClick}
        onDeleteBook={removeBook}
      />

      {selectedBook && (
        <Modal
          isOpen={!!selectedBook}
          onClose={handleCloseModal}
          title={selectedBook.name}
        >
          <div>
            <p>
              <strong>Autor:</strong>{" "}
              {selectedBook.author_id
                ? books.find((b) => b.id === selectedBook.author_id)?.name
                : "Desconhecido"}
            </p>
            <p>
              <strong>Páginas:</strong> {selectedBook.pages || "Não informado"}
            </p>
          </div>
        </Modal>
      )}

      <BackLink to="/">Voltar para a página inicial</BackLink>
    </Container>
  );
};

export default Books;
