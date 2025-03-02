import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1>Olá, seja bem-vindo à livraria!</h1>
      <div className="cards">
        <Link to="/authors" className="card red">
          <p className="tip">Lista de Autores</p>
          <p className="second-text">Veja a lista de autores cadastrados.</p>
        </Link>
        <Link to="/books" className="card blue">
          <p className="tip">Lista de Livros</p>
          <p className="second-text">Veja a lista de livros cadastrados.</p>
        </Link>
        <Link to="/add-author" className="card green">
          <p className="tip">Adicionar Autor</p>
          <p className="second-text">Adicione um novo autor.</p>
        </Link>
        <Link to="/add-book" className="card red">
          <p className="tip">Adicionar Livro</p>
          <p className="second-text">Adicione um novo livro.</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
