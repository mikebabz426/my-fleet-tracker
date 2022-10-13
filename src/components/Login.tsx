import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { StaticImage } from "gatsby-plugin-image";
import LoginButton from "./Buttons/LoginButton";

const Login = () => {
  return (
    <Container
      sx={{
        display: "flex",
        height: "89vh",
        width: "100vw",
        m: 0,
        alignItems: "center",
        justifyContent: "space-center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            width: 400,
            m: "2rem 5rem",
            fontWeight: 300,
            textAlign: "center",
          }}
        >
          Authorization has been disabled for demo purposes.
        </Typography>
        <LoginButton />
      </Box>
      <Box sx={{ borderRadius: "50% 0 0 50%" }}>
        <StaticImage
          style={{ borderRadius: "50% 0 0 50%" }}
          src="../images/volvo.jpg"
          alt="a volvo semi truck"
          placeholder="blurred"
          layout="fixed"
          height={1080}
          width={960}
        />
      </Box>
    </Container>
  );
};

export default Login;
