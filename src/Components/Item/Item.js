import React, { Component } from "react";
import "./Item.css";
import * as Lang from '../../LangPL';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import { CardActionArea, Typography, Tooltip } from "@material-ui/core";
import { quantitySliderLabels, quantitySliderColors } from "../../Constants";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LabelIcon from '@material-ui/icons/Label';
import FaceIcon from '@material-ui/icons/Face';
import LocationIcon from '@material-ui/icons/LocationOn';
import { NavLink } from "react-router-dom";
import {
  WhatsappShareButton,
  FacebookShareButton,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
} from "react-share";


const FacebookHashtags = ["#ekologiczne", "#bio", "#eco", "#naturalne", "#nazdrowie", "#wspieramlokalnie", "#produktlokalny"]

class ConnectedItem extends Component {

  getNavlinkItemRow(url, title) {
    return(
      <NavLink
        to={url}
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
        <div className="actionItemRow">{title}</div>
      </NavLink>
    )
  }



  render() {
    return (
      <Card
        style={{ width: 200, height: 300, margin: 10, display: "inline-block" }}
      >
        <CardActionArea
          onClick={() => {
            this.props.history.push("/details/" + this.props.item.id);
          }}
        >
          <CardMedia
            style={{ height: 120 }}
            image={this.props.item.images && this.props.item.images.length ? this.props.item.images[0].thumbnail:""}
          />
          <CardContent style={{ height: 50 }}>
            <Tooltip title={this.props.item.name}>
              <div
                style={{
                  marginLeft: 5,
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                  {this.props.item.name}
              </div>
            </Tooltip>
            <div style={{ margin: 5, display: "flex", alignItems: "center" }}>
              Cena:<Typography style={{fontSize: 13, fontWeight: "bold", color: "green", marginLeft: 5}}>
                {parseFloat(this.props.item.price/100).toFixed(2)} {Lang.CURRENCY}/{this.props.item.unit}
                </Typography>
            </div>
            <div style={{ margin: 5, display: "flex", alignItems: "center" }}>Dostępność:
              <Typography 
                style={{fontSize: 13,
                        fontWeight: "bold",
                        color: quantitySliderColors[this.props.item.availability-1],
                        marginLeft: 5}}
              >
                {quantitySliderLabels[this.props.item.availability-1]}
              </Typography>
            
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions >
        <div style={{display:"inline"}}>
          <div className="item-action-bar-container">
            <Tooltip title={Lang.SELLER}>
              <FaceIcon/>
            </Tooltip>
            {this.getNavlinkItemRow("/?seller="+this.props.item.firstLastName, this.props.item.firstLastName)}
          </div>
          <div className="item-action-bar-container">
            <Tooltip title={Lang.VILLAGE}>
              <LocationIcon/>
            </Tooltip>
            {this.getNavlinkItemRow("/?village="+this.props.item.village, this.props.item.village)}
          </div>
          <div className="item-action-bar-container">
            <Tooltip title={Lang.CATEGORY}>
              <LabelIcon/>
            </Tooltip>
            {this.getNavlinkItemRow("/?category="+this.props.item.category, this.props.item.category)}
          </div>


          <div style={{marginLeft:"135px", marginTop: "-25px", display: "flex"}}>
          <WhatsappShareButton
              url={process.env.REACT_APP_PUBLIC_URL + "/api/v1/item/open-graph/" + this.props.item.id}
            >
              <WhatsappIcon size={24} round />
            </WhatsappShareButton>

            <FacebookShareButton
              url={process.env.REACT_APP_PUBLIC_URL + "/api/v1/item/open-graph/" + this.props.item.id}
              hashtag={FacebookHashtags[Math.floor(Math.random() * FacebookHashtags.length)]}
            >
              <FacebookIcon size={24} round />
            </FacebookShareButton>
          </div>
        </div>
        </CardActions>
        
        
      </Card>
    );
  }
}

export default withRouter(connect()(ConnectedItem));
