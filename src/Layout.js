import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { UserLoginContext } from "./context/Context";
import "./Layout.css";

const Layout = () => {

  // useState hooks to manage user login
  const [user, setUser] = useState({
    loggedIn: false,
    username: null,
    role: null,
  });

  return (
    <>
      <UserLoginContext.Provider value={[user, setUser]}>
        <Header />
        <div className="main-container">
          <Outlet context={[user, setUser]}/>
        </div>
        <Footer />
      </UserLoginContext.Provider>
    </>
  );
};

export default Layout;
