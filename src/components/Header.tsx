import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Pokemons
        </Link>
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/" className="hover:text-gray-300" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className="hover:text-gray-300">
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
