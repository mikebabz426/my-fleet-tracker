import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Buttons/LoginButton";
import Main from "./Main";

interface Props {
  children?: React.ReactNode;
}

const App: React.FC<Props> = ({}) => {
  const { isLoading, isAuthenticated, error } = useAuth0();

  isLoading ? (
    <Box>
      <Typography>Loading...</Typography>
    </Box>
  ) : null;

  error ? (
    <Box>
      <Typography>Error: {error.message}</Typography>
    </Box>
  ) : null;

  return (
    <>
      {isAuthenticated ? (
        <Main />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ mt: 100, mb: 20 }}>
            Please log in to access the application!
          </Typography>
          <LoginButton />
        </Box>
      )}
    </>
  );
};

export default App;
