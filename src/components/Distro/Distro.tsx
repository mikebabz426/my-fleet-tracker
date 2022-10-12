import * as React from "react";
import { useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Legend from "./Legend";
import DistroTable from "./DistroTable";
import { weekDays } from "../../services/services";

const initialState = {
  team: "All",
  day: "All",
};

const Distro = (props) => {
  const [visibility, setVisibility] = useState(false);
  const [filter, setFilter] = useState(initialState);

  const { data, loading, error } = props;

  const teams = ["All", "Mike", "Alex", "Bobby"];

  const handleChange = (e, type) => {
    type === "day"
      ? setFilter({ ...filter, day: e.target.value })
      : setFilter({ ...filter, team: e.target.value });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormControl
          variant="outlined"
          sx={(theme) => ({ margin: theme.spacing(2), minWidth: 120 })}
        >
          <InputLabel id="demo-simple-select-outlined-label">Day</InputLabel>
          <Select
            labelId="select-outlined-label"
            id="select-outlined"
            onChange={(e) => handleChange(e, "day")}
            label="Day"
            value={filter.day}
          >
            <MenuItem value="All">All</MenuItem>
            {weekDays.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          sx={(theme) => ({ margin: theme.spacing(2), minWidth: 120 })}
        >
          <InputLabel id="demo-simple-select-outlined-label">Team</InputLabel>
          <Select
            labelId="select-outlined-label"
            id="select-outlined"
            onChange={(e) => handleChange(e, "team")}
            label="Team"
            value={filter.team}
          >
            {teams.map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {visibility ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setVisibility(!visibility)}
          >
            <ClearIcon />
            Clear
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setVisibility(!visibility)}
          >
            Generate
          </Button>
        )}
      </Container>
      {visibility ? (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Legend />
          <DistroTable
            {...filter}
            data={data}
            loading={loading}
            error={error}
          />
        </Container>
      ) : (
        <Typography variant="body2">
          Please make the required selections, when done click generate to view
          the distribution list.
        </Typography>
      )}
    </Container>
  );
};

export default Distro;
