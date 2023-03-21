import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Navigate,
  redirect,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "./components/Auth";
import Orders from "./components/Orders";
import "@progress/kendo-theme-default/dist/all.css";
import { AppContext } from "./services/context";
interface user {
  isAuthenticated: boolean;
  email: string;
}
function App() {
  const [auth, setAuth] = useState<user>({ isAuthenticated: false, email: "" });

  // Note : here we are using the legacy context apis for state management of the auth user. Its not that much needed as we are already having less components and as we are not driving any major rerenders on the DOM.
  const dispatchAuthEvent = (actionType: any, payload: any) => {
    switch (actionType) {
      case "LOGGED_IN":
        setAuth({ ...payload });
        return;
      case "LOGGED_OUT":
        setAuth({ isAuthenticated: false, email: "" });
        return;
      default:
        return;
    }
  };

  return (
    <>
      <AppContext.Provider value={{ auth, dispatchAuthEvent }}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/auth'
              element={auth?.isAuthenticated ? <Navigate to='/' /> : <Auth />}
            />
            {/* TODO: we can create a HOC for this authguard --ignoring due to time constrain */}
            <Route
              path='/'
              element={
                !auth?.isAuthenticated ? <Navigate to='/auth' /> : <Orders />
              }
            />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
