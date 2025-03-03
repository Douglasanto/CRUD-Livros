import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Card = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100px;
  width: 250px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: 400ms;
  text-decoration: none;

  &.red {
    background-color: #f43f5e;
  }

  &.blue {
    background-color: #3b82f6;
  }

  &.green {
    background-color: #22c55e;
  }

  &:hover {
    transform: scale(1.1, 1.1);
  }

  ${CardsContainer}:hover > &:not(:hover) {
    filter: blur(10px);
    transform: scale(0.9, 0.9);
  }
`;

const Tip = styled.p`
  font-size: 1em;
  font-weight: 700;
  margin: 0;
`;

const SecondText = styled.p`
  font-size: 0.7em;
  margin: 0;
`;

function Home() {
  return (
    <Container>
      <Title>Olá, seja bem-vindo à livraria!</Title>
      <CardsContainer>
        <Card to="/authors" className="red">
          <Tip>Lista de Autores</Tip>
          <SecondText>Veja a lista de autores.</SecondText>
        </Card>
        <Card to="/books" className="blue">
          <Tip>Lista de Livros</Tip>
          <SecondText>Veja a lista de livros.</SecondText>
        </Card>
      </CardsContainer>
    </Container>
  );
}

export default Home;
