import React, { Component } from "react";
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
    let maxPrice = parsedQueryStr.maxPrice || 10;
    let sortValue = parsedQueryStr.sortValue || "lh";
    let keyword = parsedQueryStr.term;
    let filter = parsedQueryStr.category || parsedQueryStr.village || parsedQueryStr.seller;
    var filterName = null
    Object.keys(filterLabels).forEach(k => {if (k in parsedQueryStr && !filterName) filterName = filterLabels[k] })

    let subtitle = (
      <div>
        <span style={{ fontSize: 12, color: "gray" }}>
          {totalItemsCount +
            " result" +
            (totalItemsCount === 1 ? " " : "s ") +
            (keyword ? "for " : "")}
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
            <div>{filter ? filterName + filter : "Popular Products"}</div>
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
              label="Filter by price"
            />
            {usePriceFilter && (
              <Tooltip title="Click to change range" disableFocusListener>
                <Button
                  variant="outlined"
                  style={{ marginRight: 20 }}
                  onClick={() => {
                    this.setState({
                      openPriceDialog: true
                    });
                  }}
                >
                  {`${minPrice}zł-${maxPrice}zł`}
                </Button>
              </Tooltip>
            )}
            <Select
              value={sortValue}
              onChange={e => {
                updateQueryStr({ sortValue: e.target.value });
              }}
            >
              <MenuItem value={"lh"}>Sort by price: low to high</MenuItem>
              <MenuItem value={"hl"}>Sort by price: high to low</MenuItem>
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
