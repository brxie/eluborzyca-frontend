import React from "react";
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

const CustomSlider = withStyles({
    thumb: {
      marginTop: -4,
      marginLeft: -6,
    },
    active: {},
    markLabel: {
        color: "rgba(0, 0, 0, 0.87)"
    },
    mark: {
        display: "none"
    },
    rail: {
      height: 4,
      borderRadius: 2,
    },
  })(Slider);


  function AvabilitySlider(props) {
    return (<CustomSlider  {...props}/>)
  }

  export default AvabilitySlider;

    
  


  