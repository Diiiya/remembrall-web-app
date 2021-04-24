import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../Login/index';
import Dashboard from '../Dashboard/index';
import Signup from '../SignUp/index';
import useToken from './useToken';

import 'fontsource-roboto';
import './App.css';

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return (
      <div className="body">
        <div className="headerDiv">
          <div className="headerTitle">Remembrall</div>
        </div>
        <BrowserRouter>
          <Switch>
            <Redirect from='/' to='/login' exact />
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route path="/sign-up">
              <Signup />
            </Route>
          </Switch>
        </BrowserRouter>
        <div className="footerDiv">
          <div className="footerText">Footer</div>
        </div>
      </div>
    )
  }

  return (
    <div className="body">
      <div className="headerDiv">
        <div className="headerTitle">Remembrall</div>
      </div>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
