import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

interface AuthorFormData {
  name: string;
  email?: string;
}

interface AuthorFormProps {
  onSubmit: (data: AuthorFormData) => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 10px;
    gap: 0.5rem;
  }
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.3rem;
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
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

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
`;

export function AuthorForm({ onSubmit }: AuthorFormProps) {
  const { authors } = useContext(AppContext)!;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthorFormData>();

  const handleFormSubmit = (data: AuthorFormData) => {
    const isDuplicate = authors.some(
      (author) =>
        author.name.toLowerCase() === data.name.toLowerCase() ||
        (data.email && author.email?.toLowerCase() === data.email.toLowerCase())
    );

    if (isDuplicate) {
      setError("name", {
        type: "manual",
        message: "Um autor com o mesmo nome ou email já existe.",
      });
      return;
    }

    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        {...register("name", { required: "O nome do autor é obrigatório." })}
        placeholder="Nome do autor"
      />
      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

      <Input
        {...register("email", {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Por favor, insira um email válido.",
          },
        })}
        placeholder="Email do autor (opcional)"
      />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

      <Button type="submit">Adicionar Autor</Button>
    </Form>
  );
}
