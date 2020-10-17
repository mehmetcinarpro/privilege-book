import React from "react";

import Container from "@material-ui/core/Container";

import Header from "../Header/Header";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <>{children}</>
      </Container>
    </>
  );
};

export default Layout;
