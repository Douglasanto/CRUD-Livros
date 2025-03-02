import React, { createContext, useState } from "react";
import { Author, Book } from "../types";

interface AppContextType {
  authors: Author[];
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
  addAuthor: (author: Author) => void;
  removeAuthor: (id: string) => void;

  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

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

  const addBook = (book: Book) => {
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  const removeBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        authors,
        setAuthors,
        addAuthor,
        removeAuthor,
        books,
        setBooks,
        addBook,
        removeBook,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
