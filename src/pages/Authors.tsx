import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import AuthorList from "../components/Author/AuthorList";
import AuthorDetailsModal from "../components/Author/AuthorDetailsModal";
import "../index.css";

const Authors: React.FC = () => {
  const { authors, removeAuthor } = useContext(AppContext)!;
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);

  const handleAuthorClick = (authorId: string) => {
    setSelectedAuthorId(authorId);
  };

  const handleCloseModal = () => {
    setSelectedAuthorId(null);
  };

  return (
    <div className="authors-container">
      <h1>Lista de Autores</h1>
      <AuthorList
        authors={authors}
        onAuthorClick={handleAuthorClick}
        onDeleteAuthor={removeAuthor}
      />
      {selectedAuthorId && (
        <AuthorDetailsModal
          authorId={selectedAuthorId}
          onClose={handleCloseModal}
        />
      )}
      <Link to="/" className="back-link">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default Authors;
