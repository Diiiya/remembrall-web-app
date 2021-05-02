import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import LoginFields from "./LoginFields/index";
import SignupFields from "./SignupFields/index";
import "./Form.css";

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
}));

export default function Form(props) {
  const {
    type,
    title,
    description,
    link,
    handleSubmit,
    setUserName,
    setEmail,
    setLogin,
    setPassword,
    setFormType,
    setResponseMsg,
    responseMessage,
  } = props;
  const classes = useStyles();

  let fields;
  let localType;

  if (type === "login") {
    fields = <LoginFields setLogin={setLogin} setPassword={setPassword} />;
    localType = "signup";
  } else {
    fields = (
      <SignupFields
        setUserName={setUserName}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    );
    localType = "login";
  }

  const changeForm = () => {
    setFormType(localType);
    setResponseMsg("");
  };

  return (
    <div className="formBox">
      <form onSubmit={handleSubmit}>
        <div className="titleText">{title}</div>
        <div className="descriptionText">
          <div>{description}</div>
          <div>
            <button type="button" onClick={() => changeForm()} className="link">
              {link}
            </button>
          </div>
        </div>
        {fields}
        <div className="errorMsg">{responseMessage}</div>
        <div className="button">
          <Button
            variant="contained"
            className={classes.primaryButton}
            type="submit"
          >
            {title}
          </Button>
        </div>
      </form>
    </div>
  );
}
