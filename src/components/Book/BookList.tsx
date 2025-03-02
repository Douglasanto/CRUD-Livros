import React from "react";

interface Book {
  id: string;
  name: string;
  author_id: string;
  pages?: number;
}

interface BookListProps {
  books: Book[];
  onBookClick: (bookId: string) => void;
  onDeleteBook: (bookId: string) => void;
}

const BookList: React.FC<BookListProps> = ({
  books,
  onBookClick,
  onDeleteBook,
}) => {
  if (books.length === 0) {
    return <p className="no-books">Nenhum livro cadastrado.</p>;
  }

  return (
    <div className="books-grid">
      {books.map((book) => (
        <div
          key={book.id}
          className="book-card"
          onClick={() => onBookClick(book.id)}
        >
          <h3>{book.name}</h3>
          <p>Autor ID: {book.author_id}</p>
          <button
            className="back-link"
            onClick={(e) => {
              e.stopPropagation();
              if (
                window.confirm("Tem certeza que deseja excluir este livro?")
              ) {
                onDeleteBook(book.id);
              }
            }}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
