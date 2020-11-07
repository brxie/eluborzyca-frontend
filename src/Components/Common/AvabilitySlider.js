import React from "react";
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

const CustomSlider = withStyles({
    thumb: {
      marginTop: "-4px !important",
      marginLeft: "-6px !important",
      width: "12px !important",
      height: "12px !important",
    },
    markLabel: {
        color: "rgba(0, 0, 0, 0.87)"
    },
    mark: {
        display: "none"
    },
    rail: {
      height: "4px !important",
      borderRadius: "2px !important",
      
    },
  })(Slider);


  function AvabilitySlider(props) {
    return (<CustomSlider  {...props}/>)
  }

  export default AvabilitySlider;

    
  


  