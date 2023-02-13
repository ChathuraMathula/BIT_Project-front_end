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

import Header from "./components/Header";
import Footer from "./components/Footer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }
    >
      <Route path="/" element={<Welcome />} />
      <Route path="/dates" element={<Dates />} />
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
