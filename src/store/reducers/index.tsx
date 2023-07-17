import { combineReducers } from "redux";
import pokemAddonReducer from "./addPokemonReducers";
import deleteReducer from "./deletePokemon";
const rootReducer = combineReducers({
  pokemons: pokemAddonReducer,
  // update: updateReducer,
});

export default rootReducer;
