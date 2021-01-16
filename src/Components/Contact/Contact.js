import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

// This component shows the items user checked out from the cart.
class ConnectedContact extends Component {


  render() {
    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10}}>Kontakt</div>
        <div style={{margin: 20, width: "80%", alignContent: "center"}}>
          Jeścli chcesz się z nami skontaktować, wyślij maila na adres 
          <NavLink
            to={"mailto:kontakt@e-luborzyca.pl"}
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
            {' '}kontakt@e-luborzyca.pl
          </NavLink>

        </div>
      </div>
      
    );
  }
}
const Contact = withRouter(connect()(ConnectedContact));

export default Contact;
