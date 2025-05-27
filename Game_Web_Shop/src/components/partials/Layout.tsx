import { GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ChatBot from "../ChatBot";

const Layout = () => {
  return (
    <>
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <GridItem area="main" minH='70vh'>
        <Outlet />
      </GridItem>
      <ChatBot />

      <GridItem area="footer">
        <Footer />
      </GridItem>
    </>
  );
};

export default Layout;
