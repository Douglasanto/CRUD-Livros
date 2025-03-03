import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

interface BookFormData {
  name: string;
  author_id?: string;
  pages?: number;
}

interface BookFormProps {
  onSubmit: (data: BookFormData) => void;
  authors: { id: string; name: string; books: { name: string }[] }[];
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
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

const InfoMessage = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

export function BookForm({ onSubmit, authors }: BookFormProps) {
  const { addAuthor } = useContext(AppContext)!;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    setValue,
  } = useForm<BookFormData>();

  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorEmail, setNewAuthorEmail] = useState("");

  const bookName = useWatch({ control, name: "name" });
  const selectedAuthorId = useWatch({ control, name: "author_id" });

  const handleFormSubmit = (data: BookFormData) => {
    const selectedAuthor = authors.find(
      (author) => author.id === selectedAuthorId
    );

    if (selectedAuthor) {
      const isBookDuplicate = selectedAuthor.books.some(
        (book) => book.name.toLowerCase() === data.name.toLowerCase()
      );

      if (isBookDuplicate) {
        setError("name", {
          type: "manual",
          message: "Um livro com o mesmo nome já existe para este autor.",
        });
        return;
      }
    }

    if (!selectedAuthorId && !newAuthorName) {
      setError("author_id", {
        type: "manual",
        message: "Selecione um autor ou crie um novo.",
      });
      return;
    }

    let authorId = selectedAuthorId;
    if (!selectedAuthorId && newAuthorName) {
      const isAuthorDuplicate = authors.some(
        (author) => author.name.toLowerCase() === newAuthorName.toLowerCase()
      );

      if (isAuthorDuplicate) {
        setError("author_id", {
          type: "manual",
          message: "Um autor com o mesmo nome já existe.",
        });
        return;
      }

      if (
        newAuthorEmail &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newAuthorEmail)
      ) {
        setError("author_id", {
          type: "manual",
          message: "Por favor, insira um email válido.",
        });
        return;
      }

      const newAuthor = {
        id: String(Date.now()),
        name: newAuthorName,
        email: newAuthorEmail || undefined,
        books: [],
      };
      addAuthor(newAuthor);
      authorId = newAuthor.id;
    }

    onSubmit({ ...data, author_id: authorId });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("author_id", e.target.value);
    if (e.target.value) {
      setNewAuthorName("");
      setNewAuthorEmail("");
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormSection>
        <h3>Adicionar Livro</h3>
        <Input
          {...register("name", { required: "O nome do livro é obrigatório." })}
          placeholder="Nome do livro"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

        <Select {...register("author_id")} onChange={handleSelectChange}>
          <option value="">Selecione um autor</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </Select>
        {errors.author_id && (
          <ErrorMessage>{errors.author_id.message}</ErrorMessage>
        )}

        <Input
          type="number"
          {...register("pages")}
          placeholder="Número de páginas (opcional)"
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

      <Button type="submit">Adicionar Livro</Button>
    </Form>
  );
}
