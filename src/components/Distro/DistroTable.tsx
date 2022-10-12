import * as React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  Container,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DistroHeader from "./DistroHeader";
import DistroRow from "./DistroRow";
import { sortByDay } from "../../services/sortHelpers";

interface Props {
  day: string;
  team: string;
  data: any;
  loading: any;
  error: any;
}

const DistroTable: React.FC<Props> = ({ day, team, data, error, loading }) => {
  const { fleet_table: trucks } = data;

  const filteredTrucks = trucks
    .filter((truck) => {
      if (team === "All") return true;
      if (team === truck.team) return true;
      return false;
    })
    .filter((truck) => {
      if (day === "All") return true;
      if (day === truck.day) return true;
      return false;
    })
    .filter((truck) => {
      if (truck.available === true) return true;
      return false;
    })
    .sort(sortByDay)
    .map((truck) => {
      return <DistroRow key={truck.id} {...truck} />;
    });

  return (
    <TableContainer component={Paper} sx={{ minWidth: 500, maxWidth: 750 }}>
      <Table
        aria-label="customized table"
        size="small"
        sx={{ minWidth: 500, maxWidth: 750 }}
      >
        <DistroHeader />
        <TableBody>
          {loading ? (
            <Container>
              <CircularProgress color="secondary" />
            </Container>
          ) : null}

          {error ? <p>Error :(</p> : null}

          {filteredTrucks}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DistroTable;
