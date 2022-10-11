import * as React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.dark,
  "&:hover": {
    color: theme.palette.error.dark,
  },
}));

const DeleteButton = ({ variant, size, click }) => {
  return (
    <StyledButton variant={variant} size={size} onClick={click}>
      Delete
    </StyledButton>
  );
};

//Custom Styles

export default DeleteButton;
