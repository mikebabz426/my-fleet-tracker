import React from "react";
import { styled } from "@mui/material/styles";
import { TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0257A2",
    color: theme.palette.common.white,
    padding: ".3rem .3rem 0rem .3rem",
    textAlign: "left",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    padding: ".3rem .3rem 0rem .3rem",
    textAlign: "left",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  padding: ".2rem 0rem",
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  padding: ".2rem 0rem",
}));

const TableHeader = () => {
  const headerNames = ["Day", "", "Type", "Location", "State", "Needs"];
  return (
    <StyledTableHead>
      <StyledTableRow>
        <StyledTableCell />
        <StyledTableCell />

        {headerNames.map((header) => (
          <StyledTableCell key={header}>{header}</StyledTableCell>
        ))}
        <StyledTableCell />
      </StyledTableRow>
    </StyledTableHead>
  );
};

//Custom Styles

export default TableHeader;
