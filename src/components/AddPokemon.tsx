import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

interface Pokemon {
  name: string;
  url: string;
}

const AddPokemons: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setUrl("");
  };

  const handleAddPokemon = () => {
    const newPokemon: Pokemon = {
      name: name,
      url: url,
    };
    // Perform the logic for adding the new Pokémon here
    console.log("New Pokémon:", newPokemon);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <AddIcon className="text-blue-400" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Pokémon</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details of the new Pokémon.
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
          <TextField
            margin="dense"
            id="url"
            label="URL"
            type="text"
            fullWidth
            variant="standard"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPokemon}>Add Pokémon</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPokemons;
