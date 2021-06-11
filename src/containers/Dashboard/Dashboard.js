import React, { useEffect, useState, useRef } from "react";
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/da';
// import 'moment/locale/en-gb';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import DoneIcon from '@material-ui/icons/Done';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { getUser, getUserTodos, createTodo, patchTodo, getUserTags, createTag, deleteTodo, resetTypeValue } from "./redux/actions";
import { 
  userSelector, 
  userTodosSelector, 
  userTagsSelector, 
  todoCreateSelector, 
  todoDoneSelector, 
  todoDeleteSelector,
  tagCreateSelector } from './redux/selectors';

import AddTodoDialog from './components/AddTodoDialog';
import ConfirmDialog from './components/ConfirmDialog';

import './Dashboard.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Dashboard(props) {

  const { 
    token, 
    getUserAction, 
    getUserTodosAction, 
    getUserTagsAction, 
    userTodos, 
    user, 
    createTodoAction,
    patchTodoAction,
    deleteTodoAction,
    isTodoCreateSuccessful,
    isTodoDoneSuccessful,
    isTodoDeleteSuccessful,
    isTagCreateSuccessful,
    userTags, 
    createTagAction,
    resetTypeValueAction,
  } = props;

  useEffect(() => {
    let decrypted = JSON.parse(atob(token.split('.')[1]));
    let userId = decrypted.nameid;
    if (userId) {
      getUserAction(userId, token);
      getUserTodosAction(userId, token);
      getUserTagsAction(userId, token);
      resetTypeValueAction();
    }   
  }, [isTodoCreateSuccessful, isTodoDoneSuccessful, isTodoDeleteSuccessful, isTagCreateSuccessful])

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

  const [addTodoDialogOpen, setAddTodoDialogOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  const classes = useStyles();
  // const isInitialMount = useRef("");
  const [actionResponse, setActionResponse] = useState("");
  const [actionResultOpen, setActionResultOpen] = useState(false);

  useEffect(() => {
    // if (isInitialMount.current) {
    //   isInitialMount.current = false;
    // } else {
      if (isTodoDeleteSuccessful === true) {
        setActionResponse("The todo has been deleted!");
        setActionResultOpen(true);
      } else if (isTodoDeleteSuccessful === false) {
        setActionResponse("Sorry, an error has occurred! Please try again.");
        setActionResultOpen(true);
      }
      closeTodoActions();
      setTimeout(function() {
        setActionResultOpen(false);
      }, 1500);
    // }
  }, [isTodoDeleteSuccessful]);

  useEffect(() => {
    // if (isInitialMount.current) {
    //   isInitialMount.current = false;
    // } else {
      if (isTodoCreateSuccessful === true) {
        setActionResponse("The todo has been created!");
        setActionResultOpen(true);
      } else if (isTodoCreateSuccessful === false) {
        setActionResponse("Sorry, an error has occurred! Please try again.");
        setActionResultOpen(true);
      }
      setTimeout(function() {
        setActionResultOpen(false);
      }, 1500);
    // }
  }, [isTodoCreateSuccessful])

  const checkForNullTime = (todo) => {
    let time = todo?.dateTime.substring(
      todo.dateTime.lastIndexOf("T") + 1, 
      todo.dateTime.lastIndexOf("+")
    );
    if (time !== "00:00:00") {
      return moment(todo?.dateTime).format('LT');
    }
    return "-";    
  }

  const checkForNullDate = (todo) => {
    let date = todo?.dateTime.split('T')[0];
    if (date !== "0001-01-01") {
      return moment(todo?.dateTime).format('MMMM Do');
    }
    return "-";    
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const openTodoActions = async (event, todo) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedTodo(todo);
  };

  const closeTodoActions = () => {
    setAnchorEl(null);
  };

  return (
    <Grid className="gridDashboard" container>
    {console.log("TAGS:; ", userTags)}
      <Grid item xs={10}>
        <div>
          <div>
            <div className="dashboardHeader">
            <div className="allTasks">All {user?.username} tasks</div>
            <Button
                  variant="contained"
                  className={classes.primaryButton}
                  onClick={() => setAddTodoDialogOpen(true)}
                >
                  add todo
            </Button>
            <AddTodoDialog 
              open={addTodoDialogOpen} 
              setAddTodoDialogOpen={setAddTodoDialogOpen}
              user={user ? user : null} 
              token={token} 
              createTodoAction={createTodoAction}  
              userTagsSelector={userTagsSelector} 
              userTags={userTags}  
              createTagAction={createTagAction}            
            />
            <ConfirmDialog 
              openConfirmDialog={openConfirmDialog} 
              setOpenConfirmDialog={setOpenConfirmDialog}
              deleteTodoAction={deleteTodoAction}
              selectedTodo={selectedTodo} 
              token={token}
            />
            <Dialog
              open={actionResultOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setActionResultOpen(false)}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {actionResponse}
              </DialogTitle>
            </Dialog>
            </div>
            <div className="todosDiv">
              {userTodos?.data?.map((todo) => (
                  <div 
                    key={todo?.id} 
                    className={todo.done ? "taskDiv taskDivCompleted" : "taskDiv taskDivIncompleted"} 
                    >
                    <Tooltip title={todo.tag.tagName || "no tag"}>
                      <div 
                        className="tagDiv" 
                        style={{ backgroundColor: todo.tag.tagColor || "gray" }}>.</div>
                    </Tooltip>
                    <div>
                      <div className={todo?.priority === 1 ? "circle highPriorityCircle" : todo?.priority === 2 ? "circle mediumPriorityCircle" : todo?.priority === 3 ? "circle lowPriorityCircle" : "circle inactiveCircle"}>!</div>
                    </div>
                    <div className="time">{checkForNullTime(todo)}</div>
                    <div className="date">{checkForNullDate(todo)}</div>
                    <div className={todo.done ? "taskDescription taskDoneDescription" : "taskDescription"}>
                      {todo?.description}
                    </div>
                    <div className="location">{todo?.location}</div>
                    <div className="doneIcon">
                      <div onClick={() => patchTodoAction(todo.id, token)} className={todo.done ? "circle taskDoneCircle" : "circle inactiveCircle"} >
                        <DoneIcon />
                      </div>
                    </div>
                    <div>
                       <MoreVertIcon className="actionsDiv" onClick={(event) => todo.done ? null : openTodoActions(event, todo) } />
                       <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          // keepMounted
                          // open={Boolean(showTodoActions)}
                          open={Boolean(anchorEl)}
                          onClose={closeTodoActions}
                        >
                          <MenuItem>Edit</MenuItem>
                          <MenuItem todo={selectedTodo} onClick={() => setOpenConfirmDialog(true) }>Delete</MenuItem>
                        </Menu>
                    </div>
                  </div>
              ))}
            </div>
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
  getUserTagsAction: getUserTags,
  createTagAction: createTag,
  patchTodoAction: patchTodo,
  deleteTodoAction: deleteTodo,
  resetTypeValueAction: resetTypeValue,
}, dispatch);

const mapStateToProps = (state) => ({
  user: userSelector(state) ? userSelector(state) : '',
  userTodos: userTodosSelector(state) ? userTodosSelector(state) : '',
  userTags: userTagsSelector(state) ? userTagsSelector(state) : '',
  isTodoCreateSuccessful: todoCreateSelector(state) ? todoCreateSelector(state) : '',
  isTodoDoneSuccessful: todoDoneSelector(state) ? todoDoneSelector(state) : '',
  isTodoDeleteSuccessful: todoDeleteSelector(state) ? todoDeleteSelector(state) : '',
  isTagCreateSuccessful: tagCreateSelector(state) ? tagCreateSelector(state) : ''
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(Dashboard));
