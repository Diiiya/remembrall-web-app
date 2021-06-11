import React, { useEffect, useState } from "react";
import 'moment/locale/da';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import TagDialog from '../TagDialog';

import './AddTodoDialog.css';

export default function AddTodoDialog(props) {
    const { user, open, createTodoAction, token, userTags, createTagAction, setAddTodoDialogOpen } = props;
  
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
      cancelButton: {
        background: "white",
        "&:hover": {
          background: "rgba(40, 96, 106, 0.5)",
        },
        color: "#28606A",
        borderRadius: "15px",
        width: "150px",
        height: "40px",
        marginRight: "10px",
      },
    }));
  
    const classes = useStyles();
    const [description, setDescription] = useState("");
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [dateTime, setDateTime] = useState("0001-01-01T00:00:00+00:00");
    const [location, setLocation] = useState("");
    const [priority, setPriority] = useState(0);
    const [tag, setTag] = useState("00000000-0000-0000-0000-000000000000");
    const [timeDisabled, setTimeDisabled] = useState(true);
  
    const convertMonth = (month) => {
      var actualMonth = month + 1;
      if (actualMonth <= 9) {
        return "0" + actualMonth;
      } return actualMonth;
    }
  
    const convert0Time = (time) => {
      if (time <= 9) {
        return "0" + time;
      } return time;
    }
  
    useEffect(() => {
      if (date !== null && date !== undefined) {
        let finalDate = date.getFullYear() + "-" + convertMonth(date.getMonth()) + "-" + convert0Time(date.getDate());
        let finalDateTime = date.getFullYear() + "-" + convertMonth(date.getMonth()) + "-" + convert0Time(date.getDate()) + "T00:00:00+00:00";
        
        if (time !== null && time !== undefined) {
          let finalTime = convert0Time(time.getHours()) + ":" + convert0Time(time.getMinutes());
          setDateTime(finalDate + "T" + finalTime + ":00+00:00");
        } else {
          setDateTime(finalDateTime);
        }
      } else {
        setDateTime("0001-01-01T00:00:00+00:00");
      }
    }, [date, time])
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      createTodoAction(user?.id, description, dateTime, location, priority, tag, token);
      setAddTodoDialogOpen(false);
    };
  
    let addCancelTime;
    timeDisabled ? addCancelTime = "Add time" : addCancelTime = "Remove time";
  
    const [openTagDialog, setOpenTagDialog] = useState(false);
  
    return (    
      <Dialog open={open} style={{ zIndex: "1" }}>
        <TagDialog 
          openTagDialog={openTagDialog} 
          setOpenTagDialog={setOpenTagDialog} 
          user={user} 
          token={token} 
          createTodoAction={createTodoAction} 
          createTagAction={createTagAction}
          />
        <div className="addTodoBox">
              <form className="addTodoForm" onSubmit={handleSubmit}>
                <div className="titleText">Add new todo</div>
                <TextField
                  id="standard-required"
                  required
                  label="Description"
                  className="textField"
                  placeholder="Go shopping"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="timeDiv">
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={setDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      disabled={timeDisabled}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Time picker"
                      value={time}
                      onChange={setTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time"
                      }}
                      disabled={timeDisabled}
                    />
                    <Button
                      variant="contained"
                      className={timeDisabled ? classes.primaryButton : classes.cancelButton}
                      style={{width: "60px", fontSize: "10px", marginLeft: "15px"}}
                      onClick={() => { setTimeDisabled(!timeDisabled); setDateTime("0001-01-01T00:00:00+00:00"); }}
                    >
                      {addCancelTime}
                    </Button>
                  </div>
                </MuiPickersUtilsProvider>
                <TextField
                  id="standard-required"
                  label="Location"
                  className="textField"
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="priorityDropdown">
                  <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>High</MenuItem>
                    <MenuItem value={2}>Medium</MenuItem>
                    <MenuItem value={3}>Low</MenuItem>
                  </Select>
                </div>
                <div className="chooseTagDiv">
                <div className="priorityDropdown">
                    <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    >
                      <MenuItem value={"00000000-0000-0000-0000-000000000000"}>None</MenuItem>
                      {userTags?.data?.map((tag) => (                      
                        <MenuItem value={tag.id}>{tag.tagName}</MenuItem>
                      ))}
                    </Select>
                  </div>
                  <Button
                      variant="contained"
                      className={classes.primaryButton}
                      onClick={() => setOpenTagDialog(true)}
                    >
                      Add new tag
                    </Button>
                </div>
                <div className="button">
                  <Button
                    variant="contained"
                    className={classes.cancelButton}
                    onClick={() => setAddTodoDialogOpen(false)}
                  >
                    Cancel
                  </Button>
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