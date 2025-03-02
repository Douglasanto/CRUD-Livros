import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

interface AuthorDetailsModalProps {
  authorId: string;
  onClose: () => void;
}

const AuthorDetailsModal: React.FC<AuthorDetailsModalProps> = ({
  authorId,
  onClose,
}) => {
  const { authors, books } = useContext(AppContext)!;
  const author = authors.find((a) => a.id === authorId);
  const authorBooks = books.filter((b) => b.author_id === authorId);

  if (!author) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{author.name}</h2>
        {author.email && <p>Email: {author.email}</p>}
        <h3>Livros:</h3>
        <ul>
          {authorBooks.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default AuthorDetailsModal;
