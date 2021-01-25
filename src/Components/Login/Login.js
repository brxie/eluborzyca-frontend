import React, { Component } from "react";
import "./Login.css";
import * as Lang from '../../LangPL';
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import User from "../../ApiClient/User";
import Session from "../../ApiClient/Session";
import { Button, Avatar, Input, IconButton, InputAdornment,
  FormControl, InputLabel} from "@material-ui/core";
import { setLoggedInUser } from "../../Redux/Actions";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import * as EmailValidator from 'email-validator';
import FacebookLogin from 'react-facebook-login';


class ConnectedLogin extends Component {
  state = {
    redirectToReferrer: false,
    signUpButtonDisabled: false,
    
    // login inputs values
    email: "",
    pass: "",
    showPass: "",

    // sign up inputs values
    registUserEmail: "",
    showRegistPass: false,
    registPass: "",
    registSecPass: "",
    showRegistSecPass: false,

    // inputs errors
    emailError: false,
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
                   signUpButtonDisabled: true});

    // validate
    try {
      this.validateRegisterForm();
    } catch (error) {
      this.setState({registError: error.message, signUpButtonDisabled: false})
      return;
    }

    // send api request
    User.userPost({email: this.state.registUserEmail,
                   password: this.state.registPass
    }).then(async resp => {
      if (resp.status !== 201) {
        this.setState({registError:  (await resp.json()).message, signUpButtonDisabled: false})
        return
      }
      this.setState({registSuccessed: true, signUpButtonDisabled: false})
    }).catch((e) =>{
      this.setState({registError: e.stack, signUpButtonDisabled: false})
      return;
    })
  }

  validateRegisterForm(){
    if (EmailValidator.validate(this.state.registUserEmail) === false) {
      this.setState({registUserEmailError: true})
      throw new Error(Lang.WRONG_EMAIL_FORMAT);
    }

    if (this.state.registPass !== this.state.registSecPass) {
      this.setState({registPassError: true, registSecPassError: true})
      throw new Error(Lang.PASSWORD_DONT_MATCH);
    }

    if (this.state.registPass === '') {
      this.setState({registPassError: true})
      throw new Error(Lang.PASSWORD_CANT_BE_EMPTY);
    }
  }

  handleLogin() {
    // clean messages state
    this.setState({emailError: false,
                  passError: false,
                  badCredenrialsError: false,
                  loginErrorMessage: ""});

    // validate
    try {
      this.validateLoginForm();
    } catch (error) {
      this.setState({loginErrorMessage: error.message})
      return;
    }

    // send api request
    Session.sessionPost(this.state.email, this.state.pass)
    .then(async (resp) => {
      if (resp.status === 401) {
        this.setState({ badCredenrialsError: true});
        return;
      }

      if (resp.status !== 200) {
        this.setState({ loginErrorMessage: (await resp.json()).message });
        return;
      }

      this.props.dispatch(setLoggedInUser({ email: this.state.email }));
      this.setState(() => ({
        redirectToReferrer: true
      }));
    })
    .catch((e) => {
        console.log("Login error: " + e.stack)
        this.setState({ loginErrorMessage: e.stack });  
    })

  }

  validateLoginForm() {
    if (this.state.email === '') {
      this.setState({emailError: true})
      throw new Error(Lang.USER_CANT_BE_EMPTY);
    }

    if (this.state.pass === '') {
      this.setState({passError: true})
      throw new Error(Lang.PASSWORD_CANT_BE_EMPTY);
    }
  }

  handleFacebookLogin(response) {
    // clean messages state
    this.setState({emailError: false,
      passError: false,
      badCredenrialsError: false,
      loginErrorMessage: ""});


    // send api request
    Session.facebookSessionPost(response)
    .then(async (resp) => {
      if (resp.status !== 200) {
        console.log("Login failed. Unexpected response code: " + JSON.stringify(resp))
        return;
      }

      this.props.dispatch(setLoggedInUser({ email: response.email }));
      this.setState(() => ({
        redirectToReferrer: true
      }));
    })
    .catch((e) => {
        console.log("Login error: " + e.stack)
    })
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
            <div className="text-header">{Lang.LOGIN}</div>
            <FormControl>
              <InputLabel>E-mail</InputLabel>
              <Input
                id="email"
                value={this.state.email}
                error={this.state.emailError}
                className="input-text"
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    this.handleLogin();
                  }
                }}
              />
              
            </FormControl>

              <FormControl>
              <InputLabel>{Lang.PASSWORD}</InputLabel>
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
              style={{ marginTop: 20, marginBottom: 10, width: 280 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                this.handleLogin();
              }}
            >
              {Lang.SIGN_IN}
            </Button>
            <FacebookLogin
              textButton=" Zaloguj przez Facebook"
              disableMobileRedirect={true}
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              autoLoad={false}
              language="pl_PL"
              // scope="public_profile"
              fields="name,email"
              callback={response => {
                this.handleFacebookLogin(response)
              }}
              size="small"
              cssClass="facebook-button"
              icon="fa-facebook"
            />
            <div style={{ width: 280 }}>
              {
                (this.state.badCredenrialsError && (<h5 style={{ color: "red" }}>{Lang.BAD_CREDENTIALS}</h5>)) || 
                (this.state.loginErrorMessage && <h5 style={{ color: "red" }}>{Lang.LOGIN_ERROR}: {this.state.loginErrorMessage}</h5>)
              }
            </div>
          </div>
            <div className="screen-divider"></div>
              <div className="input-panel register-panel">
              <div className="text-header">Jesteś tu po raz pierwszy? Załóż konto</div>
              <div className="text-area">
                <p>Rejestrując się otrzymujesz:</p>
                <ul>
                  {`bezpłatne tworzenie własnych ogłoszeń
edycja własnych ogłoszeń\nmożliwość udostępniania własnych ogłoszeń na Facooku`.split('\n').map((line, i) => {
                      return(<li>{line}</li>)
                    })
                  }
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
                <InputLabel>{Lang.PASSWORD}</InputLabel>
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
                  <InputLabel>{Lang.REPEAT_PASSWORD}</InputLabel>
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
              <Button
                disabled={this.state.signUpButtonDisabled}
                style={{ marginTop: 20, width: 200 }}
                variant="outlined"
                color="primary"
                onClick={() => {
                  this.handleRegisterUser();
                }}
              >
                {Lang.SIGN_UP}
              </Button>
              {this.state.registError && <h5 style={{ color: "red" }}>Wystąpił błąd podczas rejestracji: {this.state.registError}</h5>}
              {this.state.registSuccessed && <h5 style={{ color: "green" }}>Rejestracja powiodła się. Sprawdź skrzynkę email.</h5>}
            </div>
        </div>
      </div>
    );
  }
}
const Login = withRouter(connect()(ConnectedLogin));

export default Login;
