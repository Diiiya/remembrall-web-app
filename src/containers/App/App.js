import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import UserMenu from "../../components/UserMenu/index";
import ProtectedRoute from "../../components/ProtectedRoute/index";
import Login from "../Login/index";
import Dashboard from "../Dashboard/index";
import useToken from "./useToken";

import "fontsource-roboto";
import "./App.css";

function App() {
  const history = useHistory();
  const { token, setToken, removeToken } = useToken();

  // For app menu > https://material-ui.com/components/drawers/
  const showUserMenu = () => {
    if (token) {
      history.push("/dashboard");
      return <UserMenu removeToken={removeToken} token={token} />;
    }
    return null;
  };

  return (
    <div className="body">
      <div className="headerDiv">
        <div className="headerTitle"> Remembrall </div>
        {showUserMenu()}
      </div>
      <div className="wrapper">
        <BrowserRouter>
          <Switch>
            {/* Public routes */}
            <Redirect from="/" to="/login" exact />
            <Route path="/login" exact>
              <Login setToken={setToken} />
            </Route>

            {/* Routes requiring JWT auth */}
            <ProtectedRoute
              path="/dashboard"
              exact
              component={Dashboard}
              token={token}
            />

            {/* All other routes */}
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </BrowserRouter>
      </div>
      <div className="footerDiv">
        <div className="footerText"> Footer </div>
      </div>
    </div>
  );
}

export default App;
