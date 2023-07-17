import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { updatePokemon } from "../store/actions/action";

interface Pokemon {
  name: string;
  id: number;
}

interface EditPokemonProps {
  pokemon: Pokemon;
}

const EditPokemon: React.FC<EditPokemonProps> = ({ pokemon }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(pokemon.name);
  const [id, setId] = useState(pokemon.id);
  console.log(pokemon, "pokemon");
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSaveChanges = (pokemonId: number, newName: string) => {
    dispatch(updatePokemon(pokemonId, newName));
    handleClose();
  };
  return (
    <div>
      <Button onClick={handleClickOpen}>
        <EditIcon className="text-blue-400" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Pokémon</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details of the Pokémon.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSaveChanges(id, name)}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPokemon;
