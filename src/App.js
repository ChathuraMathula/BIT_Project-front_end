import React, { useState } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import Welcome from "./pages/Welcome";
import Dates from "./pages/Dates";
import SignUp from "./pages/SignUp";

import Layout from "./Layout";
import Login from "./pages/Login";
import { UserLoginContext } from "./context/Context";
import Dashboard from "./components/user/Dashboard";
import Profile from "./components/user/Profile";
import useLocalStorage from "./hooks/useLocalStorage";
import AdminPhotographerProfile from "./components/user/admin/AdminPhotographerProfile";

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

  console.log("inside App.js: ", login);

  return (
    <>
      <UserLoginContext.Provider value={login}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/dates" element={<Dates />} />
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
            </Route>
          </Routes>
        </BrowserRouter>
      </UserLoginContext.Provider>
    </>
  );
}

export default App;
