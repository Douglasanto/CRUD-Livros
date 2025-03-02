import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

interface BookDetailsModalProps {
  bookId: string;
  onClose: () => void;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  bookId,
  onClose,
}) => {
  const { books, authors } = useContext(AppContext)!;
  const book = books.find((b) => b.id === bookId);
  const author = authors.find((a) => a.id === book?.author_id);

  if (!book) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{book.name}</h2>
        <p>Autor: {author?.name}</p>
        {book.pages && <p>Páginas: {book.pages}</p>}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default BookDetailsModal;
