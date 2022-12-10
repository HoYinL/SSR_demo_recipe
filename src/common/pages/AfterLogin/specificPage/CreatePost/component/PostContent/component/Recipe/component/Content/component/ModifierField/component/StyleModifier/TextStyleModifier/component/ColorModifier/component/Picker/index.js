import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import { Box } from "@mui/material";
import { getSelectionHtml } from "../../../../function";

const ColorPicker = (props) => {
  const [ color, setColor ] = useState("#ff0000");

  useEffect(() => {
    if(color != "#ff0000"){
        getSelectionHtml('color', '', props.selectedRange, color)
    }
  }, [color]);

  return (
    <Box 
        id='colorPicker'
    >
        <SketchPicker
            color={color}
            onChange={color => {
                setColor(color.hex)
            }}
            onChangeComplete={color => {
                setColor(color.hex);
            }}
        />
    </Box>
  );
};

export default React.memo(ColorPicker)