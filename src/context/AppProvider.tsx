import React, { useState } from "react";
import { AppContext } from "./AppContext"; 
import { Author, Book } from "../types";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const addAuthor = (author: Author) => {
    setAuthors((prevAuthors) => [...prevAuthors, author]);
  };

  const removeAuthor = (id: string) => {
    setAuthors((prevAuthors) =>
      prevAuthors.filter((author) => author.id !== id)
    );
    setBooks((prevBooks) => prevBooks.filter((book) => book.author_id !== id));
  };

  const updateAuthor = (id: string, updatedAuthor: Author) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author) => (author.id === id ? updatedAuthor : author))
    );
  };

  const addBook = (book: Book) => {
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  const removeBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const updateBook = (id: string, updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? updatedBook : book))
    );
  };

  return (
    <AppContext.Provider
      value={{
        authors,
        setAuthors,
        addAuthor,
        removeAuthor,
        updateAuthor,
        books,
        setBooks,
        addBook,
        removeBook,
        updateBook,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
