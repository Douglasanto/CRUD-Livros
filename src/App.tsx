import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/books" element={<Books />} />
    </Routes>
  );
}

export default App;
