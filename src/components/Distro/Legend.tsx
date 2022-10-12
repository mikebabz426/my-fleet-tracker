import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import Haz from "../../assets/hazmat-icon.svg";
import Tnkr from "../../assets/tanker-icon.svg";

const Legend: React.FC = () => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography></Typography>
      <Box sx={{ display: "flex", margin: "1rem 1rem" }}>
        <Haz style={{ margin: "0 .5rem" }} />

        <Typography variant="body2">Hazmat</Typography>
      </Box>
      <Box sx={{ display: "flex", margin: "1rem 1rem" }}>
        <Tnkr style={{ margin: "0 .5rem" }} />

        <Typography variant="body2">Tanker Endorsed</Typography>
      </Box>
    </Container>
  );
};

export default Legend;
