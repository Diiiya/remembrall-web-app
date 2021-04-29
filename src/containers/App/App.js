import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../Login/index";
import Dashboard from "../Dashboard/index";
import useToken from "./useToken";

import "fontsource-roboto";
import "./App.css";

function App() {
  const { token, setToken } = useToken();

  console.log("tokenVaal: ", token);

  if (!token) {
    return (
      <div className="body">
        <div className="headerDiv">
          <div className="headerTitle"> Remembrall </div>
        </div>
        <Login setToken={setToken} />
        <div className="footerDiv">
          <div className="footerText"> Footer </div>
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="headerDiv">
        <div className="headerTitle"> Remembrall </div>
      </div>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
