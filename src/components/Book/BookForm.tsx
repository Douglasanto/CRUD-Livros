import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";

interface BookFormData {
  name: string;
  author_id: string;
  pages?: number;
}

const BookForm: React.FC = () => {
  const { authors, addBook, addAuthor } = useContext(AppContext)!;
  const { register, handleSubmit, reset, watch } = useForm<BookFormData>();
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorEmail, setNewAuthorEmail] = useState("");

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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="book-form">
      <div className="form-section">
        <h3>Adicionar Livro</h3>
        <input
          type="text"
          placeholder="Nome do livro"
          {...register("name", { required: true })}
        />
        <select {...register("author_id")}>
          <option value="">Selecione um autor</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Número de páginas (opcional)"
          {...register("pages")}
        />
      </div>

      <hr className="form-divider" />

      <div className="form-section">
        <h3>Novo Autor</h3>
        {(!bookName || selectedAuthorId) && (
          <p className="info-message">
            {!bookName
              ? "Adicione o nome do livro para habilitar a criação de um novo autor."
              : "Selecione 'Selecione um autor' para habilitar a criação de um novo autor."}
          </p>
        )}
        <input
          type="text"
          placeholder="Nome do novo autor"
          value={newAuthorName}
          onChange={(e) => setNewAuthorName(e.target.value)}
          disabled={!bookName || !!selectedAuthorId} 
        />
        <input
          type="email"
          placeholder="Email do novo autor (opcional)"
          value={newAuthorEmail}
          onChange={(e) => setNewAuthorEmail(e.target.value)}
          disabled={!bookName || !!selectedAuthorId} 
        />
      </div>

      <button
        type="submit"
        disabled={!bookName || !(selectedAuthorId || newAuthorName)}
      >
        Adicionar Livro
      </button>
    </form>
  );
};

export default BookForm;
