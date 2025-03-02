import { Link } from "react-router-dom";
import AuthorForm from "../components/Author/AuthorForm";
import "../index.css";

function AddAuthor() {
  return (
    <div className="form-container">
      <h1>Adicionar Autor</h1>
      <AuthorForm />
      <Link to="/" className="back-link">
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default AddAuthor;
