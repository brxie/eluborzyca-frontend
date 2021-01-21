import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    color: "rgb(32, 32, 32) !important",
  },
  notchedOutline: {
    borderWidth: '0px',
  },
});

function CustomizedInput(props) {
  return (
    <TextField
      InputProps={{ classes: props.classes }}
      {...props}
    />
  );
}

export default withStyles(styles)(CustomizedInput);