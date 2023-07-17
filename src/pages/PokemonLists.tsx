import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import EditPokemon from "../components/EditPokemons";
import AddPokemons from "../components/AddPokemon";
import useFetchPokemonData, { useFetchAllPokemons } from "../api/api";
import { useSortPokemon } from "../utils/useSortPokemon";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon, deletePokemon } from "../store/actions/action";
import SearchInput from "../components/SearchInput";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DropdownSelectMenu from "../components/DropDownFilter";
interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface EnhancedTableProps {
  pokemonList: PokemonData[];
}

const EnhancedTable: React.FC<EnhancedTableProps> = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterType, setFilterType] = useState("");
  const [starredPokemons, setStarredPokemons] = useState<number[]>([]);

  const pokemonList = useFetchPokemonData();
  const dispatch = useDispatch();

  console.log(pokemonList, "pokemonList");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const isPokemonStarred = (pokemonId: number) => {
    return starredPokemons.includes(pokemonId);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleButtonClick = (newPokemon: any) => {
    const { id } = newPokemon;
    if (isPokemonStarred(id)) {
      setStarredPokemons(
        starredPokemons.filter((pokemonId) => pokemonId !== id)
      );
    } else {
      setStarredPokemons([...starredPokemons, id]);
    }
    dispatch(addPokemon(newPokemon));
  };

  const handleDelete = (pokemonId: number) => {
    dispatch(deletePokemon(pokemonId));
  };
  const pokemons = useSelector((state: any) => state.pokemons);
  console.log(pokemons, "useSelector");
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, pokemonList.length - page * rowsPerPage);

  const { orderBy, order, handleSort, sortedPokemonList } = useSortPokemon(
    pokemonList || []
  );
  const [searchValue, setSearchValue] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonData[]>([]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const regex = new RegExp(searchValue, "i");
    const filteredList = sortedPokemonList?.filter((row: PokemonData) =>
      row?.name?.match(regex)
    );
    setFilteredPokemons(filteredList);
  }, [searchValue, sortedPokemonList, filterType]);
  console.log(filterType, "filterTypesdsdf");
  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Box className="flex justify-between items-center  mb-10 p-2 border-b">
          <DropdownSelectMenu
            data={filteredPokemons}
            setFilterType={setFilterType}
            filterType={filterType}
          />
          <SearchInput
            searchValue={searchValue}
            setSearchValue={handleSearchChange}
          />
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="Pokémon Table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={order}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Manage Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPokemons
              ?.filter((row: any) =>
                row?.types[0].type.name?.match(new RegExp(filterType, "i"))
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pokemon: PokemonData) => (
                <TableRow key={pokemon.name}>
                  <TableCell>{pokemon.name}</TableCell>
                  <TableCell>
                    <img
                      width={40}
                      height={40}
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                    />
                  </TableCell>
                  <TableCell>{pokemon.id}</TableCell>
                  <TableCell className="flex flex-col">
                    {isPokemonStarred(pokemon.id) ? (
                      <StarIcon
                        style={{ color: "yellow" }}
                        onClick={() => handleDelete(pokemon.id)}
                      />
                    ) : (
                      <StarBorderIcon
                        onClick={() => handleButtonClick(pokemon)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={2} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pokemonList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default EnhancedTable;
