import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Offer from './Offer'
import { getItem, updateItem } from "./../../ApiProxy/ApiProxy";


class ConnectedEditOffer extends Offer {

  constructor(props) {
    let renderOpts = {titleText: "Edycja",
                      actionBttnLabel: "Zapisz",
                      uploadPreviewOnly: true}
    super(props, renderOpts);
    this.offerId = props.history.location.state.offerId
  }


  async loadState() {
    let item = await getItem(this.offerId)  

    var images = []
    for (let img of item.imageUrls) {
      images.push(img.thumbnail)
    }

    this.setState({
      name:               item.name,
      category:           item.category,
      price:              item.price,
      unit:               item.unit,
      availability:       item.availability,
      description:        item.description,
      firstLastName:      item.firstLastName,
      village:            item.village,
      homeNumber:         item.homeNumber,
      phone:              item.phone,
      defaultImages:      images
    })
  }

  requestOffer() {

    console.log("offerId: " + this.offerId)

    // validation
    try {
      this.validateForm()
    } catch(error) {
      return
    }

    // API request
    let item = {
      name: this.state.name,
      category: this.state.category,
      price: this.state.price,
      unit: this.state.unit,
      availability: this.state.availability,
      description: this.state.description,
      firstLastName: this.state.firstLastName,
      village: this.state.village,
      homeNumber: this.state.homeNumber,
      phone: this.state.phone,
    }

    updateItem(this.offerId, item).then(()=> {
      this.props.history.push("/offers");
    }).catch(e => {
      console.log("Offer edit error: " + JSON.stringify(e))
      this.setState({createItemError: e.message})
    })
  }
}

const EditOffer = withRouter(connect()(ConnectedEditOffer));

export default EditOffer;
