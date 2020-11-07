import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MuiPhoneInput from "material-ui-phone-number";
import { Input, Typography, InputLabel, TextField,
         Button, CircularProgress } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import User from '../../ApiClient/User'
import { getVillages } from "../../ApiProxy/Misc";
import util from 'util';


// This component shows the items user checked out from the cart.
class ConnectedAccountSettings extends Component {

  state = {
    loading: true,
    villages: [],
    initError: null,
    updateError: null,
    successed: false,

    // imputs
    email: "",
    firstLastName: "",
    village: "",
    homeNumber: "",
    phone: "",

    // inputs errors
    villageError: false,
    homeNumberError: false,
    phoneError: false,

    formErrorMsgs: [] 
  };

  async fetchData() {
    this.setState({ loading: true });

    var user;
    var villages
    try {
      villages = await getVillages()
      var resp = await User.userGet()
      user = resp.data
    } catch(e) {
      this.setState( {
        loading: false,
        initError: e.message
      });
      console.log("User get error: " + JSON.stringify(e))
    }
    
    this.setState({
      firstLastName: user.username,
      email: user.email,
      village: user.village,
      homeNumber: user.homeNumber,
      phone: user.phone,
      loading: false,
      villages: villages
    });
  }


  validateForm() {
    const PHONE_NUMBER_LENGTH = 11
    var errMsgs = []
    let validSuccess = true

    if (this.state.firstLastName === "") {
      errMsgs.push("musisz podać imię i nazwisko")
      this.setState({firstLastNameError: true, contactExpanded: true})
      validSuccess = false
    }

    if (this.state.village === null) {
      errMsgs.push("musisz wybrać miejscowość")
      this.setState({villageError: true, contactExpanded: true})
      validSuccess = false
    }

    if (this.state.homeNumber === "") {
      errMsgs.push("musisz podać numer domu")
      this.setState({homeNumberError: true, contactExpanded: true})
      validSuccess = false
    }

    let phoneDigits = this.state.phone.replace(/[^0-9]/g,"").length
    if (phoneDigits !== PHONE_NUMBER_LENGTH) {
      this.setState({phoneError: true, contactExpanded: true})
      errMsgs.push(util.format('podany numer telefonu "%s" jest nieprawidłowy', this.state.phone))
      validSuccess = false
    }

    if (errMsgs.length) {
      this.setState({formErrorMsgs: errMsgs})
      validSuccess = false
    }
    if (!validSuccess) throw new Error('Validation error')
  }

  handleProceedButton() {
    // validation
    try {
      this.validateForm()
    } catch(error) {
      return
    }

    let user = {
      username: this.state.firstLastName,
      village: this.state.village,
      homeNumber: this.state.homeNumber,
      phone: this.state.phone,
    }

    User.userPut(user).then(()=> {
      this.setState({successed: true})
    }).catch(e => {
      this.setState({
        updateError: e.message,
        successed: false})
    })
  }

  
  componentDidMount() {
    this.fetchData();
  }


  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }
    
    if (this.state.initError) {
      return <div className="initial-error">Error: {this.state.initError}. Spróbuj ponownie później.</div>;
    }

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>Ustawienia konta</div>
        <div style={{margin: 20, width: "98%"}}>

          <div className="product-container">
            <Typography>
              Te dane będą używane jako domyślne podczas wystawiania ogłoszenia
            </Typography>

            <div style={{marginTop: 20, display: "inline-grid", width: "200px"}}>
              <InputLabel>Imię i nazwisko</InputLabel>
              <Input
                value={this.state.firstLastName}
                onChange={e => {
                  this.setState({ firstLastName: e.target.value });
                }}
              />
            </div>

            <div style={{marginTop: 20, display: "inline-grid", width: "200px"}}>
              <InputLabel>E-Mail</InputLabel>
              <Input
                value={this.state.email}
                disabled={true}
              />
            </div>
            
            <div style={{marginTop: 20, display: "flex", width: "100%"}}>
              <div style={{display: "inline-grid", width: "210px"}}>
                <InputLabel>Miejscowość</InputLabel>
                <Autocomplete
                  value={this.state.village}
                  onChange={(e, v) => {
                    this.setState({ village: v });
                  }}
                  options={this.state.villages}
                  renderInput={(params) => <TextField error={this.state.villageError} {...params}  />}
                />
              </div>
              <div style={{display: "inline-grid", width: "100px", marginLeft: "20px"}}>
                <InputLabel>Numer domu</InputLabel>
                <Input
                  style={{width: "50px"}}
                  value={this.state.homeNumber}
                  error={this.state.homeNumberError}
                  onChange={e => {
                    this.setState({ homeNumber: e.target.value });
                  }}
                />
              </div>
            </div>

            <div style={{marginTop: 20, display: "inline-grid", width: "100"}}>
                
              <InputLabel>Phone</InputLabel>
              <MuiPhoneInput
                countryCodeEditable={false}
                defaultCountry='pl'
                onlyCountries={['pl']}
                value={this.state.phone}
                error={this.state.phoneError}

                className="input-text"
                disableDropdown={true}
                onChange={number => {
                  this.setState({
                      phone: number
                    });
                }}
                style={{width: "150px"}}
              />
            </div>
          </div>

        </div>

        <div style={{ marginTop: 20, width: "70%", padding: "20px"}}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              this.handleProceedButton()
            }}
          >
            Zapisz
          </Button>
          {this.state.formErrorMsgs.length ? <h5 style={{ color: "red" }}>Formularz zawiera błędy: <ul>{this.state.formErrorMsgs.map((v, k) => <li key={k}>{v}</li>)}</ul></h5> : ""}
          {this.state.updateError ? <h5 style={{ color: "red" }}>Błąd: {this.state.updateError}. Spróbuj ponownie później.</h5> : ""}
          {this.state.successed ? <h5 style={{ color: "green" }}>Dane zostały zaktualizowane.</h5> : ""}
        </div>
        
      </div>
    );
  }
}
const AccountSettings = withRouter(connect()(ConnectedAccountSettings));

export default AccountSettings;
