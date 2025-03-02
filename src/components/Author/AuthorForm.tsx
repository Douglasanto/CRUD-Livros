import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";

interface AuthorFormData {
  name: string;
  email?: string;
}

const AuthorForm: React.FC = () => {
  const { addAuthor } = useContext(AppContext)!;
  const { register, handleSubmit, reset } = useForm<AuthorFormData>();

  const onSubmit = (data: AuthorFormData) => {
    const newAuthor = {
      id: String(Date.now()),
      ...data,
    };
    addAuthor(newAuthor);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Nome do autor"
        {...register("name", { required: true })}
      />
      <input
        type="email"
        placeholder="Email do autor (opcional)"
        {...register("email")}
      />
      <button type="submit">Adicionar Autor</button>
    </form>
  );
};

export default AuthorForm;
