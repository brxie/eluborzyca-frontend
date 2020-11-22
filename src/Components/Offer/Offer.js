import React, { Component } from "react";
import util from 'util';
import "./Offer.css";
import * as Lang from '../../LangPL';
import MuiPhoneInput from "material-ui-phone-number";
import CircularProgress from "@material-ui/core/CircularProgress";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Input, Typography, Select, InputLabel, TextField, FormControlLabel, 
         Button, MenuItem, LinearProgress, Checkbox } from "@material-ui/core";
import AvailabilitySlider from "../Common/AvailabilitySlider";
import Autocomplete from '@material-ui/lab/Autocomplete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageUploader from 'react-images-upload';
import Images from '../../ApiClient/Images'
import { getVillages } from "../../Model/Villages";
import { getCategories } from "../../Model/Categories";
import { getUnits } from "../../Model/Units";
import AlertDialog from "../Common/AlertDialog";
import { quantitySliderLabels, quantitySliderColors } from "../../Constants";
import User from '../../ApiClient/User'


// This component shows the items user checked out from the cart.
class Offer extends Component {

  state = {
    categories: [],
    villages: [],
    units: [],
    defaultImages: [],
    loading: true,
    initError: null,
    uploads: {"ongoing": [], "finished": {}, "failed": []},
    pictures: [],
    createItemError: null,
    abortDialogOpen: false,

    // accordions state
    detailsExpanded: true,
    photosExpanded: false,
    contactExpanded: false,

    // imputs
    name: "",
    category: "",
    price: "",
    unit: "",
    availability: 2,
    description: "",
    firstLastName: "",
    village: null,
    homeNumber: "",
    phone: "",
    saveUserData: false,

    // inputs errors
    nameError: false,
    categoryError: false,
    priceError: false,
    unitError: false,
    descriptionError: false,
    firstLastNameError: false,
    villageError: false,
    homeNumberError: false,
    phoneError: false,

    formErrorMsgs: [] 
  };


  constructor(props, renderOpts) {
    super(props);

    this.renderOpts = renderOpts
  }

  componentDidMount() {
    (async () => {
      try {
        await this.loadState()
        let categories = await getCategories()
        let villages = await getVillages()
        let units  = await getUnits()
        this.setState( {
          categories: categories,
          villages: villages,
          units: units,
          loading: false,
        });
      } catch(e) {
        console.log("Init offer page error: " + JSON.stringify(e))
        this.setState( {
          loading: false,
          initError: e.message
        });
      }
    }).call()
  }

  clearFormErrors() {
    this.setState({
      nameError: false,
      categoryError: false,
      priceError: false,
      unitError: false,
      descriptionError: false,
      firstLastNameError: false,
      villageError: false,
      homeNumberError: false,
      phoneError: false,
      formErrorMsgs: []
    })
  }

  handleProceedButton() {
    this.requestOffer()
    this.updateUserData()
  }

  requestOffer() {
    throw new Error("Not implemented error")
  }

  updateUserData() {
    if (this.state.saveUserData) {
      let user = {
        username: this.state.firstLastName,
        village: this.state.village,
        homeNumber: this.state.homeNumber,
        phone: this.state.phone,
      }
  
      User.userPut(user).then(()=> {
      }).catch(e => {
        console.log("Update user data failed: " + JSON.stringify(e))
      })
    }
  }

  validateForm() {
    const PHONE_NUMBER_LENGTH = 11
    var errMsgs = []
    let validSuccess = true

    if (this.state.name === "") {
      this.setState({nameError: true})
      errMsgs.push(Lang.OFFER_TITLE_CANT_BE_EMPTY)
      validSuccess = false
    }

    if (this.state.category === "") {
      this.setState({categoryError: true, detailsExpanded: true})
      errMsgs.push(Lang.NEED_SELECT_CATEGORY)
      validSuccess = false
    }

    if (this.state.price === "") {
      this.setState({priceError: true, detailsExpanded: true})
      errMsgs.push(Lang.NEED_PROVIDE_PRICE)
      validSuccess = false
    } else if (isNaN(parseInt(this.state.price, "10"))) {
      errMsgs.push(Lang.WRONG_PRICE)
      validSuccess = false
    }

    if (this.state.unit === "") {
      errMsgs.push(Lang.NEED_SELECT_UNIT)
      this.setState({unitError: true, detailsExpanded: true})
      validSuccess = false
    }

    if (this.state.description === "") {
      errMsgs.push(Lang.NEED_PROVIDE_DESCRIPTION)
      this.setState({descriptionError: true, detailsExpanded: true})
      validSuccess = false
    }

    if (this.state.firstLastName === "") {
      errMsgs.push(Lang.NEDD_PROVIDE_NAME_LASTNAME)
      this.setState({firstLastNameError: true, contactExpanded: true})
      validSuccess = false
    }

    if (this.state.village === null) {
      errMsgs.push(Lang.NEED_SELECT_VILLAGE)
      this.setState({villageError: true, contactExpanded: true})
      validSuccess = false
    }

    if (this.state.homeNumber === "") {
      errMsgs.push(Lang.NEED_PROVIDE_HOME_NUMBER)
      this.setState({homeNumberError: true, contactExpanded: true})
      validSuccess = false
    }

    let phoneDigits = this.state.phone.replace(/[^0-9]/g,"").length
    if (phoneDigits !== PHONE_NUMBER_LENGTH) {
      this.setState({phoneError: true, contactExpanded: true})
      errMsgs.push(util.format(Lang.WRONG_PHONE_FORMATED, this.state.phone))
      validSuccess = false
    }

    if (errMsgs.length) {
      this.setState({formErrorMsgs: errMsgs})
      validSuccess = false
    }
    if (!validSuccess) throw new Error('Validation error')
  }

  onUpload(pictures) {
    var uploads = this.state.uploads
    this.setState({
      pictures: pictures,
    });

    // clear failed uploads
    uploads.failed = []


    for (let picture of pictures) {
      let imgId = this.getImageId(picture)
      // avoid uploading once again already uplaoded files
      if  (imgId in this.state.uploads.finished || 
          this.state.uploads.ongoing.includes(imgId))  {
          continue
      }

      // put file name to the uploads array
      uploads.ongoing.push(imgId)
      this.setState({
        uploads: uploads
      });

      Images.imagePost(picture).then((resp) => {
        let imgId = this.getImageId(picture)
        // remove already uploaded image from uplaod array
        uploads.ongoing.splice(uploads.ongoing.indexOf(imgId), 1);
        uploads.finished[imgId] = resp.data
        this.setState({
          uploads: uploads
        });
      }).catch((e) => {
        uploads.ongoing.splice(uploads.ongoing.indexOf(imgId), 1);
        let failImg = {}
        failImg[imgId] = e.message
        uploads.failed.push(failImg)
        this.setState({
          uploads: uploads
        });
        console.log("Image upload error: " + JSON.stringify(e))
      })
    }
  }

  getImageId(picture) {
    return picture.lastModified.toString() + '-' + picture.name
  }

  async loadState() {
  }

  handleAbortClickOpen = () => {
    this.setState({ abortDialogOpen: true });
  };

  handleAbortDialogClose = () => {
    this.setState({ abortDialogOpen: false, deletingItemId: 0 });
  };

  handleAbort = () => {
    this.props.history.push("/offers");
    this.handleAbortDialogClose();
  };

  handleCancelAbort = () => {
    this.handleAbortDialogClose();
  };


  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }
    
    if (this.state.initError) {
      return <div className="initial-error">Error: {this.state.initError}.</div>;
    }

    return (
      <div style={{ padding: 10}}>
        <div style={{ fontSize: 24, marginTop: 10 }}>{this.renderOpts.titleText}</div>
        <div style={{ fontSize: 24, marginTop: 30, paddingLeft: "10px", width: "90%" }}>
          <Accordion
            expanded={this.state.detailsExpanded}
            onChange={(e, v) => {
              this.setState({ detailsExpanded: v });
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography variant="h6">1. {Lang.DATA}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="product-container">
                <Typography>
                  {Lang.PASS_ITEM_DETAILS_TEXT}
                </Typography>

                <div style={{marginTop: 20, display: "flex", width: "100%"}}>
                  <div style={{display: "inline-grid", width: "40%"}}>
                    <InputLabel>tytuł oferty</InputLabel>
                    <Input
                      value={this.state.name}
                      error={this.state.nameError}
                      onChange={e => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </div>
                  <div style={{display: "inline-grid", width: "10%", marginLeft: "20px"}}>
                    <InputLabel>{Lang.CATEGORY}</InputLabel>
                    <Select
                      value={this.state.category}
                      error={this.state.categoryError}
                      onChange={e => {
                        this.setState({ category: e.target.value });
                      }}
                    >  
                      {this.state.categories.map((category, idx) => {
                        return (<MenuItem key={idx} value={category.name}>{category.name}</MenuItem>)
                        })
                      } 
                    </Select>
                  </div>
                  <div style={{display: "inline-grid", width: "85px", marginLeft: "20px"}}>
                    <InputLabel>{Lang.PRICE}</InputLabel>
                    <div style={{display: "flex", width: "100%"}}>
                      <Input
                        // type="number"
                        value={this.state.price}
                        error={this.state.priceError}
                        onChange={e => {
                          let val = e.target.value
                          // if (val < 0) val=0;
                          this.setState({ price: val });
                        }}
                      />
                      <Typography style={{fontSize: 17, paddingTop: 8}}>{Lang.CURRENCY}</Typography></div>
                  </div>

                  <div style={{display: "inline-grid", width: "80px", marginLeft: "20px"}}>
                      <InputLabel>{Lang.UNIT}</InputLabel>
                    <Select
                      value={this.state.unit}
                      error={this.state.unitError}
                      onChange={e => {
                        this.setState({ unit: e.target.value });
                      }}
                    >
                      {
                        this.state.units.map((unit, idx) => {
                          return (<MenuItem key={idx} value={unit}>{unit}</MenuItem>)
                        })
                      }
                    </Select>
                  </div>
                  <div style={{display: "inline-grid", width: "160px", marginLeft: "40px", marginRight: "10px"}}>
                    <InputLabel>{Lang.AVAILABILITY}</InputLabel>
                    <AvailabilitySlider
                      orientation="horizontal"
                      valueLabelDisplay="off"
                      min={0}
                      max={quantitySliderLabels.length-1}
                      step={1}
                      value={this.state.availability}
                      onChange={(e, v) => {
                        this.setState({ availability: v });
                      }}
                      style={{paddingTop: 15, color: quantitySliderColors[this.state.availability]}}
                      track={false}
                      marks={[{value: 0, label: quantitySliderLabels[0]},
                              {value: quantitySliderLabels.length-1,
                               label: quantitySliderLabels[quantitySliderLabels.length-1]}]}
                      // marks={quantitySliderLabels.map((label, idx) => {
                      //   return {value: idx, label: label}
                      // })}
                    />
                  </div>
                </div>
                  <InputLabel style={{marginTop: 20}}>{Lang.PRODUCT_DESCRIPTION}</InputLabel>
                <TextField
                  variant="outlined"
                  value={this.state.description}
                  error={this.state.descriptionError}
                  onChange={e => {
                    this.setState({ description: e.target.value });
                  }}
                  multiline
                  rows={8}
                  style={{marginTop: 5, width: "100%"}}
                  autoFocus
                />
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={this.state.photosExpanded}
            onChange={(e, v) => {
              this.setState({ photosExpanded: v });
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
            <Typography variant="h6">2. {Lang.PHOTOS}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div className="product-container">
              <div style={{
                display: "flex",
                width: "100%",
                // border: "1px solid red",
                }}>
                
                <ImageUploader
                  className={"fileContainer uploadPictureContainer deleteImage " +
                             (this.renderOpts.uploadPreviewOnly ? "hideButton" : "")}
                  buttonStyles={this.renderOpts.uploadPreviewOnly ? {display: "none"} : {}}
                  withIcon={!this.renderOpts.uploadPreviewOnly}
                  withLabel={!this.renderOpts.uploadPreviewOnly}
                  withPreview={true}
                  buttonText='Choose images'
                  onChange={(pictures) => { this.onUpload(pictures)}}
                  imgExtension={['.jpg', 'jpeg', '.png']}
                  maxFileSize={10000000}
                  fileContainerStyle={{background: "1px solid red"}}
                  defaultImages={this.state.defaultImages}
                  label={Lang.IMAGE_UPLOADER_LABEL}
                  buttonText={Lang.IMAGE_UPLOADER_BUTTON_LABEL}
                  fileTypeError={Lang.IMAGE_UPLOADER_WRONG_EXTENSION}
                />
              
              </div>

              <div style={{width: "100%"}}>
                {this.state.uploads.ongoing.length > 0 && <LinearProgress/>}
                {this.state.uploads.ongoing.map((v, k) => {
                  return (
                    <Typography key={k} style={{fontSize: "12px"}}>{Lang.UPLOADING} "{v}"...</Typography>
                  )
                })}
                {this.state.uploads.failed.map((v, k) => {
                  return (
                  <Typography key={k} style={{fontSize: "12px", color: "red"}}>{Lang.UPLOAD_FAILED}: {JSON.stringify(v)}</Typography>
                  )
                })}
              </div>         
            </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={this.state.contactExpanded}
            onChange={(e, v) => {
              this.setState({ contactExpanded: v });
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
            <Typography variant="h6">3. {Lang.RECEIPT}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div className="product-container">
              <Typography>
                {Lang.RECEIPT_ADDRESS_DETAILS_TEXT}
              </Typography>

              <div style={{marginTop: 20, display: "inline-grid", width: "200px"}}>
                <InputLabel>{Lang.FIRST_LAST_NAME}</InputLabel>
                <Input
                  value={this.state.firstLastName}
                  error={this.state.firstLastNameError}
                  onChange={e => {
                    this.setState({ firstLastName: e.target.value });
                  }}
                />
              </div>
              
              <div style={{marginTop: 20, display: "flex", width: "100%"}}>
                <div style={{display: "inline-grid", width: "210px"}}>
                  <InputLabel>{Lang.VILLAGE}</InputLabel>
                  <Autocomplete
                    value={this.state.village}
                    onChange={(e, v) => {
                      this.setState({ village: v });
                    }}
                    options={this.state.villages}
                    renderInput={(params) => <TextField error={this.state.villageError} {...params}  />}
                  />
                </div>
                <div style={{display: "inline-grid", width: "100px", marginLeft: "20px"}}>
                  <InputLabel>{Lang.HOME_NUMBER}</InputLabel>
                  <Input
                    style={{width: "50px"}}
                    value={this.state.homeNumber}
                    error={this.state.homeNumberError}
                    onChange={e => {
                      this.setState({ homeNumber: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div style={{marginTop: 20, display: "inline-grid", width: "100"}}>
                 
                <InputLabel>{Lang.PHONE}</InputLabel>
                <MuiPhoneInput
                  countryCodeEditable={false}
                  defaultCountry='pl'
                  onlyCountries={['pl']}
                  value={this.state.phone}
                  error={this.state.phoneError}
                  className="input-text"
                  disableDropdown={true}
                  onChange={number => {
                    this.setState({
                       phone: number
                      });
                  }}
                  style={{width: "150px"}}
                />
              </div>



              <div style={{marginTop: 20, width: "100"}}>
                <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.saveUserData}
                    onChange={(e) => {
                      this.setState({saveUserData: e.target.checked});
                    }}
                    color="primary"
                  />
                }
                label={
                  <Typography  style={{fontSize: 13}}>
                    {Lang.REMEMBER_ADDRESS_TEXT}
                  </Typography>
                }
                />
              </div>
            </div>
            </AccordionDetails>
          </Accordion>
        </div>
       
        <div style={{ marginTop: 20, width: "70%", padding: "20px"}}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              this.handleProceedButton();
            }}
            disabled={Boolean(this.state.uploads.ongoing.length)}
          >
            {this.renderOpts.actionBttnLabel}
          </Button>
          <Button
            style={{marginLeft: "10px"}}
            variant="outlined"
            color="secondary"
            onClick={() => {
              this.handleAbortClickOpen()
            }}
          >
            Powrót
          </Button>
          {AlertDialog(Lang.ALERT_DIALOG_RETURN_BACK,
              Lang.ALERT_DIALOG_ABANDON_CHANGES_TEXT,
              Lang.CANCEL,
              Lang.ACCEPT,
              this.state.abortDialogOpen,
              this.handleAbortDialogClose,
              this.handleAbort,
              this.handleCancelAbort)}
          {this.state.formErrorMsgs.length ? <h5 style={{ color: "red" }}>Formularz zawiera błędy: <ul>{this.state.formErrorMsgs.map((v, k) => <li key={k}>{v}</li>)}</ul></h5> : ""}
          {this.state.createItemError ? <h5 style={{ color: "red" }}>Błąd: {this.state.createItemError}.</h5> : ""}
        </div>
      </div>
    );
  }
}

export default Offer;