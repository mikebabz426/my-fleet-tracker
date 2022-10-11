import * as React from "react";
import { Button } from "@mui/material";

const EditButton = ({ size, color, variant, click }) => {
  return (
    <Button size={size} color={color} variant={variant} onClick={click}>
      Edit
    </Button>
  );
};

export default EditButton;
