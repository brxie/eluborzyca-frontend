import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import User from '../../ApiClient/User'

// This component shows the items user checked out from the cart.
class ConnectedUserVerify extends Component {

  state = {
    loading: true,
    error: "",
  }

  async fetchData() {
    var verifyToken = this.props.match.params.token;

    try {
      var resp = await User.verify(verifyToken)
      if (resp.status === 404) {
        this.setState( {
          error: "Niepoprawny adres weryfikacyjny.",
          loading: false
        });
        return
      }

      if (resp.status === 409) {
        this.setState( {
          error: "Konto zostało już potwierdzone."
        });  
      }
      
    } catch(e) {
      this.setState( {
        error: "Wystąpił błąd. Spróbuj ponownie później."
      });
      console.log("User verify error: " + JSON.stringify(e))
    }

    this.setState( {
      loading: false
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10}}>Weryfikacja użytkownika</div>
        <div style={{margin: 20, width: "80%", alignContent: "center"}}>
          
        {this.state.error ? <h5 style={{ color: "red" }}>Błąd: {this.state.error}</h5> : "Veryfikacja powiodła się! Możesz przejść do strony logowania"}

        </div>
      </div>
      
    );
  }
}
const UserVerify = withRouter(connect()(ConnectedUserVerify));

export default UserVerify;
