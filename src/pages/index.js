import React from "react";
import Seo from "../components/SEO";
import Layout from "../components/Layout";
import { Container } from "@mui/material";
import Login from "../components/Login";

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Log In" />
      <Container sx={{ p: "3rem", margin: "auto" }}>
        <Login />
      </Container>
    </Layout>
  );
};

export default IndexPage;
