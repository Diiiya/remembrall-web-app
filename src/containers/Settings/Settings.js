import React, { useEffect, useState, useRef } from "react";
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CircularProgress from '@material-ui/core/CircularProgress';

import { updateUser, deleteUser } from '../Dashboard/redux/actions';
import { userSelector, userUpdateSelector, userDeleteSelector } from '../Dashboard/redux/selectors';

import './Settings.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Settings(props) {

  const { 
    token, 
    removeToken,
    user, 
    isUpdateSuccessful, 
    updateUserAction, 
    isDeleteSuccessful, 
    deleteUserAction } = props;

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
    },
    confirmDeleteButton: {
      background: "#e90040",
      "&:hover": {
        background: "rgb(233, 0, 64, 0.5)",
      },
      color: "white",
      borderRadius: "15px",
      width: "140px",
      margin: "10px",
    },
    closeButton: {
      background: "#28606A",
      "&:hover": {
        background: "rgba(40, 96, 106, 0.5)",
      },
      color: "white",
      borderRadius: "15px",
      width: "100px",
      margin: "10px",
    },
  }));

  const classes = useStyles();
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(false);

  const isInitialMount = useRef("");

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    if (isDeleteSuccessful === true) {
      setActionResponse("The account has been deleted!");
      handleClickOpen();
      setShowProgressBar(true);
      setTimeout(function() {
        removeToken();
      }, 5000);
    } else if (isDeleteSuccessful === false) { 
      setActionResponse("Sorry, an error has occurred! Please try again.");
      handleClickOpen(); 
    }
  }
  }, [isDeleteSuccessful]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== "") {
      if (newPassword !== confirmedPass) {
        return setConfirmPasswordErrorMsg("Passwords don't match!");
      }
    } 
    if (user.id) {
      await updateUserAction(user.id, token, email, currentPassword, newPassword);
      if (isUpdateSuccessful === true) {
        setActionResponse("Your account has been successfully updated!");
        handleClickOpen();
        return console.log("successful update");        
      } setActionResponse("Sorry! There has been an error!");
        handleClickOpen();
    }   
  };

  const requestUserDelete = async (e) => {
    e.preventDefault();
    setActionResponse("Are you sure you want to delete your account?");
    handleClickOpenDeleteConfirmationModal();
  };

  const handleUserDelete = async (e) => {
    e.preventDefault();
    handleClose();
    if (user.id) {
      await deleteUserAction(user.id, token);     
    }
  };

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [actionResponse, setActionResponse] = useState("");

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
      setNewPassword(password);
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    setConfirmedPass(confirmPassword);
    const isSame = newPassword === confirmPassword ? true : false;
    if (!isSame) {
      setConfirmPasswordErrorMsg("Passwords don't match!");
    } else {
      setConfirmPasswordErrorMsg("");
    }
  };

  const [open, setOpen] = useState(false);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDeleteConfirmationModal(false);
  };

  const handleClickOpenDeleteConfirmationModal = () => {
    setOpenDeleteConfirmationModal(true);
  };

  return (
    <Grid className="grid" container spacing={2}>
      <Grid item xs={6} sm={3}>
      </Grid>
      <Grid item xs={12} sm={3}>
        <div>
          <h2>Settings</h2>
          <div className="settingsFormBox">
            <form className="settingsForm" onSubmit={handleSubmit}>
              <div className="titleText">Update profile</div>
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
                type="password"
                label="New Password"
                className="textField"
                onChange={(e) => validatePassword(e.target.value)}
              />
              <div className="errorMsg">{passwordErrorMsg}</div>
              <TextField
                id="standard-password-input"
                type="password"
                label="Confirm new password"
                className="textField"
                onChange={(e) => validateConfirmPassword(e.target.value)}
              />
              <div className="errorMsg">{confirmPasswordErrorMsg}</div>
              <TextField
                id="standard-password-input"
                required
                type="password"
                label="Current Password"
                className="textField"
                style={{marginTop: "20px"}}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
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
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {actionResponse}
              </DialogTitle>
              <div style={{width: "100%", display: "flex", justifyContent: 'center'}} >
              {showProgressBar ? <CircularProgress /> : null}
              </div>
              <DialogActions>
                <Button onClick={handleClose} className={classes.closeButton}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openDeleteConfirmationModal}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Are you sure you want to delete your account?"}
              </DialogTitle>
              <DialogActions>
              <Button onClick={(e) => handleUserDelete(e)} className={classes.confirmDeleteButton}>
                  Yes, delete!
                </Button>
                <Button onClick={handleClose} className={classes.closeButton}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Button
            variant="contained"
            className={classes.deleteButton}
            onClick={(e) => requestUserDelete(e)}
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
  updateUserAction: updateUser,
  deleteUserAction: deleteUser
}, dispatch);

const mapStateToProps = (state) => ({
  user: userSelector(state) ? userSelector(state) : '',
  isUpdateSuccessful: userUpdateSelector(state) ? userUpdateSelector(state) : '',
  isDeleteSuccessful: userDeleteSelector(state) ? userDeleteSelector(state) : ''
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

Settings.propTypes = {
  setToken: PropTypes.func.isRequired,
  removeToken: PropTypes.func.isRequired,
};

export default compose(withRedux(Settings));