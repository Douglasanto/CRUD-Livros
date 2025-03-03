import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import styled from "styled-components";
import { Modal } from "../Modal";

interface AuthorFormData {
  name: string;
  email?: string;
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

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: -0.5rem;
`;

const AuthorForm: React.FC = () => {
  const { authors, addAuthor } = useContext(AppContext)!;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorFormData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: AuthorFormData) => {
    const isDuplicate = authors.some(
      (author) =>
        author.name.toLowerCase() === data.name.toLowerCase() ||
        (data.email && author.email?.toLowerCase() === data.email.toLowerCase())
    );

    if (isDuplicate) {
      setError("Um autor com o mesmo nome ou email já existe.");
      return; 
    }

    const newAuthor = {
      id: String(Date.now()),
      ...data,
    };
    addAuthor(newAuthor);
    reset();
    setError(null); 
    setIsModalOpen(false); 
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Adicionar Autor</Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setError(null); 
        }}
        title="Adicionar Autor"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Nome do autor"
            {...register("name", {
              required: "O nome do autor é obrigatório.",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

          <Input
            type="email"
            placeholder="Email do autor (opcional)"
            {...register("email")}
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit">Adicionar Autor</Button>
        </Form>
      </Modal>
    </>
  );
};

export default AuthorForm;
