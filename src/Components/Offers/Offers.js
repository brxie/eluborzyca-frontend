import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Lang from '../../LangPL';
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AvailabilitySlider from "../Common/AvailabilitySlider";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getItems, deleteItem, updateItem, activateItem } from "../../Model/Items";
import AlertDialog from "../Common/AlertDialog";
import { quantitySliderLabels, quantitySliderColors } from "../../Constants";
import Session from "./../../ApiClient/Session";
import { logout } from "../../Redux/Actions";
import { NavLink } from "react-router-dom";


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
    this.checkSession();
    this.setState({ deleteDialogOpen: false})
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

    
    activateItem(items[itemIdx].id, {"active": e.target.checked}).then(()=> {
      this.setState({ items: items});
    }).catch(e => {
      console.log("Offer edit error: " + JSON.stringify(e))
      this.setState({createItemError: e.message})
    })
  }

  AandleavailabilitySliderChange(val, itemIdx) {
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

  async checkSession() {
    try {
      let session = await Session.sessionGet();
      if (session.status === 401) {
        throw new Error(session.statusText);
      }
    } catch {
      this.props.dispatch(logout());
    } 
  }


  render() {    
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    return (
      <div style={{ padding: 10}}>
        <div style={{ fontSize: 24, marginTop: 20 }}>{Lang.MY_OFFERS}</div>
        <div style={{width: "98%"}}>

        <div style={{margin: 10, marginTop: 40,  width: "80%", alignContent: "center", display: this.state.items.length ? "none" : ""}}>
          Autualnie nie posiadasz żadnych produktów :( 
        </div>

          <div style={{display: this.state.items.length ? "" : "none"}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <div style={{display: "flex", alignItems: "center"}}>
                      {Lang.ACTIVE}
                      <Tooltip title={Lang.DEACTIVATE_OFFER_TEXT}>
                        <InfoOutlinedIcon  color="disabled" size="medium" style={{ width: 18, height: 18, paddingBottom: 10}} />
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell>{Lang.NAME}</TableCell>
                  <TableCell>Data utworzenia</TableCell>
                  <TableCell>{Lang.PRICE}</TableCell>
                  <TableCell>{Lang.UNIT}</TableCell>
                  <TableCell>{Lang.AVAILABILITY}</TableCell>
                  <TableCell>{Lang.CATEGORY}</TableCell>
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
                      <TableCell>
                        <NavLink to={"/details/" + row.id}  
                          exact
                          style={{
                            textDecoration: "none",
                            color: "rgb(32, 32, 34)"
                          }}
                          activeStyle={{
                            color: "#4282ad",
                            textDecoration: "underline"
                          }}>
                            {row.name}
                        </NavLink>
                      </TableCell>
                      <TableCell>{new Date(Date.parse(row.created)).toLocaleString("pl-PL")}</TableCell>
                      <TableCell>{(row.price/100).toFixed(2)+Lang.CURRENCY}</TableCell>
                      <TableCell>{row.unit}</TableCell>
                      <TableCell>
                        <div style={{width: "80%"}}>
                          <AvailabilitySlider
                            disabled={!this.state.items[index].active}
                            orientation="horizontal"
                            valueLabelDisplay="off"
                            min={1}
                            max={quantitySliderLabels.length}
                            step={1}
                            value={this.state.items[index].availability}
                            onChange={(e, v) => {
                              this.AandleavailabilitySliderChange(v, index)
                            }}
                            style={{paddingTop: 15, color: this.state.items[index].active
                              ? quantitySliderColors[this.state.items[index].availability-1]
                              : "gray"
                            }}
                            track={false}
                            marks={[{value: 1, label: quantitySliderLabels[0]},
                                    {value: quantitySliderLabels.length,
                                    label: quantitySliderLabels[quantitySliderLabels.length-1]}]}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <NavLink to={"/?category="+row.category}  
                          exact
                          style={{
                            textDecoration: "none",
                            color: "rgb(32, 32, 34)"
                          }}
                          activeStyle={{
                            color: "#4282ad",
                            textDecoration: "underline"
                          }}>
                            {row.category}
                        </NavLink>
                      </TableCell>
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
          </div>
          {AlertDialog(Lang.ALERT_DIALOG_DELETE_OFFER_TITLE,
                       Lang.ALERT_DIALOG_DELETE_OFFER_TEXT,
                       Lang.CANCEL,
                       Lang.ACCEPT,
                       this.state.deleteDialogOpen,
                       this.handleDeleteDialogClose,
                       this.handleDeleteAgree,
                       this.handleDeleteDisagree)}
        </div>
        <div style={{paddingTop: "20px"}}>
          
          <Button
            onClick={() => {
              this.props.history.push("/new-offer");
            }}
            variant="outlined"
            color="primary">
              {Lang.ADD_OFFER}
          </Button>
        </div>
      </div>
    );
  }
}
const Offers = withRouter(connect(mapStateToProps)(ConnectedOffers));

export default Offers;
