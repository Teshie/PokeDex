import React, { useState, ChangeEvent, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface DropdownSelectMenuProps {
  data: any; // Replace 'any' with the actual type of 'data'
  filterType: string;
  setFilterType: (value: string) => void;
}

const DropdownSelectMenu: React.FC<DropdownSelectMenuProps> = ({
  data,
  filterType,
  setFilterType,
}) => {
  const handleOptionChange = (event: any) => {
    setFilterType(event.target.value as string);
  };

  useEffect(() => {
    console.log(filterType, "selectedOption");
  }, [filterType]);

  return (
    <Select className="w-2/6" value={filterType} onChange={handleOptionChange}>
      {data.map((items: any) => {
        return (
          <MenuItem
            key={items.types[0].type.name}
            value={items.types[0].type.name}
          >
            {items.types[0].type.name}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default DropdownSelectMenu;
