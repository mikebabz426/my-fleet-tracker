import React from "react";
import { styled } from "@mui/material/styles";
import { TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0257A2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    padding: ".2rem .5rem",
  },
}));

const TableHeader = () => {
  const headerNames = [
    "Day",
    "Cell Phone",
    "Driver",
    "Truck",
    "Trailer",
    "H/T",
    "Type",
    "City",
    "State",
    "Time",
    "Appt",
    "Status",
    "Needs",
    "Notes",
  ];
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell />
        <StyledTableCell>Edit</StyledTableCell>

        {headerNames.map((header) => (
          <StyledTableCell key={header}>{header}</StyledTableCell>
        ))}
        <StyledTableCell>Copy</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
