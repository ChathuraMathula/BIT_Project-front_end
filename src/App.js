import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import Welcome from "./pages/Welcome";
import Dates from "./pages/Dates";
import SignUp from "./pages/SignUp";

import Layout from "./Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <Layout />
      }
    >
      <Route path="/" element={<Welcome />} />
      <Route path="/dates" element={<Dates />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
