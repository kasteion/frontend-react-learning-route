import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <hr style={{ marginTop: "50px" }} />
      <Footer />
    </>
  );
};

export default Layout;
