import React, { useState, useEffect, useRef } from "react";
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import ColorPicker from 'material-ui-color-picker'

import { tagCreateSelector } from '../../redux/selectors';

import './TagDialog.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function TagDialog(props) {
    const { user, openTagDialog, setOpenTagDialog, createTagAction, token, isTagCreateSuccessful } = props;
    const [tagName, setTagName] = useState("");
    const [tagColor, setTagColor] = useState("#000");
  
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

    const isInitialMount = useRef("");
    const [actionResponse, setActionResponse] = useState("");
    const [actionResultOpen, setActionResultOpen] = useState(false);

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        if (isTagCreateSuccessful === true) {
          setActionResponse("The tag has been created!");
          setActionResultOpen(true);
        } else if (isTagCreateSuccessful === false) {
          setActionResponse("Sorry, an error has occurred! Please try again.");
          setActionResultOpen(true);
        }
        setTimeout(function() {
          setActionResultOpen(false);
        }, 1500);
      }
    }, [isTagCreateSuccessful])
  
    const classes = useStyles();  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      createTagAction(user?.id, tagName, tagColor, token);
      setOpenTagDialog(false);
    };
  
    return (
      <Dialog open={openTagDialog}>
        <Dialog
            style={{ zIndex: "100" }}
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
        <div className="formBox" style={{width: "400px", height: "350px"}}>
            <form className="form" style={{width: "380px", height: "300px"}} onSubmit={handleSubmit}>
              <div className="titleText">Add new tag</div>
              <div className="addTagDiv">
              <div>
                  <TextField
                    id="standard-required"
                    required
                    label="Tag name"
                    className="tagNameField"
                    placeholder="Home"
                    onChange={(e) => setTagName(e.target.value)}
                  />
                </div>
                <div>
                  <ColorPicker
                    name='color'
                    defaultValue={tagColor}
                    value={tagColor}
                    onChange={(color) => setTagColor(color)}            
                  />
                </div>
              </div>
              <div className="buttonsDivTag">
                  <Button
                    variant="contained"
                    className={classes.cancelButton}
                    onClick={() => setOpenTagDialog(false)}
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
    )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

const mapStateToProps = (state) => ({
  isTagCreateSuccessful: tagCreateSelector(state) ? tagCreateSelector(state) : ''
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(TagDialog));