import { PokemonActionTypes, UPDATE_POKEMON } from "../actions/action";

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

const updateReducer = (
  state = initialState,
  action: PokemonActionTypes
): PokemonState => {
  switch (action.type) {
    case UPDATE_POKEMON:
      return {
        ...state,
        pokemonList: state.pokemonList.map((pokemon) => {
          if (pokemon.id === action.payload.id) {
            return {
              ...pokemon,
            };
          }
          return pokemon;
        }),
      };
    default:
      return state;
  }
};

export default updateReducer;
