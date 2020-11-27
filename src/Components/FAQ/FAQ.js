import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Typography } from "@material-ui/core";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// This component shows the items user checked out from the cart.
class ConnectedFAQ extends Component {

  render() {
    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10}}>FAQ</div>
        <div style={{margin: 20, width: "80%", alignContent: "center"}}>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
            <Typography variant="h8">Czy korzystanie z serwisu jest darmowe?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Jest calkowicie darmowe
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
            <Typography variant="h8">W jaki sposób mogę dokonać zakupu dostępnych produktów?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Skontaktuj się ze sprzedającym pod podanym numerem telefonu widocznym w ogłoszeniu.
          </AccordionDetails>
        </Accordion>


        </div>
      </div>
      
    );
  }
}
const FAQ = withRouter(connect()(ConnectedFAQ));

export default FAQ;
