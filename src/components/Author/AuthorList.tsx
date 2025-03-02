import React from "react";

interface Author {
  id: string;
  name: string;
  email?: string;
}

interface AuthorListProps {
  authors: Author[];
  onAuthorClick: (authorId: string) => void;
  onDeleteAuthor: (authorId: string) => void;
}

const AuthorList: React.FC<AuthorListProps> = ({
  authors,
  onAuthorClick,
  onDeleteAuthor,
}) => {
  if (authors.length === 0) {
    return <p className="no-authors">Nenhum autor cadastrado.</p>;
  }

  return (
    <div className="authors-grid">
      {authors.map((author) => (
        <div
          key={author.id}
          className="author-card"
          onClick={() => onAuthorClick(author.id)}
        >
          <h3>{author.name}</h3>
          {author.email && <p>Email: {author.email}</p>}
          <button
            className="back-link"
            onClick={(e) => {
              e.stopPropagation();
              if (
                window.confirm("Tem certeza que deseja excluir este autor?")
              ) {
                onDeleteAuthor(author.id);
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

export default AuthorList;
