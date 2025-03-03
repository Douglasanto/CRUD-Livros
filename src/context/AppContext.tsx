import React, { createContext } from "react";
import { Author, Book } from "../types";

interface AppContextType {
  authors: Author[];
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
  addAuthor: (author: Author) => void;
  removeAuthor: (id: string) => void;
  updateAuthor: (id: string, updatedAuthor: Author) => void;

  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  updateBook: (id: string, updatedBook: Book) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
