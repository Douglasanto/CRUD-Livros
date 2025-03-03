import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 450px;

  @media (max-width: 768px) {
    padding: 1rem;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    width: 95%; 
    padding: 0.75rem;
  }
`;

const Title = styled(Dialog.Title)`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.1rem; 
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #4b5563;
  }

  @media (max-width: 768px) {
    width: 100%; 
  }
`;

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Title>Nome: {title}</Title>
          {children}
          <Dialog.Close asChild>
            <CloseButton>Fechar</CloseButton>
          </Dialog.Close>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
