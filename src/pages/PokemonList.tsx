import React, { useEffect, useState } from "react";
import { fetchPokemonList } from "../api/api";
import EnhancedTable from "./PokemonLists";

type Props = {};

const PokemonList = (props: Props) => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const list = await fetchPokemonList();
      setPokemonList(list);
    };

    fetchPokemon();
  }, []);

  return (
    <div>
      <h2 className="text-green-500">Filter</h2>
      <EnhancedTable pokemonList={pokemonList} />
    </div>
  );
};

export default PokemonList;
