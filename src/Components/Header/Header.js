import React, { Component } from "react";
import Cookies from 'universal-cookie';
import * as Lang from '../../LangPL';
import "./Header.css";
import { IconButton, TextField, Button, Avatar, Menu, Divider,
         MenuItem, Select, AppBar, Toolbar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toggleMenu, logout } from "../../Redux/Actions";
import logoImage from "../../Images/logo.png";
import { getCategories } from "../../Model/Categories";
import Person from "@material-ui/icons/PersonOutline";
import { allCategoriesCategory } from "../../Constants";
import Session from "./../../ApiClient/Session";


const SESSION_COOKIE_KEY = "SESSION_ID"
const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser,
    showMenu: state.showMenu
  };
};

class ConnectedHeader extends Component {
  state = {
    searchTerm: "",
    anchorEl: null,
    categoryFilterValue: "",
    categories: []
  };

  handleSearch() {
    this.props.history.push(
      "/?category=" +
        this.state.categoryFilterValue +
        "&term=" +
        this.state.searchTerm
    );
  }

  categoryOptions() {
    let cat = JSON.parse(JSON.stringify(this.state.categories))
    cat.unshift(allCategoriesCategory)
    return cat.map(x => {
      return (
      <MenuItem key={x.name} value={x.name}>
        {x.name}
      </MenuItem>
      );
    });
  }

  componentDidMount() {
    getCategories().then(categories => {
      this.setState( {
        categories: categories,
        categoryFilterValue: (categories.length > 0) ? categories[0].name : ""
      });
      
    }).catch(e => {
      console.log("Header get categories error: " + JSON.stringify(e))
      this.setState( {
        categories: [],
        categoryFilterValue: ""
      });
    })
  }

  render() {

    if (!this.state || !this.state.categories) {
      return (<div></div>)
    }

    let { anchorEl } = this.state;

    return (
      <AppBar
        position="static"
        style={{ backgroundColor: "#FAFAFB", padding: 10 }}
      >
        <Toolbar>
          <div className="left-part">
            <IconButton
              onClick={() => {
                this.props.dispatch(toggleMenu());
              }}
            >
              {this.props.showMenu && <MenuOpenIcon size="medium" />}
              {!this.props.showMenu && <MenuIcon size="medium" />}
            </IconButton>

            <NavLink to="/">
              <img src={logoImage} alt={"Logo"} style={{opacity: 0.8,  width: 64, height: 64, marginLeft: 30 }} />
            </NavLink>
            <TextField
              label={Lang.SEARCH_PRODUCTS}
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  this.handleSearch();
                }
              }}
              style={{ marginLeft: 50, width: 250, marginBottom: 15 }}
            />

            <Select
              style={{ maxWidth: 200, marginLeft: 20 }}
              value={this.state.categoryFilterValue}
              MenuProps={{
                style: {
                  maxHeight: 500
                }
              }}
              onChange={e => {
                this.setState({ categoryFilterValue: e.target.value });
              }}
            >
              {this.categoryOptions()}
            </Select>

 
            <Button
              style={{ marginLeft: 20 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                this.handleSearch();
              }}
            >
              {" "}
              {Lang.SEARCH}
            </Button>
          </div>
          <div className="right-part">
            {!this.props.loggedInUser ? (
              <Button
                variant="text"
                style={{ marginRight: 20 }}
                color="primary"
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Zaloguj
              </Button>
            ) : (
            
              <IconButton
                variant="outlined"
                onClick={event => {
                  this.setState({ anchorEl: event.currentTarget });
                }}
                style={{ fontSize: '17px', backgroundColor: 'transparent' }}
              >
                Moje Konto
                <Avatar
                  style={{ backgroundColor: "#3f51b5", marginLeft: 10 }}
                >
                  <Person />
                </Avatar>
              </IconButton>
            )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 10,
                paddingBottom: 15,
                minWidth: 150,
                color: "rgba(0, 0, 0, 0.54)",
                fontWeight: "bold"}}>
                  <div style={{marginRight: 5, marginLeft: 5, fontSize: "15px"}}>
                    {this.props.loggedInUser ? this.props.loggedInUser.email : ""}
                  </div>
                </div>
              
              
              <Divider />
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.props.history.push("/offers");
                }}
              >
                {Lang.MY_OFFERS}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.props.history.push("/account-settings");
                  this.setState({ anchorEl: null });
                }}
              >
                {Lang.SETTINGS}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Session.sessionDelete()
                  .then(() => {
                    this.props.dispatch(logout());
                    this.props.history.push("/");
                  })
                  .catch(e => {
                    console.log(e.stack)
                  })
                  new Cookies().remove(SESSION_COOKIE_KEY, { path: '/api' });
                  this.setState({ anchorEl: null });
                }}
              >
                {Lang.LOGOUT}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;
