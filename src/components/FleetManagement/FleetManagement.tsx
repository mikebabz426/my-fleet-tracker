import * as React from "react";
import { Container, InputBase, Typography, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DriverGrid from "./DriverGrid";
import AddTruckForm from "../NewTruckForm/AddTruckForm";
import { useNewTruckContext } from "../../NewTruckContext";
import { styled, alpha } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#66bb6a",
    color: "#fff",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#333", 0.1),
  "&:hover": {
    backgroundColor: alpha("#333", 0.15),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
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
              <Typography
                variant="h6"
                align="center"
                sx={{ fontVariant: "small-caps" }}
              >
                search by truck number:
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  value={search}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
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
