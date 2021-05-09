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

import { getUser, getUserTodos } from "./redux/actions";
import { userSelector, userTodosSelector } from './redux/selectors';

import './Dashboard.css';

function Dashboard({ token, getUserAction, getUserTodosAction, userTodos, user }) {

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
                >
                  add todo
            </Button>
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
}, dispatch);

const mapStateToProps = (state) => ({
  user: userSelector(state) ? userSelector(state) : '',
  userTodos: userTodosSelector(state) ? userTodosSelector(state) : ''
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(Dashboard));
