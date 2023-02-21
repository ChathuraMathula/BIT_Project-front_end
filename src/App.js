import React, { useEffect, useState } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";

import Welcome from "./pages/Welcome";
import Dates from "./pages/Dates";
import SignUp from "./pages/SignUp";

import Layout from "./Layout";
import Login from "./pages/Login";
import { UserLoginContext } from "./context/Context";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Welcome />} />
      <Route path="/dates" element={<Dates />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

{
  /* <RouterProvider router={router} /> */
}

function App() {
  // useState hooks to manage user login
  const [login, setLogin] = useState({
    isLogged: false,
    user: null
  });

  const userHandler = (loginResponseData) => {
    setLogin((prevState) => ({
      ...prevState,
      ...loginResponseData,
      isLogged: true,
    }));
  };
  console.log("inside App.js (line 43): ", login);

  return (
    <>
      <UserLoginContext.Provider value={login}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/dates" element={<Dates />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login user={userHandler} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserLoginContext.Provider>
    </>
  );
}

export default App;
