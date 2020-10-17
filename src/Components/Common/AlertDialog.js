import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function AlertDialog(isDialogOpen, onClose, onClickAgree, onClickDisagree) {
  return ( <Dialog
    open={isDialogOpen}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Successful Alert"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You are successful in life!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClickDisagree} color="primary">
        Disagree
      </Button>
      <Button 
        onClick={onClickAgree}
        color="primary" autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>)
}
export default AlertDialog;
