import React, { Component } from "react";
import * as Lang from '../../LangPL';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

class PriceDialog extends Component {
  state = {
    lastOpenedStatus: false
  };

  // Only when this dialog is opened, copy the prices from props to local state.
  static getDerivedStateFromProps(props, state) {
    if (props.open === true && state.lastOpenedStatus === false) {
      return {
        min: props.min,
        max: props.max,
        lastOpenedStatus: true
      };
    }

    return { lastOpenedStatus: props.open };
  }

  render() {
    let { min, max } = this.state;

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => {
            this.props.onClose();
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <DialogTitle>Zakres ceny</DialogTitle>

            <div style={{ display: "flex", padding: 20 }}>
              <TextField
                value={min}
                step={0.1}
                type="number"
                style={{ width: 70 }}
                placeholder="Min"
                label="Min"
                onChange={e => {
                  let val = parseFloat(e.target.value);
                  if (Number.isNaN(val) || val < 0 || val > 10000000) {
                    return;
                  }
                  this.setState({
                    min: val
                  });
                }}
              />
              <TextField
                value={max}
                step={0.1}
                type="number"
                style={{ width: 70, marginLeft: 20 }}
                placeholder="Max"
                label="Max"
                onChange={e => {
                  let val = parseFloat(e.target.value);

                  if (Number.isNaN(val) || val < 0 || val > 10000000) {
                    return;
                  }
                  this.setState({
                    max: val
                  });
                }}
              />
            </div>
            <div style={{ display: "flex", padding: 20 }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ width: 50 }}
                onClick={() => {
                  this.props.onSave(min, max);
                }}
              >
                OK
              </Button>
              <Button
                color="primary"
                variant="outlined"
                style={{ width: 50, marginLeft: 5 }}
                onClick={() => {
                  this.props.onClose();
                }}
              >
                {Lang.CANCEL}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default PriceDialog;
