import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import "./SignupFields.css";

export default function SignupFields(props) {
  const { setUserName, setEmail, setPassword } = props;
  const [localPassword, setLocalPassword] = useState("");

  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");

  const validateUsername = (username) => {
    const validUsername = new RegExp("^(?:.*[A-Za-z0-9])$");
    const isValid = validUsername.test(username);
    if (!isValid) {
      setUsernameErrorMsg("The username can only contain letters and numbers");
    } else if (username.length < 3 || username.length > 30) {
      setUsernameErrorMsg(
        "Username should contain between 3 and 30 characters!"
      );
    } else {
      setUsernameErrorMsg("");
      setUserName(username);
    }
  };

  const validateEmail = (email) => {
    const validEmail = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const isValid = validEmail.test(email);
    if (!isValid) {
      setEmailErrorMsg("Not a valid email");
    } else {
      setEmailErrorMsg("");
      setEmail(email);
    }
  };

  const validatePassword = (password) => {
    const validPassword = new RegExp(
      "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"
    );
    const isValid = validPassword.test(password);
    if (!isValid) {
      setPasswordErrorMsg(
        "Password should contain at least one letter and one number!"
      );
    } else if (password.length < 6 || password.length > 60) {
      setPasswordErrorMsg(
        "Password should contain between 6 and 60 characters!"
      );
    } else {
      setPasswordErrorMsg("");
      setLocalPassword(password);
      setPassword(password);
    }
  };

  const validateConfrimPassword = (confirmPassword) => {
    const isSame = localPassword === confirmPassword ? true : false;
    if (!isSame) {
      setConfirmPasswordErrorMsg("Passwords don't match!");
    } else {
      setConfirmPasswordErrorMsg("");
    }
  };

  return (
    <div>
      <TextField
        id="standard-required"
        required
        label="Username"
        className="textField"
        onChange={(e) => validateUsername(e.target.value)}
      />
      <div className="errorMsg">{usernameErrorMsg}</div>
      <TextField
        id="standard-required"
        required
        label="Email"
        className="textField"
        onChange={(e) => validateEmail(e.target.value)}
      />
      <div className="errorMsg">{emailErrorMsg}</div>
      <TextField
        id="standard-password-input"
        required
        type="password"
        label="Password"
        className="textField"
        onChange={(e) => validatePassword(e.target.value)}
      />
      <div className="errorMsg">{passwordErrorMsg}</div>
      <TextField
        id="standard-password-input"
        required
        type="password"
        label="Confirm password"
        className="textField"
        onChange={(e) => validateConfrimPassword(e.target.value)}
      />
      <div className="errorMsg">{confirmPasswordErrorMsg}</div>
    </div>
  );
}
