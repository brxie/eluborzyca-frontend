import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Api from "../../Api";
import { setCheckedOutItems } from "../../Redux/Actions";

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
  };
};

// This component shows the items user checked out from the cart.
class ConnectedOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      items: []
    };
  }

  async fetchData() {
    this.setState({ loading: true });

    // Parse the query string
    let results = await Api.getItemUsingUsername("admin");
    
    this.setState({
      items: results,
      loading: false,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {    
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>Moje oferty</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mazwa</TableCell>
              <TableCell>Cena</TableCell>
              <TableCell>Kategoria</TableCell>
              <TableCell>Popularne</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.items.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.popular.toString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        
        <Button
          color="primary"
          variant="outlined"
          disabled={true}
          onClick={() => {
            console.log("purchased");
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Purchase
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          disabled={true}
          onClick={() => {
            this.props.dispatch(setCheckedOutItems([]));
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Discard
        </Button>
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
