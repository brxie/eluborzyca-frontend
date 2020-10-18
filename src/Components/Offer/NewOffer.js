import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Offer from './Offer'
import url from 'url'
import { newItem } from "../../ApiProxy/Misc";


const IMAGES_API_URL = url.resolve(process.env.REACT_APP_API_URL, "images/");

class ConnectedNewOffer extends Offer {

  constructor(props) {
    let renderOpts = {offerId: undefined,
                      titleText: "Nowa oferta",
                      actionBttnLabel: "Utwórz"}
    super(props, renderOpts);
  }

  handleProceedButton() {
    // validation
    try {
      this.validateForm()
    } catch(error) {
      return
    }

    var images = []
    var uploads = this.state.uploads
    for (let picture of this.state.pictures) {
      let src = url.resolve(IMAGES_API_URL, uploads.finished[picture.name].path)
      let thumbnail = url.resolve(IMAGES_API_URL, uploads.finished[picture.name].thumbnailPath)
      let img = {"src": src,
                "thumbnail": thumbnail,
                "thumbnailWidth": uploads.finished[picture.name].thumbnailWidth,
                "thumbnailHeight": uploads.finished[picture.name].thumbnailHeight
      }

      images.push(img)
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
      imageUrls: images
    }

    newItem(item).then(()=> {
      this.props.history.push("/offers");
    }).catch(e => {
      this.setState({createItemError: e.message})
    })
  }
}

const NewOffer = withRouter(connect()(ConnectedNewOffer));

export default NewOffer;
