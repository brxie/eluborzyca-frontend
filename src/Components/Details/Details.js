import React, { Component } from "react";
import "./Details.css";
import * as Lang from '../../LangPL';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { searchItems } from "../../Model/Items";
import { getItem } from "./../../Model/Items";
import Item from "../Item/Item";
import { connect } from "react-redux";
import Gallery from 'react-grid-gallery';
import CustomizedInput from './CustomizedInput'
import { quantitySliderLabels, quantitySliderColors } from "../../Constants";


const minDescriptionLines = 8

class ConnectedDetails extends Component {
  constructor(props) {
    super(props);

    this.isCompMounted = false;

    this.state = {
      relatedItems: [],
      quantity: 1,
      item: null,
      itemLoading: false,
      phoneButtonLabel: Lang.CALL
    };
  }

  async fetchProductAndRelatedItems(productId) {
    this.setState({ itemLoading: true });

    let item = await getItem(productId);
    let relatedItems = await searchItems({
      category: item.category
    });

    // Make sure this component is still mounted before we set state..
    if (this.isCompMounted) {
      this.setState({
        item,
        quantity: 1,
        relatedItems: relatedItems.data.filter(x => x.id !== item.id),
        itemLoading: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If ID of product changed in URL, refetch details for that product
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchProductAndRelatedItems(this.props.match.params.id);
    }
  }

  componentDidMount() {
    this.isCompMounted = true;
    this.fetchProductAndRelatedItems(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }


  getNumberOfLines(text) {
    return text.split(/\r\n|\r|\n/).length
  }

  render() {
    if (this.state.itemLoading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.item) {
      return null;
    }

    return (
      <div style={{ padding: 10 }}>
        <div
          style={{
            marginBottom: 20,
            marginTop: 10,
            fontSize: 22
          }}
        >
          {this.state.item.name}
        </div>
        <div style={{ display: "flex" }}>
        { this.state.item.images && this.state.item.images.length &&
          <div style={{
                    display: "block",
                    width: "50%",
                    // border: "1px solid #ddd",
                    }}>
                <Gallery
            images={this.state.item.images}
            maxRows={1}
            enableImageSelection={false}
            rowHeight={140}
            // the backdropClosesModal parais is a woraround for
            // https://github.com/benhowell/react-grid-gallery/issues/83
            backdropClosesModal={true} 
          />
          </div>
        }

        <div style={{
          flexDirection: "column",
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          // border: "1px solid red",
        }}>
          <div className="item-contact-container">
            <div className="item-contact-entry">{Lang.PRICE}: {parseFloat(this.state.item.price/100).toFixed(2)} {Lang.CURRENCY}</div>
            <div className="item-contact-entry" style={{display: "flex", marginTop: "-5px", alignItems: "center"}}>
              {Lang.AVAILABILITY}: 
              <Typography 
                style={{fontWeight: "bold",
                        color: quantitySliderColors[this.state.item.availability-1],
                        marginLeft: 5}}
              >
                {quantitySliderLabels[this.state.item.availability-1]}
              </Typography>
            </div>
            <div className="item-contact-entry">{Lang.SELLER}: {this.state.item.firstLastName}</div>
            <div className="item-contact-entry" style={{marginBottom: "-2px"}}>{Lang.ADDRESS}:</div>
            <div className="item-contact-entry" style={{marginBottom: "-2px"}}>{this.state.item.village} {this.state.item.street ? "":this.state.item.homeNumber}</div>
            <div className="item-contact-entry" style={{marginBottom: "-2px"}}>{this.state.item.street ? "ul. ": ""} {this.state.item.street} {this.state.item.street ? this.state.item.homeNumber: ""}</div>
            <div className="item-contact-entry">{this.state.item.addressNotes}</div>
            <Divider/>
            <Button
              style={{ width: 170, marginTop: 15 }}
              color="primary"
              variant="outlined"
              onClick={() => {
                this.setState({ phoneButtonLabel: this.state.item.phone });
              }}
              >
                {this.state.phoneButtonLabel}
              </Button>
            </div>
          </div>
        </div>  

        {/* Product description */}
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 22
          }}
        >
          {Lang.PRODUCT_DESCRIPTION}
        </div>
        <div
          className="box-shadow"
          style={{
            fontSize: 13,
            overflow: "auto"
          }}
        >
          <CustomizedInput
            disabled={true}
            variant="outlined"
            value={this.state.item.description}
            multiline
            rows={this.getNumberOfLines(this.state.item.description) < minDescriptionLines
                  ? minDescriptionLines
                  : this.getNumberOfLines(this.state.item.description) + 3
                 }
            style={{marginTop: 5, width: "98%"}}
          />
        </div>
        {/* Relateditems */}
        <div
          style={{
            marginTop: 100,
            marginBottom: 10,
            fontSize: 22
          }}
        >
          {Lang.RELATED_ITEMS}
        </div>
        {this.state.relatedItems.slice(0, 3).map(x => {
          return <Item key={x.id} item={x} />;
        })}
      </div>
    );
  }
}

let Details = connect()(ConnectedDetails);
export default Details;
