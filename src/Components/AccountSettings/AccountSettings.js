import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MuiPhoneInput from "material-ui-phone-number";
import { Input, Typography, InputLabel, TextField,
         Button, CircularProgress, Divider } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import User from '../../ApiClient/User'
import { getVillages } from "../../Model/Villages";
import util from 'util';
import Session from "./../../ApiClient/Session";
import { logout } from "../../Redux/Actions";


// This component shows the items user checked out from the cart.
class ConnectedAccountSettings extends Component {

  state = {
    loading: true,
    villages: [],
    initError: null,
    updateError: null,
    updatePassError: null,
    successed: false,
    passSuccessed: false,

    // imputs
    firstLastName: "",
    email: "",
    village: "",
    homeNumber: "",
    addressNotes: "",
    street: "",
    phone: "",

    oldPass: "",
    newPass: "",
    newPassRep: "",

    // inputs errors
    firstLastNameError: false,
    villageError: false,
    homeNumberError: false,
    phoneError: false,

    oldPassError: false,
    newPassError: false,
    newPassRepError: false,

    formErrorMsgs: [],
    passErrorMsgs: []
  };

  async fetchData() {
    this.setState({ loading: true });

    var user;
    var villages
    try {
      villages = await getVillages()
      var resp = await User.userGet()
      user = await resp.json()
    } catch(e) {
      this.setState( {
        loading: false,
        initError: e.message
      });
      console.log("User get error: " + JSON.stringify(e))
      return
    }
    
    this.setState({
      firstLastName: user.username,
      email: user.email,
      village: user.village,
      homeNumber: user.homeNumber,
      addressNotes: user.addressNotes,
      street: user.street,
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
      this.setState({firstLastNameError: true})
      validSuccess = false
    }

    if (this.state.village === null) {
      errMsgs.push("musisz wybrać miejscowość")
      this.setState({villageError: true})
      validSuccess = false
    }

    if (this.state.homeNumber === "") {
      errMsgs.push("musisz podać numer domu")
      this.setState({homeNumberError: true})
      validSuccess = false
    }

    let phoneDigits = this.state.phone.replace(/[^0-9]/g,"").length
    if (phoneDigits !== PHONE_NUMBER_LENGTH) {
      this.setState({phoneError: true})
      errMsgs.push(util.format('podany numer telefonu "%s" jest nieprawidłowy', this.state.phone))
      validSuccess = false
    }

    if (errMsgs.length) {
      this.setState({formErrorMsgs: errMsgs})
      validSuccess = false
    }
    if (!validSuccess) throw new Error('Validation error')
  }

  handleSaveChangesButton() {
    this.setState({successed: false, updateError: null, formErrorMsgs: []})
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
      addressNotes: this.state.addressNotes,
      street: this.state.street,
      phone: this.state.phone,
    }

    User.userPut(user).then(async (resp)=> {
      if (resp.status !== 200) {
        this.setState({
          updateError: (await resp.json()).message
        })
        return
      }
      this.setState({successed: true})
    }).catch(e => {
      this.setState({
        updateError: e.message})
      })
  }

  handleChangePasswdButton() {
    var errMsgs = []
    this.setState({
      oldPassError: false,
      newPassError: false,
      newPassRepError: false,
      passSuccessed: false,
      updatePassError: null,
      passErrorMsgs: []
    })

    if(this.state.oldPass === '') {
      errMsgs.push("stare hasło nie może byc puste")
      this.setState({oldPassError: true})
    }

    if(this.state.newPass === '') {
      errMsgs.push("nowe hasło nie może być puste")
      this.setState({newPassError: true})
    }

    if(this.state.newPassRep === '') {
      errMsgs.push("nowe hasło nie może być puste")
      this.setState({newPassRepError: true})
    }

    if(this.state.newPass !== this.state.newPassRep) {
      errMsgs.push("nowe hasło zostało źle powtórzone")
      this.setState({newPassError: true, newPassRepError: true})
    }

    this.setState({passErrorMsgs: errMsgs})
    if (errMsgs.length > 0) {
      return
    }
    
    let user = {
      password: this.state.oldPass,
      newPassword: this.state.newPass,
    }

    User.userPut(user).then(async (resp)=> {
      if (resp.status !== 200) {
        this.setState({
          updatePassError: (await resp.json()).message,
          passSuccessed: false
        })
        return
      }
      this.setState({passSuccessed: true})
    }).catch(e => {
      this.setState({
        updatePassError: e.message,
        passSuccessed: false
      })
    })
  }
  
  componentDidMount() {
    this.checkSession();
    this.fetchData();
  }

  async checkSession() {
    try {
      let session = await Session.sessionGet();
      if (session.status === 401) {
        throw new Error(session.statusText);
      }
    } catch {
      this.props.dispatch(logout());
    } 
  }


  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }
    
    if (this.state.initError) {
      return <div className="initial-error">Error: {this.state.initError}.</div>;
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
                error={this.state.firstLastNameError}
              />
            </div>

            <div style={{marginTop: 20, display: "inline-grid", width: "200px"}}>
              <InputLabel>E-Mail</InputLabel>
              <Input
                value={this.state.email}
                disabled={true}
              />
            </div>
            
            <div style={{marginTop: 20, display: "inline-grid", width: "210px"}}>
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

            <div style={{marginTop: 20, display: "flex", width: "100%"}}>
              <div style={{display: "inline-grid", width: "200px"}}>
                  <InputLabel>Ulica</InputLabel>
                  <Input
                    value={this.state.street}
                    onChange={e => {
                      this.setState({ street: e.target.value });
                    }}
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

            <div style={{marginTop: 20, display: "inline-grid", width: "300px"}}>
                <InputLabel>Uwagi</InputLabel>
                <Input
                  value={this.state.addressNotes}
                  onChange={e => {
                    this.setState({ addressNotes: e.target.value });
                  }}
                />
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
              this.handleSaveChangesButton()
            }}
          >
            Zapisz
          </Button>
          {this.state.formErrorMsgs.length ? <h5 style={{ color: "red" }}>Formularz zawiera błędy: <ul>{this.state.formErrorMsgs.map((v, k) => <li key={k}>{v}</li>)}</ul></h5> : ""}
          {this.state.updateError ? <h5 style={{ color: "red" }}>Błąd: {this.state.updateError}.</h5> : ""}
          {this.state.successed ? <h5 style={{ color: "green" }}>Dane zostały zaktualizowane.</h5> : ""}
        </div>
        <Divider style={{marginTop: 10}} />
        <div style={{ fontSize: 24, marginTop: 10 }}>Zmiana hasła</div>
        <div style={{margin: 20, width: "98%"}}>


          <div className="product-container">
            <Typography>
              Tutaj możesz zmienić swoje hasło
            </Typography>
            <div style={{marginTop: 20, display: "inline-grid", width: "200px"}}>
              <InputLabel>Stare hasło</InputLabel>
              <Input
                type={'password'}
                value={this.state.oldPass}
                error={this.state.oldPassError}
                onChange={e => {
                  this.setState({
                    oldPass: e.target.value
                  });
                }}
              />
            </div>

            <div style={{marginTop: 20, display: "inline-grid", width: "200px"}}>
              <InputLabel>Nowe hasło</InputLabel>
              <Input
                type={'password'}
                value={this.state.newPass}
                error={this.state.newPassError}
                onChange={e => {
                  this.setState({
                    newPass: e.target.value
                  });
                }}
              />
            </div>

            <div style={{marginTop: 20, display: "inline-grid", width: "200px"}}>
              <InputLabel>Powtórz nowe hasło</InputLabel>
              <Input
                type={'password'}
                value={this.state.newPassRep}
                error={this.state.newPassRepError}
                onChange={e => {
                  this.setState({
                    newPassRep: e.target.value
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, width: "70%", padding: "20px"}}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              this.handleChangePasswdButton()
            }}
          >
            Zmień
          </Button>
          {this.state.passErrorMsgs.length ? <h5 style={{ color: "red" }}>Formularz zawiera błędy: <ul>{this.state.passErrorMsgs.map((v, k) => <li key={k}>{v}</li>)}</ul></h5> : ""}
          {this.state.updatePassError ? <h5 style={{ color: "red" }}>Błąd: {this.state.updatePassError}.</h5> : ""}
          {this.state.passSuccessed ? <h5 style={{ color: "green" }}>Hasło zostało pomyślnie zmienione.</h5> : ""}
        </div>
      </div>
    );
  }
}
const AccountSettings = withRouter(connect()(ConnectedAccountSettings));

export default AccountSettings;
