import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

const Layout = () => {
  

  return (
    <>
        <Header />
        <div className="main-container">
          <Outlet />
        </div>
        <Footer />
    </>
  );


};

export default Layout;
