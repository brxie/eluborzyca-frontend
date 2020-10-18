import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addItemInCart } from "../../Redux/Actions";
import Items from "../../Items";
import { getItem } from "./../../ApiProxy/Misc";
import Item from "../Item/Item";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Gallery from 'react-grid-gallery';


const minDescriptionLines = 8

class ConnectedDetails extends Component {
  constructor(props) {
    super(props);

    this.isCompMounted = false;

    this.state = {
      relatedItems: [],
      quantity: 1,
      item: null,
      itemLoading: false
    };
  }

  async fetchProductAndRelatedItems(productId) {
    this.setState({ itemLoading: true });

    let item = await getItem(productId);
    let relatedItems = await Items.searchItems({
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
        <div style={{
                    display: "block",
                    width: "50%",
                    // border: "1px solid #ddd",
                    }}>
                <Gallery
            images={this.state.item.imageUrls}
            maxRows={1}
            enableImageSelection={false}
            rowHeight={140}
            // the backdropClosesModal parais is a woraround for
            // https://github.com/benhowell/react-grid-gallery/issues/83
            backdropClosesModal={true} 
        />
        </div>

        <div style={{
          flexDirection: "column",
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          // border: "1px solid red"
        }}>
          <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                marginRight: 20
                // border: "1px solid red",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                }}
              >
                Price: {this.state.item.price} zł
              </div>
              {this.state.item.popular && (
                <div style={{ fontSize: 14, marginTop: 5, color: "#228B22"}}>
                  (Popular product)
                </div>
              )}

              <TextField
                type="number"
                value={this.state.quantity}
                style={{ marginTop: 20, marginBottom: 10, width: 70 }}
                label="Quantity"
                inputProps={{ min: 1, max: 10, step: 1 }}
                onChange={e => {
                  this.setState({ quantity: parseInt(e.target.value) });
                }}
              />
              <Button
                style={{ width: 170, marginTop: 5 }}
                color="primary"
                variant="outlined"
                onClick={() => {
                  this.props.dispatch(
                    addItemInCart({
                      ...this.state.item,
                      quantity: this.state.quantity
                    })
                  );
                }}
              >
                Add to Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
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
          Product Description
        </div>
        <div
          style={{
            fontSize: 13,
            overflow: "auto"
          }}
        >
          <TextField
            disabled={true}
            variant="outlined"
            value={this.state.item.description}
            onChange={e => {
              this.setState({ description: e.target.value });
            }}
            multiline
            rows={this.getNumberOfLines(this.state.item.description) < minDescriptionLines
                  ? minDescriptionLines
                  : this.getNumberOfLines(this.state.item.description) 
                 }
            style={{marginTop: 5, width: "100%"}}
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
          Related Items
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
