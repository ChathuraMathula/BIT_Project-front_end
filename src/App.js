import React, { useEffect, useState } from "react";

import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Dates from "./pages/Dates";
import SignUp from "./pages/SignUp";

import Layout from "./Layout";
import Login from "./pages/Login";
import { UserLoginContext } from "./context/Context";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import useLocalStorage from "./hooks/useLocalStorage";
import AdminPhotographerProfile from "./components/user/admin/AdminPhotographerProfile";
import Packages from "./pages/Packages";
import socket from "./utils/socket";
import Portfolio from "./pages/Portfolio";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [login, setLogin] = useLocalStorage("login", {
    isLogged: false,
    user: null,
  });

  const userLoginHandler = (loginResponseData) => {
    setLogin((prevState) => ({
      ...prevState,
      ...loginResponseData,
      isLogged: true,
    }));
  };

  useEffect(() => {
    socket;
  }, []);

  return (
    <>
      <UserLoginContext.Provider value={login}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/login"
                element={<Login user={userLoginHandler} />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/photographer"
                element={<AdminPhotographerProfile />}
              />
              <Route path="/packages" element={<Packages />} />
              <Route path="/dates" element={<Dates />} />
              <Route path="/portfolio" element={<Portfolio />} />

              <Route path="/reset/password/:username/:token" element={<ResetPassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserLoginContext.Provider>
    </>
  );
}

export default App;
