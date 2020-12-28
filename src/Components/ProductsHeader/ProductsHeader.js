import React, { Component } from "react";
import * as Lang from '../../LangPL';
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import PriceDialog from "../PriceDialog/PriceDialog";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withRouter } from "react-router-dom";

class ProductsHeader extends Component {
  state = {
    openPriceDialog: false
  };

  render() {
    let { parsedQueryStr, totalItemsCount, updateQueryStr } = this.props;
    const filterLabels = {category: "", village: "miejscowość: ", seller: "sprzedający: "}

    // Lot of values come from the query string.
    let usePriceFilter = parsedQueryStr.usePriceFilter === "true";
    let minPrice = parsedQueryStr.minPrice || 0;
    let maxPrice = parsedQueryStr.maxPrice || 10.00;
    let sortValue = parsedQueryStr.sortValue || "lh";
    let keyword = parsedQueryStr.term;
    let filter = parsedQueryStr.category || parsedQueryStr.village || parsedQueryStr.seller;
    var filterName = null
    Object.keys(filterLabels).forEach(k => {if (k in parsedQueryStr && !filterName) filterName = filterLabels[k] })

    let subtitle = (
      <div>
        <span style={{ fontSize: 12, color: "gray" }}>
          {Lang.FOUND + ": " +  totalItemsCount +
            (keyword ? " " + Lang.FOR + " " : "")}
        </span>
        {keyword && (
          <span
            style={{
              fontWeight: "bold",
              fontSize: 12,
              color: "gray"
            }}
          >
            {keyword}
          </span>
        )}
      </div>
    );

    return (
      <div>
        <div style={{ padding: 10, display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, fontSize: 24 }}>
            <div>{filter ? filterName + filter : Lang.POPULAR_PRODUCTS}</div>
            {subtitle}
          </div>

          
          <div style={{display: "inline-grid", padding: 15, marginRight: 20}} className="box-shadow">
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={usePriceFilter}
                  onChange={e => {
                    updateQueryStr({
                      usePriceFilter: e.target.checked,
                      page: 1
                    });
                  }}
                />
              }
              label={Lang.FILTER_BY_PRICE}
            />
            {usePriceFilter && (
              <Tooltip title={Lang.CLICK_CHANGE_RANGE} disableFocusListener>
                <Button
                  variant="outlined"
                  style={{ marginRight: 20 }}
                  onClick={() => {
                    this.setState({
                      openPriceDialog: true
                    });
                  }}
                >
                  {`${parseFloat(minPrice).toFixed(2)}${Lang.CURRENCY}-${parseFloat(maxPrice).toFixed(2)}${Lang.CURRENCY}`}
                </Button>
              </Tooltip>
            )}
            <Select
              value={sortValue}
              onChange={e => {
                updateQueryStr({ sortValue: e.target.value });
              }}
            >
              <MenuItem value={"lh"}>{Lang.SORT_BY_PRICE_FROM_LOWER}</MenuItem>
              <MenuItem value={"hl"}>{Lang.SORT_BY_PRICE_FROM_HIGHEST}</MenuItem>
            </Select>
          </div>
        </div>

        {/* This is dialog which opens up for setting price filter */}
        <PriceDialog
          open={this.state.openPriceDialog}
          min={minPrice}
          max={maxPrice}
          onSave={(min, max) => {
            this.setState({ openPriceDialog: false });
            updateQueryStr({ minPrice: min, maxPrice: max, page: 1 });
          }}
          onClose={() =>
            this.setState({
              openPriceDialog: false
            })
          }
        />
      </div>
    );
  }
}

export default withRouter(ProductsHeader);
