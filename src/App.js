import { 
  BrowserRouter, 
  Routes, 
  Route } from "react-router-dom"

// Styling
import './App.css';

// Page Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Register from "./pages/Register";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Logout from "./pages/Logout";
import Actor from "./pages/Actor";


// React Router Setup
function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/search" element={<Search />} />
        <Route path="/actor" element={<Actor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
