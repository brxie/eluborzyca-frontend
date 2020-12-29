import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Offer from './Offer'
import url from 'url'
import { newItem } from "../../Model/Items";
import User from '../../ApiClient/User'


const IMAGE_API_URL = url.resolve(process.env.REACT_APP_API_URL, "image/");

class ConnectedNewOffer extends Offer {

  constructor(props) {
    let renderOpts = {offerId: undefined,
                      titleText: "Nowa oferta",
                      actionBttnLabel: "Utwórz"}
    super(props, renderOpts);
  }

  async loadState() {
    var user
    try {
      var resp = await User.userGet()
      user = await resp.json()
      this.setState( {
        firstLastName: user.username,
        village: user.village,
        homeNumber: user.homeNumber,
        phone: user.phone
      });
    } catch(e) {
      console.log("User get error: " + JSON.stringify(e))
    }
  }

  requestOffer() {
    // validation
    try {
      this.validateForm()
    } catch(error) {
      return
    }

  
    var images = []
    var uploads = this.state.uploads
    for (let picture of this.state.pictures) {
      var imgId = this.getImageId(picture)
      console.log("Warning: failed to add '" + imgId + "' to images list. " + 
                  "Imagge fond in pictures state but it doesn't exist on finished list.")
      if(!(imgId in uploads.finished)) {
        continue
      }
      let src = url.resolve(IMAGE_API_URL, uploads.finished[imgId].path)
      let thumbnail = url.resolve(IMAGE_API_URL, uploads.finished[imgId].thumbnailPath)
      let img = {"src": src,
                "thumbnail": thumbnail,
                "thumbnailWidth": uploads.finished[imgId].thumbnailWidth,
                "thumbnailHeight": uploads.finished[imgId].thumbnailHeight
      }
      images.push(img)
    }

    // API request
    let item = {
      name: this.state.name,
      category: this.state.category,
      price: parseInt((parseFloat(this.state.price.replace(',', '.'))*100).toFixed(0)),
      unit: this.state.unit,
      availability: this.state.availability,
      description: this.state.description,
      firstLastName: this.state.firstLastName,
      village: this.state.village,
      homeNumber: this.state.homeNumber,
      phone: this.state.phone,
      images: images
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
