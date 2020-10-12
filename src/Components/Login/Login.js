import React, { Component } from "react";
import "./Login.css";
import { withRouter, Redirect } from "react-router-dom";
import MuiPhoneInput from "material-ui-phone-number";
import { connect } from "react-redux";
import Auth from "../../Auth";
import { Button, Avatar, Checkbox, FormControlLabel, Input,
         IconButton, InputAdornment, FormControl, InputLabel} from "@material-ui/core";
import { setLoggedInUser } from "../../Redux/Actions";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Visibility, VisibilityOff } from '@material-ui/icons';


class ConnectedLogin extends Component {
  state = {
    userName: "",
    pass: "",
    showPass: "",
    redirectToReferrer: false,
    registUserName: "",
    showRegistPass: false,
    registPass: "",
    showRegistSecPass: false,
    registSecPass: ""
  };


  handleRegister() {

  }

  handleAuth() {
    // Simulate authentication call
    Auth.sessionCreate(this.state.userName, this.state.pass, (res, error) => {      
            
      if (error) {
        this.setState({ loginError: error });
        return;
      }

      if (res.unauthorized) {
        this.setState({ wrongCred: true });
        return;
      }

      this.props.dispatch(setLoggedInUser({ name: res.userName }));
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    // If user was authenticated, redirect her to where she came from.
    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="screen-container">
          <div className="input-panel">
            <Avatar style={{ marginBottom: 10 }}>
              <LockOutlinedIcon />
            </Avatar>
            {/* <div
              style={{
                marginBottom: 20,
                fontSize: 24,
                textAlign: "center"
              }}
            > */}
            <div className="text-header">Logowanie</div>
            <FormControl>
              <InputLabel>E-mail</InputLabel>
              <Input
                id="userName"
                value={this.state.userName}
                className="input-text"
                onChange={e => {
                  this.setState({ userName: e.target.value });
                }}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    this.handleAuth();
                  }
                }}
              />
            </FormControl>



              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                  type={this.state.showPass ? 'text' : 'password'}
                  value={this.state.pass}
                  className="input-text"
                  onChange={e => {
                    this.setState({ pass: e.target.value });
                  }}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      this.handleAuth();
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={e => {
                          this.setState({ showPass: !this.state.showPass });
                        }}
                        onMouseDown={e => {
                          e.preventDefault();
                        }}
                      >
                        {this.state.showPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    }
                />
              </FormControl>




            <Button
              style={{ marginTop: 20, width: 200 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                this.handleAuth();
              }}
            >
              Zaloguj
            </Button>
            {
              (this.state.wrongCred && (<div style={{ color: "red" }}>Wrong username and/or password</div>)) || 
              (this.state.loginError && <div style={{ color: "red" }}>Login failed: {this.state.loginError}</div>)
            }
          </div>
            <div className="screen-divider"></div>
              <div className="input-panel register-panel">
              <div className="text-header">Jesteś tu po raz pierwszy? Załóż konto</div>
              <div className="text-area">
                <p>Rejestrując się zyskujesz:</p>
                <ul>
                  <li>możliwość śledzenia statusu zamówienia</li>
                  <li>dostęp do historii zamówień</li>
                  <li>szybki i wygodny proces składania kolejnych zamówień</li>
                </ul>
              </div>
              <FormControl>
                <InputLabel>E-mail</InputLabel>
                <Input
                  id="registUserName"
                  type='text'
                  className="input-text"
                  value={this.state.registUserName}
                  onChange={e => {
                    this.setState({ registUserName: e.target.value });
                  }}
                />
              </FormControl>
                <InputLabel>Phone</InputLabel>
                <MuiPhoneInput
                  defaultCountry='pl'
                  regions={'europe'}
                  onlyCountries={["pl"]}
                  className="input-text"
                />
              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                  type={this.state.showRegistPass ? 'text' : 'password'}
                  value={this.state.registPass}
                  className="input-text"
                  onChange={e => {
                    this.setState({ registPass: e.target.value });
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={e => {
                          this.setState({ showRegistPass: !this.state.showRegistPass });
                        }}
                        onMouseDown={e => {
                          e.preventDefault();
                        }}
                      >
                        {this.state.showRegistPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    }
                />
              </FormControl>
              <FormControl>
                <InputLabel>Repeat Password</InputLabel>
                <Input
                  type={this.state.showRegistSecPass ? 'text' : 'password'}
                  value={this.state.registSecPass}
                  className="input-text"
                  onChange={e => {
                    this.setState({ registSecPass: e.target.value });
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={e => {
                          this.setState({ showRegistSecPass: !this.state.showRegistSecPass });
                        }}
                        onMouseDown={e => {
                          e.preventDefault();
                        }}
                      >
                        {this.state.showRegistSecPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    }
                />
              </FormControl>
              <FormControlLabel
                control={
                    <Checkbox
                        value="SomeValue"
                        color="primary"
                    />
                }
                label="Zapoznałem się z regulaminem"
                style={{ marginTop: 10}}/>
              <Button
                style={{ marginTop: 20, width: 200 }}
                variant="outlined"
                color="primary"
                onClick={() => {
                  this.handleRegister();
                }}
              >
                Zarejestruj się
              </Button>
            </div>
        </div>
      </div>
    );
  }
}
const Login = withRouter(connect()(ConnectedLogin));

export default Login;
