import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { BookForm } from "../components/Book/BookForm";
import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import styled from "styled-components";
import { Book } from "../types";

const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #059669;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
  }
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

  @media (max-width: 768px) {
    width: 95%;
    text-align: center;
    display: inline;
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SaveButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background: #059669;
  }
`;

const ModalLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ModalParagraph = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  strong {
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Books: React.FC = () => {
  const { books, authors, addBook, removeBook, updateBook } =
    useContext(AppContext)!;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editedBook, setEditedBook] = useState<Book | null>(null);

  const handleAddBook = (data: {
    name: string;
    author_id: string;
    pages?: number;
  }) => {
    addBook({
      id: String(Date.now()),
      ...data,
    });
    setIsAddModalOpen(false);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setEditedBook({ ...book });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedBook(null);
    setEditedBook(null);
  };

  const handleSaveChanges = () => {
    if (editedBook) {
      updateBook(editedBook.id, editedBook);
      handleCloseModal();
    }
  };

  const tableData = books.map((book) => ({
    ...book,
    author:
      authors.find((a) => a.id === book.author_id)?.name || "Desconhecido",
  }));

  const columns: ("name" | "author" | "pages")[] = [
    "name",
    "author",
    "pages",
  ];

  return (
    <Container>
      <Header>
        <Title>Lista de Livros</Title>
        <AddButton onClick={() => setIsAddModalOpen(true)}>
          Adicionar Livro
        </AddButton>
      </Header>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Adicionar Livro"
      >
        <BookForm onSubmit={handleAddBook} authors={authors} />
      </Modal>

      <Table
        data={tableData}
        columns={columns}
        onRowClick={handleBookClick}
        onRemove={removeBook}
        onEdit={handleEditClick}
      />

      <Modal
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        title={selectedBook?.name || "Detalhes do Livro"}
      >
        {selectedBook && (
          <ModalContent>
            <ModalParagraph>
              <strong>Nome:</strong> {selectedBook.name}
            </ModalParagraph>
            <ModalParagraph>
              <strong>Autor:</strong>{" "}
              {authors.find((a) => a.id === selectedBook.author_id)?.name ||
                "Desconhecido"}
            </ModalParagraph>
            <ModalParagraph>
              <strong>Páginas:</strong> {selectedBook.pages || "N/A"}
            </ModalParagraph>
          </ModalContent>
        )}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        title={selectedBook?.name || "Editar Livro"}
      >
        {editedBook && (
          <ModalContent>
            <ModalLabel>
              <strong>Nome:</strong>
              <InputField
                type="text"
                value={editedBook.name}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, name: e.target.value })
                }
              />
            </ModalLabel>
            <ModalLabel>
              <strong>Autor:</strong>
              <SelectField
                value={editedBook.author_id}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, author_id: e.target.value })
                }
              >
                <option value="">Selecione um autor</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </SelectField>
            </ModalLabel>
            <ModalLabel>
              <strong>Páginas:</strong>
              <InputField
                type="number"
                value={editedBook.pages || ""}
                onChange={(e) =>
                  setEditedBook({
                    ...editedBook,
                    pages: parseInt(e.target.value),
                  })
                }
              />
            </ModalLabel>
            <SaveButton onClick={handleSaveChanges}>Salvar</SaveButton>
          </ModalContent>
        )}
      </Modal>

      <BackLink to="/">Voltar para a página inicial</BackLink>
    </Container>
  );
};

export default Books;
