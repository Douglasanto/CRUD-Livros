import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AuthorForm } from "../components/Author/AuthorForm";
import { Modal } from "../components/Modal";
import { Table } from "../components/Table";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #059669;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
  }
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

  @media (max-width: 768px) {
    width: 95%;
    text-align: center;
    display: inline;
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SaveButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background: #059669;
  }
`;

const ModalLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ModalParagraph = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  strong {
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const CloseButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #dc2626;
  }
`;

const Authors: React.FC = () => {
  const { authors, addAuthor, removeAuthor, updateAuthor } =
    useContext(AppContext)!;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<{
    id: string;
    name: string;
    email?: string;
  } | null>(null);
  const [editedAuthor, setEditedAuthor] = useState<{
    id: string;
    name: string;
    email?: string;
  } | null>(null);

  const handleAddAuthor = (data: { name: string; email?: string }) => {
    const newAuthor = { id: String(Date.now()), ...data };
    addAuthor(newAuthor);
    setIsAddModalOpen(false);
  };

  const handleAuthorClick = (author: {
    id: string;
    name: string;
    email?: string;
  }) => {
    setSelectedAuthor(author);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (author: {
    id: string;
    name: string;
    email?: string;
  }) => {
    setEditedAuthor({ ...author });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedAuthor(null);
    setEditedAuthor(null);
  };

  const handleSaveChanges = () => {
    if (editedAuthor) {
      updateAuthor(editedAuthor.id, editedAuthor);
      handleCloseModal();
    }
  };

  const columns: ("name" | "email")[] = [
    "name",
    "email",
  ];

  return (
    <Container>
      <Header>
        <Title>Lista de Autores</Title>
        <AddButton onClick={() => setIsAddModalOpen(true)}>
          Adicionar Autor
        </AddButton>
      </Header>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Adicionar Autor"
      >
        <AuthorForm onSubmit={handleAddAuthor} />
      </Modal>

      <Table
        data={authors}
        columns={columns}
        onRowClick={handleAuthorClick}
        onRemove={removeAuthor}
        onEdit={handleEditClick}
      />

      <Modal
        isOpen={isViewModalOpen}
        onClose={handleCloseModal}
        title={selectedAuthor?.name || "Detalhes do Autor"}
      >
        {selectedAuthor && (
          <ModalContent>
            <ModalParagraph>
              <strong>Nome:</strong> {selectedAuthor.name}
            </ModalParagraph>
            <ModalParagraph>
              <strong>Email:</strong> {selectedAuthor.email || "Não informado"}
            </ModalParagraph>
            <CloseButton onClick={handleCloseModal}>Fechar</CloseButton>
          </ModalContent>
        )}
      </Modal>
      
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        title={editedAuthor?.name || "Editar Autor"}
      >
        {editedAuthor && (
          <ModalContent>
            <ModalLabel>
              <strong>Nome:</strong>
              <InputField
                type="text"
                value={editedAuthor.name}
                onChange={(e) =>
                  setEditedAuthor({ ...editedAuthor, name: e.target.value })
                }
              />
            </ModalLabel>
            <ModalLabel>
              <strong>Email:</strong>
              <InputField
                type="email"
                value={editedAuthor.email || ""}
                onChange={(e) =>
                  setEditedAuthor({ ...editedAuthor, email: e.target.value })
                }
              />
            </ModalLabel>
            <SaveButton onClick={handleSaveChanges}>Salvar</SaveButton>
            <CloseButton onClick={handleCloseModal}>Cancelar</CloseButton>
          </ModalContent>
        )}
      </Modal>

      <BackLink to="/">Voltar para a página inicial</BackLink>
    </Container>
  );
};

export default Authors;
