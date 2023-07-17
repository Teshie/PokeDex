import React, { useEffect, useState } from "react";
import axios from "axios";

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
}

const PokemonInfo: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const { results } = response.data;

        const fetchedData = await Promise.all(
          results.map(async (result: { url: string }) => {
            const pokemonResponse = await axios.get(result.url);
            return pokemonResponse.data;
          })
        );

        setPokemonData(fetchedData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  if (pokemonData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {pokemonData.map((pokemon) => (
        <div key={pokemon.name}>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ))}
    </div>
  );
};

export default PokemonInfo;
