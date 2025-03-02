import { Link } from "react-router-dom";
import BookForm from "../components/Book/BookForm";
import "../index.css";

function AddBook() {
  return (
    <div className="form-container">
      <h1>Adicionar Livro</h1>
      <BookForm />
      <Link to="/" className="back-link">
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default AddBook;
