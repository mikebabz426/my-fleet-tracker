import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/SEO";
import { Container } from "@mui/material";
import App from "../components/App";

const AppPage = () => {
  return (
    <>
      <Layout margin headerInfo>
        <Container sx={{ minWidth: "100%" }}>
          <Seo title="Home" />
          <App />
        </Container>
      </Layout>
    </>
  );
};

export default AppPage;
