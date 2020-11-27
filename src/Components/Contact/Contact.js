import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Typography } from "@material-ui/core";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// This component shows the items user checked out from the cart.
class ConnectedContact extends Component {


  render() {
    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10}}>Kontakt</div>
        <div style={{margin: 20, width: "80%", alignContent: "center"}}>
          Jeścli chcesz się z nami skontaktować, wyślij maila na adres 
          <NavLink
            to={"mailto:foo@bar.com"}
            exact
            style={{
              textDecoration: "none",
              color: "rgb(32, 32, 34)"
            }}
            activeStyle={{
              color: "#4282ad",
              textDecoration: "underline"
            }}
          >
            {' '}foo@bar.com
          </NavLink>

        </div>
      </div>
      
    );
  }
}
const Contact = withRouter(connect()(ConnectedContact));

export default Contact;
