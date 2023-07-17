import React from "react";
import logo from "./logo.svg";
import "./App.css";
import EnhancedTable from "./pages/PokemonLists";
import PokemonList from "./pages/PokemonList";
import Pokemons from "./components/Pokemons";
import Favorites from "./pages/Favorites";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
