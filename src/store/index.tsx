import { createStore } from "redux";
import rootReducer from "./reducers";
import LocalStorage from "../utils/localstorage";

const localStorageKey = "pokemonData"; // Key for local storage
const localStorage = new LocalStorage(localStorageKey);

// Load the state from local storage
const persistedState = localStorage.loadState();

// Create the Redux store with the persisted state
const store = createStore(rootReducer, persistedState);

// Subscribe to changes in the store
store.subscribe(() => {
  const state = store.getState();
  localStorage.saveState(state);
});

export default store;
