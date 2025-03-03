import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import AuthorList from "../components/Author/AuthorList";
import { Modal } from "../components/Modal";
import styled from "styled-components";
import AuthorForm from "../components/Author/AuthorForm"; 

const Authors: React.FC = () => {
  const { authors, removeAuthor } = useContext(AppContext)!;
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);

  const handleAuthorClick = (authorId: string) => {
    setSelectedAuthorId(authorId);
  };

  const handleCloseModal = () => {
    setSelectedAuthorId(null);
  };

  const selectedAuthor = authors.find(
    (author) => author.id === selectedAuthorId
  );

  const Container = styled.div`
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  `;

  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  `;

  const Title = styled.h1`
    font-size: 2rem;
    color: #333;
    margin: 0; 
  `;

  const FormContainer = styled.div`
    width: 300px; 
  `;

  const BackLink = styled(Link)`
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    &:hover {
      background-color: #2563eb;
    }
  `;

  return (
    <Container>
      <Header>
        <Title>Lista de Autores</Title>
        <FormContainer>
          <AuthorForm />
        </FormContainer>
      </Header>

      <AuthorList
        authors={authors}
        onAuthorClick={handleAuthorClick}
        onDeleteAuthor={removeAuthor}
      />

      {selectedAuthor && (
        <Modal
          isOpen={!!selectedAuthor}
          onClose={handleCloseModal}
          title={selectedAuthor.name}
        >
          <div>
            <p>
              <strong>Email:</strong> {selectedAuthor.email || "Não informado"}
            </p>
          </div>
        </Modal>
      )}

      <BackLink to="/">Voltar para a página inicial</BackLink>
    </Container>
  );
};

export default Authors;
