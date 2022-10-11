import * as React from "react";
import { Button } from "@mui/material";

const UpdateButton = ({ color, variant, size, click }) => {
  return (
    <Button color={color} variant={variant} size={size} onClick={click}>
      Update
    </Button>
  );
};

export default UpdateButton;
