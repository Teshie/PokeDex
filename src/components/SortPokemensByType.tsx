import React, { useState } from "react";
import { TableSortLabel } from "@mui/material";

interface SortableColumnProps {
  label: string;
  active: boolean;
  direction: "asc" | "desc";
  onSort: () => void;
}

const SortableColumn: React.FC<SortableColumnProps> = ({
  label,
  active,
  direction,
  onSort,
}) => {
  const handleSort = () => {
    onSort();
  };

  return (
    <TableSortLabel active={active} direction={direction} onClick={handleSort}>
      {label}
    </TableSortLabel>
  );
};

export default SortableColumn;
