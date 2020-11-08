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
import AvabilitySlider from "../Common/AvabilitySlider";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getItems, deleteItem, updateItem } from "../../Model/Items";
import AlertDialog from "../Common/AlertDialog";
import { quantitySliderLabels, quantitySliderColors } from "../../Constants";


const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  };
};

// This component shows the items user checked out from the cart.
class ConnectedOffers extends Component {
  state = {
    loading: true,
    items: [],
    deleteDialogOpen: false,
    deletingItemId: 0
  };
  
  
  getItemUsingUsername(email) {
    return new Promise( (resolve, reject) => {
      getItems(true).then( items => {
        let res = items.filter(x => x.owner === email);
        resolve(res);
      });
    });
  }

  async fetchData() {

    let userItems = await this.getItemUsingUsername(this.props.loggedInUser.email);
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
    

    updateItem(items[itemIdx].id, {active: e.target.checked}).then(()=> {
      this.setState({ items: items});
    }).catch(e => {
      console.log("Offer edit error: " + JSON.stringify(e))
      this.setState({createItemError: e.message})
    })
  }

  handleAvabilitySliderChange(val, itemIdx) {
    if (this.state.items[itemIdx].availability === val) return
    let items = this.state.items
    items[itemIdx].availability = val

    updateItem(items[itemIdx].id, {availability: val}).then(()=> {
      this.setState({ items: items});
    }).catch(e => {
      console.log("Offer edit error: " + JSON.stringify(e))
      this.setState({createItemError: e.message})
    })
  }

  render() {    
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    return (
      <div style={{ padding: 10}}>
        <div style={{ fontSize: 24, marginTop: 20 }}>Moje oferty</div>
        <div style={{width: "98%"}}>
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
                <TableCell>Jednostka</TableCell>
                <TableCell>Dostepnosc</TableCell>
                <TableCell>Kategoria</TableCell>
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
                    key={index}
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
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.unit}</TableCell>
                    <TableCell>
                      <div style={{width: "80%"}}>
                        <AvabilitySlider
                          disabled={!this.state.items[index].active}
                          orientation="horizontal"
                          valueLabelDisplay="off"
                          min={0}
                          max={quantitySliderLabels.length-1}
                          step={1}
                          // defaultValue={quantitySliderLabels.length-2}
                          value={this.state.items[index].availability}
                          onChange={(e, v) => {
                            this.handleAvabilitySliderChange(v, index)
                          }}
                          style={{paddingTop: 15, color: this.state.items[index].active
                            ? quantitySliderColors[this.state.items[index].availability]
                            : "gray"
                          }}
                          track={false}
                          marks={[{value: 0, label: quantitySliderLabels[0]},
                                  {value: quantitySliderLabels.length-1,
                                  label: quantitySliderLabels[quantitySliderLabels.length-1]}]}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell style={{ width: "10px"}}>
                      <div  style={{ display: "inline-flex"}}>
                        <IconButton
                          onClick={() => {
                            this.props.history.push("/edit-offer", {offerId: row.id});
                          }}
                        >
                          <EditIcon
                            aria-label={editId}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            this.handleDeleteClickOpen(row.id)
                          }}
                        >
                          <DeleteIcon
                            aria-label={deleteId}
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
        <IconButton
          onClick={() => {
            this.props.history.push("/new-offer");
          }}
        >
          <AddCircleIcon 
            color="primary"
            size="medium"
            style={{ width: 30, height: 30}}
          />
        </IconButton>
        </div>
      </div>
    );
  }
}
const Offers = withRouter(connect(mapStateToProps)(ConnectedOffers));

export default Offers;
