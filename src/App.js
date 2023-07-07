import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dates from "./pages/Dates";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";

import Layout from "./Layout";
import AdminPhotographerProfile from "./components/user/admin/AdminPhotographerProfile";
import { UserLoginContext } from "./context/Context";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Packages from "./pages/Packages";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import socket from "./utils/socket";
import ErrorFallback from "./ErrorFallback";

function App() {
  const [login, setLogin] = useLocalStorage("login", {
    isLogged: false,
    user: null,
  });

  const [loginEndsAt, setLoginEndsAt] = useLocalStorage("loginEndsAt", 0);

  const userLoginHandler = (loginResponseData) => {
    setLogin((prevState) => ({
      ...prevState,
      ...loginResponseData,
      isLogged: true,
    }));

    setLoginEndsAt(Date.now() + 1000 * 60 * 60 * 24);
  };

  useEffect(() => {
    socket;
    if (Date.now() > loginEndsAt) {
      setLogin({});
    }
  }, []);

  // return (
  //   <>
  //     <UserLoginContext.Provider value={login}>
  //       <BrowserRouter>
  //         <Routes>
  //           <Route element={<Layout />} >
  //             <Route errorElement={<ErrorBoundary />} />
  //             <Route path="/" element={<Welcome />} />
  //             <Route path="/sign-up" element={<SignUp />} />
  //             <Route
  //               path="/login"
  //               element={<Login user={userLoginHandler} />}
  //             />
  //             <Route path="/dashboard" element={<Dashboard />} />
  //             <Route path="/profile" element={<Profile />} />
  //             <Route
  //               path="/photographer"
  //               element={<AdminPhotographerProfile />}
  //             />
  //             <Route path="/packages" element={<Packages />} />
  //             <Route path="/dates" element={<Dates />} />
  //             <Route path="/portfolio" element={<Portfolio />} />

  //             <Route
  //               path="/reset/password/:username/:token"
  //               element={<ResetPassword />}
  //             />
  //           </Route>
  //         </Routes>
  //       </BrowserRouter>
  //     </UserLoginContext.Provider>
  //   </>
  // );

  return (
    <>
      <UserLoginContext.Provider value={login}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route errorElement={<ErrorFallback />}>
                <Route path="" element={<Welcome />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route
                  path="login"
                  element={<Login user={userLoginHandler} />}
                />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route
                  path="photographer"
                  element={<AdminPhotographerProfile />}
                />
                <Route path="packages" element={<Packages />} />
                <Route path="dates" element={<Dates />} />
                <Route path="portfolio" element={<Portfolio />} />

                <Route
                  path="reset/password/:username/:token"
                  element={<ResetPassword />}
                />
                <Route path="*" element={<ErrorFallback />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserLoginContext.Provider>
    </>
  );
}

export default App;
