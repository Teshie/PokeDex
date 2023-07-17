import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=100";

interface PokemonData {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
}

export const useFetchPokemonData = (): PokemonData[] => {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(BASE_URL);
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

  return pokemonData;
};

export default useFetchPokemonData;

interface Pokemon {
  name: string;
  url: string;
}

interface FetchAllPokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

interface FetchAllPokemonsResult {
  pokemonList: Pokemon[];
  isLoading: boolean;
  error: Error | null;
}

export const useFetchAllPokemons = (): FetchAllPokemonsResult => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const response = await axios.get<FetchAllPokemonsResponse>(
          `${BASE_URL}/pokemon?limit=1000`
        );
        setPokemonList(response.data.results);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchAllPokemons();
  }, []);

  return { pokemonList, isLoading, error };
};

export const fetchPokemonList = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
};

export const fetchPokemonDetails = async (
  pokemonName: string
): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${pokemonName}:`, error);
    return null;
  }
};

// Add a new Pokemon
export async function addPokemon(name: string, url: string): Promise<any> {
  const response = await axios.post(`${BASE_URL}/pokemon`, {
    name,
    url,
  });
  return response.data;
}

export const usePokemonList = () => {
  const { pokemonList } = useSelector((state: any) => state.pokemons);
  return pokemonList;
};
