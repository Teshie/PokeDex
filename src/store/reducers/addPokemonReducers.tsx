import {
  ADD_POKEMON,
  DELETE_POKEMON,
  PokemonActionTypes,
  UPDATE_POKEMON,
} from "../actions/action";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

interface PokemonState {
  pokemonList: Pokemon[];
}

const initialState: PokemonState = {
  pokemonList: [],
};

const pokemAddonReducer = (
  state = initialState,
  action: PokemonActionTypes
): PokemonState => {
  switch (action.type) {
    case ADD_POKEMON:
      return {
        ...state,
        pokemonList: [...state.pokemonList, action.payload],
      };
    case DELETE_POKEMON:
      const updatedPokemonList = state.pokemonList.filter(
        (pokemon) => pokemon.id !== action.payload
      );
      return {
        ...state,
        pokemonList: updatedPokemonList,
      };
    case UPDATE_POKEMON:
      const updatedList = state.pokemonList.map((pokemon) => {
        if (pokemon.id === action.payload.id) {
          return {
            ...pokemon,
            name: action.payload.newName,
          };
        }
        return pokemon;
      });
      return {
        ...state,
        pokemonList: updatedList,
      };
    default:
      return state;
  }
};

export default pokemAddonReducer;
