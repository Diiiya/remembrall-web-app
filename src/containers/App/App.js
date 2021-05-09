import React, { useState } from "react";
import {
  Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import UserMenu from "../../components/UserMenu/index";
import ProtectedRoute from "../../components/ProtectedRoute/index";
import Login from "../Login/index";
import Dashboard from "../Dashboard/index";
import Settings from "../Settings/index";
import useToken from "./useToken";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";

import "fontsource-roboto";
import "./App.css";

function App() {
  const history = useHistory();
  const { token, setToken, removeToken } = useToken();

  const showUserMenu = () => {
    if (token) {
      history.push("/dashboard");
      return <UserMenu removeToken={removeToken} token={token} />;
    }
    return null;
  };

  const useStyles = makeStyles({
    list: {
      width: 250,
      // top: "50px", // not in consideration
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const classes = useStyles();
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}      
    >
      <List>
        <ListItem button key={"All tasks"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Today"} />
        </ListItem>
        <ListItem button key={"All tasks"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"This week"} />
        </ListItem>
        <ListItem button key={"All tasks"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"This month"} />
        </ListItem>
      </List>
      <ListItem button key={"All tasks"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"This year"} />
      </ListItem>
      <ListItem button key={"All tasks"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"All"} />
      </ListItem>
    </div>
  );

  return (
    <div className="body">
      <div className="headerDiv">
        <div className="headerTitle" onClick={toggleDrawer(true)}> Remembrall </div>
        <Drawer open={isOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
        {showUserMenu()}
      </div>
      <div className="wrapper">        
        <Router history={history}>
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
            <ProtectedRoute
              path="/settings"
              exact
              component={Settings}
              token={token}
              removeToken={removeToken}
            />

            {/* All other routes */}
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </Router>
      </div>
      <div className="footerDiv">
        <div className="footerText"> Footer </div>
      </div>
    </div>
  );
}

export default App;
