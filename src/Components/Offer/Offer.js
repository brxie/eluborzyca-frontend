import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getItems, deleteItem } from "./../../Data";


const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
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


  getItemUsingUsername(username) {
    return new Promise( (resolve, reject) => {
      getItems().then( items => {
        let res = items.filter(x => x.owner === username);
        resolve(res);
      });
    });
  }

  async fetchData() {
    this.setState({ loading: true });

    let userItems = await this.getItemUsingUsername(this.props.loggedInUser.name);
    
    this.setState({
      items: userItems,
      loading: false,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  onDelete(itemId) {
    deleteItem(itemId).then(() => {
      this.fetchData();
    });
  }

  render() {    
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    return (
      <div style={{ padding: 10}}>
        <div style={{ fontSize: 24, marginTop: 10 }}>Moje oferty</div>
        <div style={{width: "75%"}}>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell>Mazwa</TableCell>
                <TableCell>Cena</TableCell>
                <TableCell>Kategoria</TableCell>
                <TableCell>Popularne</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.items.map((row, index) => {
                const editId = `offers-table-edit-${index}`;
                const deleteId = `offers-table-delete-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                  >  
                    <TableCell component="th" scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right" style={{ width: "10px"}}>{row.popular.toString()}</TableCell>
                    <TableCell align="right" style={{ width: "10px"}}>
                      <div  style={{ display: "inline-flex"}}>
                        <IconButton >
                          <EditIcon
                            aria-label={editId}
                          />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon
                            aria-label={deleteId}
                            onClick={(e) => {
                              console.log("DELETE EVENT" + e.target.ariaLabel)
                              this.onDelete(row.id)
                            }}
                          />
                        </IconButton>
                      </div>
                    </TableCell>
                    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div style={{paddingTop: "20px"}}>
          Dodaj ofertę
        <IconButton>
          <AddCircleIcon  color="primary" size="medium" style={{ width: 30, height: 30}} />
        </IconButton>
        </div>

        
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
