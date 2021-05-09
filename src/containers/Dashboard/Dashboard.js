import React, { useEffect, useState } from "react";
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/da';
// import 'moment/locale/en-gb';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DoneIcon from '@material-ui/icons/Done';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";

import { getUser, getUserTodos, createTodo } from "./redux/actions";
import { userSelector, userTodosSelector } from './redux/selectors';

import './Dashboard.css';

function SimpleDialog(props) {
  const { onClose, user, open, createTodoAction } = props;

  const useStyles = makeStyles(() => ({
    primaryButton: {
      background: "#28606A",
      "&:hover": {
        background: "rgba(40, 96, 106, 0.5)",
      },
      color: "white",
      borderRadius: "15px",
      width: "150px",
      height: "40px"
    },
  }));

  const classes = useStyles();
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("");
  const [tag, setTag] = useState("");

  // const handleClose = () => {
  //   onClose(selectedValue);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = { description, date, time, location, priority, tag };
    console.log("ALL:: ", description, date, time, location, priority, tag);
    console.log("UserId::", user?.id);
    createTodoAction(user?.id, description, date, time, location, priority, tag);
  };

  return (
    <Dialog open={open}>
      {/* <DialogTitle>Add new todo</DialogTitle> */}
      {/* <div>Lala</div> */}
      <div className="formBox">
            <form className="form" onSubmit={handleSubmit}>
              <div className="titleText">Add new todo</div>
              <TextField
                id="standard-required"
                required
                label="Description"
                className="textField"
                defaultValue="Go shopping"
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                id="standard-required"
                label="Date"
                className="textField"
                onChange={(e) => setDate(e.target.value)}
              />
              <TextField
                id="standard-required"
                label="Time"
                className="textField"
                onChange={(e) => setTime(e.target.value)}
              />
              <TextField
                id="standard-required"
                label="Location"
                className="textField"
                onChange={(e) => setLocation(e.target.value)}
              />
              <TextField
                id="standard-required"
                label="Priority"
                className="textField"
                onChange={(e) => setPriority(e.target.value)}
              />
              <TextField
                id="standard-required"
                label="Tag"
                className="textField"
                onChange={(e) => setTag(e.target.value)}
              />
              <div className="button">
                <Button
                  variant="contained"
                  className={classes.primaryButton}
                  type="submit"
                >
                  Add new
                </Button>
              </div>
            </form>
          </div>
    </Dialog>
  );
}

function Dashboard(props) {

  const { token, getUserAction, getUserTodosAction, userTodos, user, createTodoAction } = props;

  useEffect(() => {
    let decrypted = JSON.parse(atob(token.split('.')[1]));
    let userId = decrypted.nameid;
    console.log("noot? ..", userId);
    if (userId) {
      console.log("gets ..", userId);
      getUserAction(userId, token);
      getUserTodosAction(userId, token);
    }        
  }, [])

  const useStyles = makeStyles(() => ({
    primaryButton: {
      background: "#28606A",
      "&:hover": {
        background: "rgba(40, 96, 106, 0.5)",
      },
      color: "white",
      borderRadius: "15px",
      width: "150px",
      height: "40px"
    },
  }));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [completedStyle, setCompletedStyle] = useState(false);
  const toggleCompleted = () => {
    setCompletedStyle(!completedStyle);
  }

  return (
    <Grid className="gridDashboard" container>
      <Grid item xs={10}>
        <div>
          <div>
            <div className="dashboardHeader">
            <div className="allTasks">All {user?.username} tasks</div>
            <Button
                  variant="contained"
                  className={classes.primaryButton}
                  onClick={handleClickOpen}
                >
                  add todo
            </Button>
            <SimpleDialog open={open} onClose={handleClose} user={user} createTodoAction={createTodoAction} />
            </div>
            {userTodos?.data?.map((todo) => (
                <div key={todo?.id} className={completedStyle ? "taskDiv taskDivCompleted" : "taskDiv taskDivIncompleted"} onClick={toggleCompleted}>
                  <div className="tagDiv">.</div>
                  <div>
                    <div className="circle inactiveCircle">!</div>
                  </div>
                  <div className="time">{moment(todo?.time).format('LT')}</div>
                  <div className="date">{moment(todo?.date).format('MMMM Do')}</div>
                  <div className={completedStyle ? "taskDescription taskDoneDescription" : "taskDescription"}>
                    {todo?.description}
                  </div>
                  <div className="location">{todo?.location}</div>
                  <div className="doneIcon">
                    <div className={completedStyle ? "circle taskDoneCircle" : "circle inactiveCircle"} >
                      <DoneIcon />
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserAction: getUser,
  getUserTodosAction: getUserTodos,
  createTodoAction: createTodo,
}, dispatch);

const mapStateToProps = (state) => ({
  user: userSelector(state) ? userSelector(state) : '',
  userTodos: userTodosSelector(state) ? userTodosSelector(state) : ''
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(Dashboard));
