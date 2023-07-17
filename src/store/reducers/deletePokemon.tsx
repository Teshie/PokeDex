import { DELETE_POKEMON, PokemonActionTypes } from "../actions/action";
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

const deleteReducer = (
  state = initialState,
  action: PokemonActionTypes
): PokemonState => {
  switch (action.type) {
    case DELETE_POKEMON:
      console.log("DELETE_POKEMON action dispatched:", action);

      const updatedList = state.pokemonList.filter(
        (pokemon) => pokemon.id !== action.payload
      );
      console.log("Updated Pokemon List:", updatedList);

      return {
        ...state,
        pokemonList: updatedList,
      };
    default:
      return state;
  }
};

export default deleteReducer;
