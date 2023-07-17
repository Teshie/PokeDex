import { useState, useMemo } from "react";
interface PokemonData {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
}

export const useSortPokemon = (pokemonList: PokemonData[]) => {
  const [orderBy, setOrderBy] = useState<keyof PokemonData>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (property: keyof PokemonData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedPokemonList = useMemo(() => {
    const comparator = (a: PokemonData, b: PokemonData): number => {
      if (order === "asc") {
        if (orderBy === "id") {
          return a.id - b.id;
        } else {
          const propA = a[orderBy];
          const propB = b[orderBy];
          if (propA < propB) {
            return -1;
          } else if (propA > propB) {
            return 1;
          } else {
            return 0;
          }
        }
      } else {
        if (orderBy === "id") {
          return b.id - a.id;
        } else {
          const propA = a[orderBy];
          const propB = b[orderBy];
          if (propA < propB) {
            return 1;
          } else if (propA > propB) {
            return -1;
          } else {
            return 0;
          }
        }
      }
    };

    return [...pokemonList].sort(comparator);
  }, [pokemonList, orderBy, order]);

  return { orderBy, order, handleSort, sortedPokemonList };
};
