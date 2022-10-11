import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import LoginButton from "./Buttons/LoginButton";

const Login = () => {
  const data = useStaticQuery(graphql`
    {
      volvo: file(relativePath: { eq: "volvo.jpg" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  const volvo = data.volvo.childImageSharp.fluid;

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
      <Box>
        <Img
          fluid={volvo}
          style={{
            height: "100vh",
            width: "50vw",
            borderRadius: "50% 0 0 50%",
          }}
        />
      </Box>
    </Container>
  );
};

export default Login;
