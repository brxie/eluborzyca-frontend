import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ProductList from "./Components/ProductList/ProductList";
import * as Lang from './LangPL';
import { Switch, Route } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import CartDialog from "./Components/CartDialog/CartDialog";
import Details from "./Components/Details/Details";
import Offer from "./Components/Offers/Offers";
import NewOffer from "./Components/Offer/NewOffer";
import EditOffer from "./Components/Offer/EditOffer";
import Login from "./Components/Login/Login";
import FAQ from "./Components/FAQ/FAQ";
import Contact from "./Components/Contact/Contact";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import CookiePolicy from "./Components/CookiePolicy/CookiePolicy";
import AccountSettings from "./Components/AccountSettings/AccountSettings";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Components/Footer/Footer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Session from "./ApiClient/Session";
import { setLoggedInUser, LoadCartItems } from "./Redux/Actions";
import CookieBanner from 'react-cookie-banner';

class App extends Component {
  
  state = {
    loading: true
  };

  componentDidMount() {
    // load cart items
    this.props.dispatch(
      LoadCartItems()
    );

    // retrieve user session
    Session.sessionGet()
    .then(async (resp) => {
      if (resp.status === 200) {
        let user = await resp.json()
        this.props.dispatch(setLoggedInUser({ email: user.email }));
      }
      this.setState({ loading: false })
    })
    .catch(e => {
      console.log("Session get failed: " + e.stack)
      return
    })
  }

  render() {
    if (this.state.loading) {
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
              <Route path="/faq" component={FAQ} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/cookie-policy" component={CookiePolicy} />
              <ProtectedRoute path="/account-settings" component={AccountSettings} />
              <ProtectedRoute path="/offers" component={Offer} />
              <ProtectedRoute path="/new-offer" component={NewOffer} />
              <ProtectedRoute path="/edit-offer" component={EditOffer} />
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Page not found</div>
                )}
              />
            </Switch>
          </div>
        </div>
        <Footer />
        <CookieBanner
          message={Lang.COOKIE_MESSAGE}
          buttonMessage="OK"
          cookie="cookie-consent"
          dismissOnScroll={false}
        />
      </div>
    );
  }
}

export default withRouter(connect()(App));
