import React, { Component } from "react";
import * as Lang from '../../LangPL';
import { NavLink } from "react-router-dom";
import "./Footer.css";
import ReactFBLike from 'react-fb-like';

class Footer extends Component {
  render() {
    return (
      <div
        style={{
          boxSizing: "border-box",
          padding: 10,
          borderTop: "1px solid lightgray",
          height: 100,
          backgroundColor: "#f1f1f1",
          justifyContent: "space-around",
          display: "flex"
        }}
      >
        <div>
          <div
            style={{ color: "#504F5A", fontWeight: "bold", marginBottom: 10 }}
          >
            {Lang.HELP}
          </div>
          <NavLink
            to={"/faq"}
            exact
            style={{
              textDecoration: "none",
              color: "rgb(32, 32, 34)"
            }}
            activeStyle={{
              color: "#4282ad",
              textDecoration: "underline"
            }}
          >
            <div className="footerItem">FAQ</div>
          </NavLink>
          <NavLink
            to={"/contact"}
            exact
            style={{
              textDecoration: "none",
              color: "rgb(32, 32, 34)"
            }}
            activeStyle={{
              color: "#4282ad",
              textDecoration: "underline"
            }}
          >
            <div className="footerItem">{Lang.CONTACT}</div>
          </NavLink>
        </div>
        <div>
          <div
            style={{ color: "#504F5A", fontWeight: "bold", marginBottom: 10 }}
          >
            {Lang.INFO}
          </div>
          <NavLink
            to={"/privacy-policy"}
            exact
            style={{
              textDecoration: "none",
              color: "rgb(32, 32, 34)"
            }}
            activeStyle={{
              color: "#4282ad",
              textDecoration: "underline"
            }}
          >
            <div className="footerItem">{Lang.PRIVACY_POLICY}</div>
          </NavLink>
          <NavLink
            to={"/cookie-policy"}
            exact
            style={{
              textDecoration: "none",
              color: "rgb(32, 32, 34)"
            }}
            activeStyle={{
              color: "#4282ad",
              textDecoration: "underline"
            }}
          >
            <div className="footerItem">{Lang.COOKIE_POLICY}</div>
          </NavLink>
        </div>
        <div>
          <div
            style={{ color: "#504F5A", fontWeight: "bold", marginBottom: 10 }}
          >
            Social Media
          </div>
          <div>
            <ReactFBLike
              language="pl_PL"
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              layout="button_count"
              href={process.env.REACT_APP_PUBLIC_URL}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
