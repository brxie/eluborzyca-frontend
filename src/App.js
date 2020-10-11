import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ProductList from "./Components/ProductList/ProductList";
import { Switch, Route } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import CartDialog from "./Components/CartDialog/CartDialog";
import Details from "./Components/Details/Details";
import Order from "./Components/Order/Order";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Components/Footer/Footer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "./Auth";
import { setLoggedInUser, LoadCartItems } from "./Redux/Actions";

class App extends Component {
  
  state = {}

  componentDidMount() {
    // load cart items
    this.props.dispatch(
      LoadCartItems()
    );

    // retrieve user session
    Auth.sessionGet((session, error) => {
      if (error) {
        return
      }
      this.props.dispatch(setLoggedInUser({ name: session.username }));
    }).then(() => this.setState({ ready: true }));
  }

  render() {
    if (!this.state.ready) {
      return (<div>Loading....</div>)
    }

    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Menu />
          <div className="content">
            <CartDialog />
            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/details/:id" component={Details} />
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/order" component={Order} />
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Page not found</div>
                )}
              />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect()(App));
