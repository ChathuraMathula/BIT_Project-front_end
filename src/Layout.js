import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { UserLoginContext } from "./context/Context";
import "./Layout.css";
import Welcome from "./pages/Welcome";

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
