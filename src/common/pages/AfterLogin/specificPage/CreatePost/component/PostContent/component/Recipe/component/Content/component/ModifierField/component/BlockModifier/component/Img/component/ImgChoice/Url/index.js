import React from "react";
import { Box, TextField } from "@mui/material";
import { InsertDeleteIconStyles } from "../../../style";
//import { InsertDeleteIconStyles } from "../../InsertImgDeleteIcon/style";

const ImgFromUrlComponent = (props) => {
    const insertDeleteIconStyle = InsertDeleteIconStyles();

    return(
        <Box className={insertDeleteIconStyle.text}>
            <TextField 
                placeholder="Input img url..." 
                onKeyPress={(e) => {
                    if(e.key == "Enter"){
                        e.preventDefault();
                        props.setDisplayImg(e.target.value);                         
                    }
                }}
                multiline
            />
        </Box>
    )
};

export default ImgFromUrlComponent