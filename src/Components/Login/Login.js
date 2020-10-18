import React, { Component } from "react";
import "./Login.css";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../ApiProxy/Auth";
import User from "../../ApiProxy/User";
import { Button, Avatar, Checkbox, FormControlLabel, Input, Typography,
         IconButton, InputAdornment, FormControl, InputLabel} from "@material-ui/core";
import { setLoggedInUser } from "../../Redux/Actions";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import * as EmailValidator from 'email-validator';


class ConnectedLogin extends Component {
  state = {
    redirectToReferrer: false,
    
    // login inputs values
    userName: "",
    pass: "",
    showPass: "",

    // sign up inputs values
    registUserEmail: "",
    showRegistPass: false,
    registPass: "",
    registSecPass: "",
    showRegistSecPass: false,
    rulesCheckbox: false,
    rulesCheckboxError: false,

    // inputs errors
    userNameError: false,
    passError: false,
    registUserEmailError: false,
    registPassError: false,
    registSecPassError: false,
  };


  handleRegisterUser() {
    // clean messages state
    this.setState({registError: "",
                   registSuccessed: false,
                   registUserEmailError: false,
                   registPassError: false,
                   registSecPassError: false,
                   rulesCheckboxError: false});

    // validate
    try {
      this.validateRegisterForm();
    } catch (error) {
      this.setState({registError: error.message})
      return;
    }

    // send api request
    let name = ""
    let phone = ""
    User.createUser(name,
                    this.state.registPass,
                    this.state.registUserEmail,
                    phone,
                    (res, error) => {

      
      if (error) {
        this.setState({registError: error.message})
        return;
      }
      this.setState({registSuccessed: true})
    });
  }

  validateRegisterForm(){
    if (EmailValidator.validate(this.state.registUserEmail) === false) {
      this.setState({registUserEmailError: true})
      throw new Error("Wrong email format");
    }

    if (this.state.registPass !== this.state.registSecPass) {
      this.setState({registPassError: true, registSecPassError: true})
      throw new Error("Password don't match");
    }

    if (this.state.registPass === '') {
      this.setState({registPassError: true})
      throw new Error("Password can't be empty");
    }

    if (this.state.rulesCheckbox === false) {
      this.setState({rulesCheckboxError: true})
      throw new Error("You need to accept rules");
    }
  }

  handleLogin() {
    // clean messages state
    this.setState({userNameError: false,
                  passError: false,
                  wrongCred: false});

    // validate
    try {
      this.validateLoginForm();
    } catch (error) {
      this.setState({loginError: error.message})
      return;
    }

    // send api request
    Auth.sessionCreate(this.state.userName, this.state.pass, (res, error) => {      
            
      if (error) {
        console.log("Login error: " + JSON.stringify(error))
        this.setState({ loginError: error.message });
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

  validateLoginForm() {
    if (this.state.userName === '') {
      this.setState({userNameError: true})
      throw new Error("User name can't be empty");
    }

    if (this.state.pass === '') {
      this.setState({passError: true})
      throw new Error("Password can't be empty");
    }
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
            <div className="text-header">Logowanie</div>
            <FormControl>
              <InputLabel>E-mail</InputLabel>
              <Input
                id="userName"
                value={this.state.userName}
                error={this.state.userNameError}
                className="input-text"
                onChange={e => {
                  this.setState({ userName: e.target.value });
                }}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    this.handleLogin();
                  }
                }}
              />
              
            </FormControl>

              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                  type={this.state.showPass ? 'text' : 'password'}
                  value={this.state.pass}
                  error={this.state.passError}
                  className="input-text"
                  onChange={e => {
                    this.setState({ pass: e.target.value });
                  }}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      this.handleLogin();
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
                this.handleLogin();
              }}
            >
              Zaloguj
            </Button>
            <div style={{ width: 280 }}>
              {
                (this.state.wrongCred && (<h5 style={{ color: "red" }}>Wrong username and/or password</h5>)) || 
                (this.state.loginError && <h5 style={{ color: "red" }}>Login failed: {this.state.loginError}</h5>)
              }
            </div>
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
                  id="registUserEmail"
                  type='text'
                  className="input-text"
                  value={this.state.registUserEmail}
                  error={this.state.registUserEmailError}
                  onChange={e => {
                    this.setState({ registUserEmail: e.target.value });
                  }}
                />
              </FormControl>
                <div style={{marginTop: 10}}></div>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                  type={this.state.showRegistPass ? 'text' : 'password'}
                  value={this.state.registPass}
                  error={this.state.registPassError}
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
                  error={this.state.registSecPassError}
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
                        color="primary"
                        onChange={() => {
                          this.setState({rulesCheckbox: !this.state.rulesCheckbox});
                        }}
                        checked={this.state.rulesCheckbox}
                        style={ {color: this.state.rulesCheckboxError ? "red" : null }}
                    />
                }
                label={
                  <Typography  style={{fontSize: 13}}>
                     Zapoznałem się z regulaminem
                  </Typography>
              }
                style={{ marginTop: 10, fontSize: 4}}/>
              <Button
                style={{ marginTop: 20, width: 200 }}
                variant="outlined"
                color="primary"
                onClick={() => {
                  this.handleRegisterUser();
                }}
              >
                Zarejestruj się
              </Button>
              {this.state.registError && <h5 style={{ color: "red" }}>Registration failed: {this.state.registError}</h5>}
              {this.state.registSuccessed && <h5 style={{ color: "green" }}>Please open confirmation email to finish registration</h5>}
            </div>
        </div>
      </div>
    );
  }
}
const Login = withRouter(connect()(ConnectedLogin));

export default Login;
