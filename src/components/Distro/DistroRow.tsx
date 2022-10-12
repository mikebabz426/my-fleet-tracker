import * as React from "react";
import { Typography, TableRow } from "@mui/material";
import Haz from "../../assets/hazmat-icon.svg";
import Tnkr from "../../assets/tanker-icon.svg";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0257A2",
    color: theme.palette.common.white,
    margin: 0,
    textAlign: "left",
    padding: ".3rem .3rem 0rem .3rem",
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: "left",
    margin: 0,
    fontSize: 14,
    minWidth: 20,
    padding: ".3rem .3rem 0rem .3rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#EBF5FF",
  },
}));

interface Props {
  id: string;
  day: string;
  type: string;
  location: string;
  usState: string;
  needs: string;
  hazmat: boolean;
  tanker: boolean;
}

const DistroRow: React.FC<Props> = (props) => {
  const { id, day, type, location, usState, needs, hazmat, tanker } = props;

  return (
    <StyledTableRow key={id}>
      <StyledTableCell />
      <StyledTableCell />
      <StyledTableCell>
        <Typography sx={{ fontWeight: 500 }}>{day}</Typography>
      </StyledTableCell>

      <StyledTableCell>
        {hazmat ? (
          <Haz style={{ maxWidth: 18, maxHeight: 18, margin: "0px 3px" }} />
        ) : null}
        {tanker ? (
          <Tnkr style={{ maxWidth: 18, maxHeight: 18, margin: "0px 3px" }} />
        ) : null}
      </StyledTableCell>

      <StyledTableCell>
        {type === "53' Van" ? (
          <Typography sx={{ fontWeight: 500, color: "#43a047" }}>
            {type}
          </Typography>
        ) : (
          <Typography sx={{ fontWeight: 500, color: "#f44336" }}>
            {type}
          </Typography>
        )}
      </StyledTableCell>

      <StyledTableCell>
        <Typography sx={{ fontWeight: 500 }}>{location}</Typography>
      </StyledTableCell>

      <StyledTableCell>
        <Typography sx={{ fontWeight: 500 }}>{usState}</Typography>
      </StyledTableCell>

      <StyledTableCell>
        <Typography sx={{ fontWeight: 500 }}>{needs}</Typography>
      </StyledTableCell>
      <StyledTableCell />
    </StyledTableRow>
  );
};

export default DistroRow;
