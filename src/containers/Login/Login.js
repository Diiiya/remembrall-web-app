import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import ProductDescription from "../../components/ProductDescription";
import Form from "../../components/Form";
import "./Login.css";

async function loginUser(credentials) {
  return fetch("https://localhost:5001/users/authenticate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function signupUser(userData) {
  return fetch("https://localhost:5001/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const history = useHistory();

  const [login, setLogin] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [formType, setFormType] = useState("login");
  const [responseMsg, setResponseMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      login,
      password,
    });
    const isSuccessful = await setToken(token);
    if (!isSuccessful) {
      setResponseMsg("Not a valid username/email and password combination!");
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    await signupUser({
      username,
      email,
      password,
    });
  };

  let title;
  let description;
  let link;
  let handleSubmit;

  if (formType === "login") {
    title = "Login";
    description = "Don't have an account?";
    link = "Sign up";
    handleSubmit = handleLoginSubmit;
  } else {
    title = "Sign up";
    description = "Already have an account?";
    link = "Login";
    handleSubmit = handleSignupSubmit;
  }

  if (isLoggedIn) {
    history.push("/dashboard");
  }

  return (
    <Grid className="grid" container spacing={2}>
      <Grid item xs={6} sm={3}></Grid>
      <Grid className="gridItem" item xs={6} sm={3}>
        <ProductDescription />
      </Grid>
      <Grid item xs={6} sm={3}>
        <Form
          type={formType}
          title={title}
          description={description}
          handleSubmit={handleSubmit}
          setUserName={setUserName}
          setEmail={setEmail}
          setLogin={setLogin}
          setPassword={setPassword}
          setFormType={setFormType}
          setResponseMsg={setResponseMsg}
          link={link}
          responseMessage={responseMsg}
        />
      </Grid>
      <Grid item xs={6} sm={3}></Grid>
    </Grid>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
