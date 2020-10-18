import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getItems, deleteItem } from "./../../Data";
import AlertDialog from "./../Common/AlertDialog";


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
      items: [],
      deleteDialogOpen: false,
      deletingItemId: 0
    };
  }


  getItemUsingUsername(username) {
    return new Promise( (resolve, reject) => {
      getItems(true).then( items => {
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

  handleDeleteClickOpen = (itemId) => {
    this.setState({ deleteDialogOpen: true, deletingItemId: itemId });
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false, deletingItemId: 0 });
  };

  handleDeleteAgree = () => {
    this.setState({ items: this.state.items.filter(x => x.id !== this.state.deletingItemId)});
    deleteItem(this.state.deletingItemId);
    this.handleDeleteDialogClose();
  };

  handleDeleteDisagree = () => {
    this.handleDeleteDialogClose();
  };

  handleActiveSwitchChange(e, itemIdx) {
    let items = this.state.items
    items[itemIdx].active = e.target.checked
    this.setState({ items: items});
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
                <TableCell>
                  <div style={{display: "flex", alignItems: "center"}}>
                    Aktywne
                    <Tooltip title="Jeśli chcesz aby ogłoszenie było niewidoczne dla kupujących, dezaktywuj je.
                    W każdej chwile możesz je włączyć ponownie.">
                      <InfoOutlinedIcon  color="disabled" size="medium" style={{ width: 18, height: 18, paddingBottom: 10}} />
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>
                  Nazwa</TableCell>
                <TableCell>Cena</TableCell>
                <TableCell>Kategoria</TableCell>
                <TableCell >
                  <div style={{display: "flex", alignItems: "center"}}>
                    Popularne
                    <Tooltip title="Tylko administrator może nadać ten status.">
                      <InfoOutlinedIcon  color="disabled" size="medium" style={{ width: 18, height: 18, paddingBottom: 10}} />
                    </Tooltip>
                  </div>
                </TableCell>
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
                    <TableCell>
                      <Switch
                        checked={row.active}
                        onChange={(e) => {
                          this.handleActiveSwitchChange(e, index)
                        }}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </TableCell>
                    <TableCell component="th" align="center" scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell style={{ width: "10px"}}>
                      <StarIcon color={row.popular ? 'primary' : 'disabled'}/>
                    </TableCell>
                    <TableCell style={{ width: "10px"}}>
                      <div  style={{ display: "inline-flex"}}>
                        <IconButton >
                          <EditIcon
                            aria-label={editId}
                          />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon
                            aria-label={deleteId}
                            onClick={() => {
                              this.handleDeleteClickOpen(row.id)
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
          {AlertDialog("Usunięcie oferty",
                       `Usunięcie oferty sprawi, że nie będzie ona więcej dostępna.
                        Ta operacja jest nieodwracalna. Czy chcesz kontynuować?`,
                       this.state.deleteDialogOpen,
                       this.handleDeleteDialogClose,
                       this.handleDeleteAgree,
                       this.handleDeleteDisagree)}
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
