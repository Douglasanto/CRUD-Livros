import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BookList from "../components/Book/BookList";
import BookDetailsModal from "../components/Book/BookDetailsModal";
import "../index.css";

const Books: React.FC = () => {
  const { books, removeBook } = useContext(AppContext)!;
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleBookClick = (bookId: string) => {
    setSelectedBookId(bookId);
  };

  const handleCloseModal = () => {
    setSelectedBookId(null);
  };

  return (
    <div className="books-container">
      <h1>Lista de Livros</h1>
      <BookList
        books={books}
        onBookClick={handleBookClick}
        onDeleteBook={removeBook}
      />
      {selectedBookId && (
        <BookDetailsModal bookId={selectedBookId} onClose={handleCloseModal} />
      )}
      <Link to="/" className="back-link">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default Books;
