export const ADD_POKEMON = "ADD_POKEMON";
export const UPDATE_POKEMON = 'UPDATE_POKEMON';
export const DELETE_POKEMON = 'DELETE_POKEMON';
export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  isStarred: boolean; // Add the 'isStarred' property
}

interface AddPokemonAction {
  type: typeof ADD_POKEMON;
  payload: Pokemon;
}
interface DeletePokemonAction {
  type: typeof DELETE_POKEMON;
  payload: number; // ID of the Pokémon to be deleted
}

interface UpdatePokemonAction {
  type: typeof UPDATE_POKEMON;
  payload: {
    id: number; // ID of the Pokemon to update
    newName: string; // New name for the Pokemon
  };
}
export type PokemonActionTypes = AddPokemonAction | DeletePokemonAction | UpdatePokemonAction;


export const addPokemon = (pokemon: Pokemon): PokemonActionTypes => ({
  type: ADD_POKEMON,
  payload: pokemon,
});


export const deletePokemon = (pokemonId: number): PokemonActionTypes => {
  // Validate the ID
  return {
    type: DELETE_POKEMON,
    payload: pokemonId,
  };
};


export const updatePokemon = (id: number, newName: string): PokemonActionTypes => ({
  type: UPDATE_POKEMON,
  payload: {
    id,
    newName,
  },
});