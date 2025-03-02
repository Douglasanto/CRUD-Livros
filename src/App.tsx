import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import AddAuthor from "./pages/AddAuthor";
import AddBook from "./pages/AddBook";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/books" element={<Books />} />
      <Route path="/add-author" element={<AddAuthor />} />
      <Route path="/add-book" element={<AddBook />} />
    </Routes>
  );
}

export default App;
