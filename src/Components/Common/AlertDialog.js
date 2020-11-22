import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function AlertDialog(title,  text, cencelLabel, acceptLabel, isDialogOpen, onClose, onClickAgree, onClickDisagree) {
  return ( <Dialog
    open={isDialogOpen}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClickDisagree} color="primary">
        {cencelLabel}
      </Button>
      <Button 
        onClick={onClickAgree}
        color="primary" autoFocus>
        {acceptLabel}
      </Button>
    </DialogActions>
  </Dialog>)
}
export default AlertDialog;
