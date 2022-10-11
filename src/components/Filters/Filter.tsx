import React from "react";
import { FormControl, Select, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 80,
  },
}));
const CustomInput = styled(InputBase)(({ theme }) => ({
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    "&:focus": {
      borderRadius: 4,
      borderColor: theme.palette.secondary,
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 0.2rem rgba(102,187,106,.75)`,
    },
  },
}));

const Filter = ({ label, options, handler }) => {
  return (
    <CustomFormControl variant="outlined">
      <Select
        sx={{ fontWeight: "bold" }}
        native
        label={label}
        input={<CustomInput />}
        onChange={handler}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </CustomFormControl>
  );
};

export default Filter;
