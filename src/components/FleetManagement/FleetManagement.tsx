import * as React from "react";
import { Container, InputBase, Typography, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DriverGrid from "./DriverGrid";
import AddTruckForm from "../NewTruckForm/AddTruckForm";
import { useNewTruckContext } from "../../NewTruckContext";
import { styled } from "@mui/material/styles";

const SearchBox = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const CustomButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#66bb6a",
    color: "#fff",
  },
}));

const FleetManagement = (props) => {
  const [search, setSearch] = React.useState("");
  const { newTruck, setNewTruck } = useNewTruckContext();
  const { loading, error, data } = props;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      {newTruck ? null : (
        <Typography
          variant="h4"
          align="center"
          sx={{ fontVariant: "small-caps" }}
        >
          Fleet Management
        </Typography>
      )}

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1rem auto",
            width: 1080,
          }}
        >
          <Box
            style={{
              display: "flex",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                visibility: newTruck ? "hidden" : "visible",
              }}
            >
              <Typography variant="body1" align="center">
                Search by truck number
              </Typography>
              <SearchBox>
                <SearchIconBox>
                  <SearchIcon />
                </SearchIconBox>
                <InputBase
                  placeholder="Search…"
                  value={search}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "search" }}
                />
              </SearchBox>
            </Box>
          </Box>
          <CustomButton
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={newTruck ? <ArrowBackIcon /> : <AddIcon />}
            onClick={() => setNewTruck(!newTruck)}
          >
            {newTruck ? "Back" : "Add Truck"}
          </CustomButton>
        </div>
        {newTruck ? (
          <AddTruckForm
            newTruck={newTruck}
            toggle={() => setNewTruck(!newTruck)}
          />
        ) : (
          <DriverGrid
            loading={loading}
            error={error}
            data={data}
            search={search}
          />
        )}
      </Container>
    </div>
  );
};

export default FleetManagement;
