import { GridItem } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
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
      <Toaster />
      <ChatBot />

      <GridItem area="footer">
        <Footer />
      </GridItem>
    </>
  );
};

export default Layout;
