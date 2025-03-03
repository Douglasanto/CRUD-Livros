import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import styled from "styled-components";
import { Modal } from "../Modal"; // Importe o Modal que criamos

interface BookFormData {
  name: string;
  author_id: string;
  pages?: number;
}

// Estilos com styled-components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #2563eb;
  }
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const InfoMessage = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormDivider = styled.hr`
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 1rem 0;
`;

const BookForm: React.FC = () => {
  const { authors, addBook, addAuthor } = useContext(AppContext)!;
  const { register, handleSubmit, reset, watch } = useForm<BookFormData>();
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorEmail, setNewAuthorEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bookName = watch("name");
  const selectedAuthorId = watch("author_id");

  const onSubmit = (data: BookFormData) => {
    let authorId = data.author_id;

    if (!data.author_id && newAuthorName) {
      const newAuthor = {
        id: String(Date.now()),
        name: newAuthorName,
        email: newAuthorEmail || undefined,
      };
      addAuthor(newAuthor);
      authorId = newAuthor.id;
    }

    const newBook = {
      id: String(Date.now()),
      name: data.name,
      author_id: authorId,
      pages: data.pages || undefined,
    };
    addBook(newBook);
    reset();
    setNewAuthorName("");
    setNewAuthorEmail("");
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Adicionar Livro</Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar Livro"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormSection>
            <h3>Adicionar Livro</h3>
            <Input
              type="text"
              placeholder="Nome do livro"
              {...register("name", { required: true })}
            />
            <Select {...register("author_id")}>
              <option value="">Selecione um autor</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </Select>
            <Input
              type="number"
              placeholder="Número de páginas (opcional)"
              {...register("pages")}
            />
          </FormSection>

          <FormDivider />

          <FormSection>
            <h3>Novo Autor</h3>
            {(!bookName || selectedAuthorId) && (
              <InfoMessage>
                {!bookName
                  ? "Adicione o nome do livro para habilitar a criação de um novo autor."
                  : "Selecione 'Selecione um autor' para habilitar a criação de um novo autor."}
              </InfoMessage>
            )}
            <Input
              type="text"
              placeholder="Nome do novo autor"
              value={newAuthorName}
              onChange={(e) => setNewAuthorName(e.target.value)}
              disabled={!bookName || !!selectedAuthorId}
            />
            <Input
              type="email"
              placeholder="Email do novo autor (opcional)"
              value={newAuthorEmail}
              onChange={(e) => setNewAuthorEmail(e.target.value)}
              disabled={!bookName || !!selectedAuthorId}
            />
          </FormSection>

          <Button
            type="submit"
            disabled={!bookName || !(selectedAuthorId || newAuthorName)}
          >
            Adicionar Livro
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default BookForm;
