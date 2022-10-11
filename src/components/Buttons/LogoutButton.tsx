import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      sx={{
        margin: "1rem",
        color: "#333",
        backgroundColor: "#fff",
        "&:hover": {
          backgroundColor: "#e57373",
        },
      }}
      variant="contained"
      size="small"
      onClick={() => logout({ returnTo: `${process.env.AUTH0_LOGOUT}` })}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
