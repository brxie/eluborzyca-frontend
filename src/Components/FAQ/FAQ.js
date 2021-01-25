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
            <Typography variant="h8">Kim jesteśmy?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Jesteśmy podmiotem dostarczającym serwis internetowy dla mieszkańców gminy Kocmyrzów-Luborzyca.
            Celem serwisu jest zapewnienie ujednoliconego miejsca które ułatwi mieszańcom dostęp do lokalnych i
            ekologicznych produktów w naszej gminie.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
            <Typography variant="h8">Czy korzystanie z serwisu jest darmowe?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Jest calkowicie darmowe dla sprzedających i kupujących.
            Serwis nie pobiera też żadnych mikropłatności lub opłat w żadnej formie.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
            <Typography variant="h8">W jaki sposób mogę dokonać zakupu dostępnych produktów?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Każde ogłoszenie posiada informacje o lokalizacji oraz numer telefonu. Skontaktuj się ze sprzedającym aby ustalić warunki
            odbioru produktów.
          </AccordionDetails>
        </Accordion>
        </div>
      </div>
      
    );
  }
}
const FAQ = withRouter(connect()(ConnectedFAQ));

export default FAQ;
