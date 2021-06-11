import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';

import './ConfirmDialog.css';

export default function ConfirmDialog(props) {
    const { openConfirmDialog, setOpenConfirmDialog, deleteTodoAction, selectedTodo, token } = props;
  
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
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      deleteTodoAction(selectedTodo.id, token);
      setOpenConfirmDialog(false);
    };

    useEffect(() => {
    }, [selectedTodo])
  
    return (
      <Dialog open={openConfirmDialog}>
        <div className="confirmFormBox">
            <form className="confirmForm" onSubmit={handleSubmit}>
              <div className="titleText">Are you sure you want to remove the todo?</div>
              
              <div className="buttonsDivTag">
                  <Button
                    variant="contained"
                    className={classes.cancelButton}
                    onClick={() => setOpenConfirmDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.primaryButton}
                    type="submit"
                  >
                    Remove todo
                  </Button>
                </div>
            </form>
        </div>
      </Dialog>
    )
  }