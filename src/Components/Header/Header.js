import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { showCartDlg, toggleMenu, logout } from "../../Redux/Actions";
import cartImage from "../../Images/logo2.png";
import Auth from "../../Auth";
import { getCategories } from "../../Data";
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const mapStateToProps = state => {
  var itemsCnt = 0;
  state.cartItems.forEach(item => itemsCnt += item.quantity);
  return {
    nrOfItemsInCard: itemsCnt,
    loggedInUser: state.loggedInUser
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
    return this.state.categories.map(x => {
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
              <MenuIcon size="medium" />
            </IconButton>

            <img src={cartImage} alt={"Logo"} style={{ marginLeft: 10 }} />
            <TextField
              label="Search products"
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  this.handleSearch();
                }
              }}
              style={{ marginLeft: 30, width: 250, marginBottom: 15 }}
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
              Search
            </Button>
          </div>
          <div className="right-part">
            {!this.props.loggedInUser ? (
              <Button
                variant="outlined"
                style={{ marginRight: 20 }}
                color="primary"
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Log in
              </Button>
            ) : (
              <Avatar
                onClick={event => {
                  this.setState({ anchorEl: event.currentTarget });
                }}
                style={{ backgroundColor: "#3f51b5", marginRight: 10 }}
              >
                <Person />
              </Avatar>
            )}
            <IconButton
              aria-label="Cart"
              onClick={() => {
                this.props.dispatch(showCartDlg(true));
              }}
            >
              <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.props.history.push("/order");
                }}
              >
                Checkout page
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Auth.sessionDestroy(() => {
                    this.props.dispatch(logout());
                    this.props.history.push("/");
                  });
                  this.setState({ anchorEl: null });
                }}
              >
                Logout
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
