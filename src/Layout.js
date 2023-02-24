import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./Layout.css";

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
