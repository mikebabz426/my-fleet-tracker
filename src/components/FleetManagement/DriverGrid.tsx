import * as React from "react";

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import DriverRow from "./DriverRow";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  head: {
    backgroundColor: "#0257a2",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#EBF5FF",
    },
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
          <StyledTableRow>
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
          </StyledTableRow>
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
