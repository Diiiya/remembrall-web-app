import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EditIcon from "@material-ui/icons/Edit";

import ProtectedRoute from "../../components/ProtectedRoute/index";
import Login from "../Login/index";
import Dashboard from "../Dashboard/index";
import useToken from "./useToken";

import "fontsource-roboto";
import catImg from "../../resources/images/cat.jpg";
import "./App.css";

function App() {
  const history = useHistory();
  const { token, setToken, removeToken } = useToken();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  // For app menu > https://material-ui.com/components/drawers/
  const showUserMenu = () => {
    if (token) {
      history.push("/dashboard");
      return (
        <div>
          <div className="headerUserMenu" onClick={handleClick}>
            <div>blabla</div>
            <img className="avatar" src={catImg}></img>
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <ListItemIcon style={{ minWidth: "40px" }}>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </StyledMenuItem>
            <StyledMenuItem onClick={removeToken}>
              <ListItemIcon style={{ minWidth: "40px" }}>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </StyledMenuItem>
          </StyledMenu>
        </div>
      );
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
