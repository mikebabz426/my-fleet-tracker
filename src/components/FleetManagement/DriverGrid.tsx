import * as React from "react";

import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import DriverRow from "./DriverRow";
import { styled } from "@mui/material/styles";
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

const DriverGrid = ({ loading, error, data, search }) => {
  if (loading)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  if (error) return <p>Error :(</p>;

  const { fleet_table: drivers } = data;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Truck #</StyledTableCell>
            <StyledTableCell>Trailer #</StyledTableCell>
            <StyledTableCell>Trailer Type</StyledTableCell>
            <StyledTableCell>Team</StyledTableCell>
            <StyledTableCell>Hazmat</StyledTableCell>
            <StyledTableCell>Tanker</StyledTableCell>
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers
            .filter((driver) => {
              if (search === "") return true;
              if (search !== "" && parseInt(search) === driver.truck) {
                return true;
              }
              return false;
            })
            .map((row) => (
              <DriverRow key={row.id} {...row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DriverGrid;
