import React, { useState } from "react";
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { userSelector } from '../Dashboard/redux/selectors';

function Settings({ token, getUserAction, user }) {

    const useStyles = makeStyles(() => ({
        primaryButton: {
          background: "#28606A",
          "&:hover": {
            background: "rgba(40, 96, 106, 0.5)",
          },
          color: "white",
          borderRadius: "15px",
          width: "150px",
        },
        deleteButton: {
        background: "#e90040",
          "&:hover": {
            background: "rgb(233, 0, 64, 0.5)",
          },
          color: "white",
          borderRadius: "15px",
          width: "100%",
          margin: "10px",
        }
      }));

      const classes = useStyles();
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();

      const handleSubmit = async (e) => {
        e.preventDefault();
      };

const [localPassword, setLocalPassword] = useState("");
const [emailErrorMsg, setEmailErrorMsg] = useState("");
const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");

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
    <Grid className="grid" container spacing={2}>
      <Grid item xs={6} sm={3}></Grid>
      <Grid item xs={12} sm={3}>
      <div>
      <h2>Settings</h2>
        <div className="formBox">
            <form onSubmit={handleSubmit}>
                <div className="titleText">Update profile</div>
                <div className="descriptionText">
                <div>You can currently update your email and/or password.</div>
                </div>
                <TextField
                    id="standard-required"
                    required
                    label="Email"
                    className="textField"
                    defaultValue={user?.email}
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
                <div className="button">
                <Button
                    variant="contained"
                    className={classes.primaryButton}
                    type="submit"
                >
                    update
                </Button>
                </div>
            </form>
        </div>
        <Button
                    variant="contained"
                    className={classes.deleteButton}
                    type="submit"
                >
                    delete account
                </Button>
    </div>
      </Grid>
      <Grid item xs={6} sm={3}></Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

const mapStateToProps = (state) => ({
  user: userSelector(state) ? userSelector(state) : '',
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(Settings));