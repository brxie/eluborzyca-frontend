import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    color: "rgb(0, 47, 52) !important",
  }
});

function CustomizedInputs(props) {
  return (
    <TextField
      InputProps={{ classes: props.classes }}
      {...props}
    />
  );
}

export default withStyles(styles)(CustomizedInputs);