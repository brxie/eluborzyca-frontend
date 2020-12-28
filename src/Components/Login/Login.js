import React, { Component } from "react";
import "./Login.css";
import * as Lang from '../../LangPL';
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import User from "../../ApiClient/User";
import Session from "../../ApiClient/Session";
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
    email: "",
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
    User.userPost({email: this.state.registUserEmail,
                   password: this.state.registPass
    }).then(async resp => {
      if (resp.status !== 201) {
        this.setState({registError:  (await resp.json()).message})
        return
      }
      this.setState({registSuccessed: true})
    }).catch((e) =>{
      this.setState({registError: e.stack})
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

    if (this.state.rulesCheckbox === false) {
      this.setState({rulesCheckboxError: true})
      throw new Error(Lang.NEED_ACCEPT_RULES);
    }
  }

  handleLogin() {
    // clean messages state
    this.setState({emailError: false,
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
    Session.sessionPost(this.state.email, this.state.pass)
    .then(async (resp) => {
      if (resp.status === 401) {
        this.setState({ wrongCred: true });
        return;
      }
      this.props.dispatch(setLoggedInUser({ email: this.state.email }));
      this.setState(() => ({
        redirectToReferrer: true
      }));
    })
    .catch((e) => {
        console.log("Login error: " + e.stack)
        this.setState({ loginError: e.stack });  
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
              style={{ marginTop: 20, width: 200 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                this.handleLogin();
              }}
            >
              {Lang.SIGN_IN}
            </Button>
            <div style={{ width: 280 }}>
              {
                (this.state.wrongCred && (<h5 style={{ color: "red" }}>{Lang.WRONG_EMAIL_PASSWORD}</h5>)) || 
                (this.state.loginError && <h5 style={{ color: "red" }}>{Lang.LOGIN_FAILED}: {this.state.loginError}</h5>)
              }
            </div>
          </div>
            <div className="screen-divider"></div>
              <div className="input-panel register-panel">
              <div className="text-header">{Lang.FIRST_TIME_HERE}</div>
              <div className="text-area">
                <p>{Lang.REGISTER_DESC_TITLE}:</p>
                <ul>
                  {Lang.REGISTER_DESC_BODY.split('\n').map((line, i) => {
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
              <FormControlLabel
                control={
                  <Checkbox
                        color="primary"
                        onChange={(e) => {
                          this.setState({rulesCheckbox: e.target.checked});
                        }}
                        checked={this.state.rulesCheckbox}
                        style={ {color: this.state.rulesCheckboxError ? "red" : null }}
                    />
                }
                label={
                  <Typography  style={{fontSize: 13}}>
                     {Lang.IVE_READ_POLICY}
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
                {Lang.SIGN_UP}
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
