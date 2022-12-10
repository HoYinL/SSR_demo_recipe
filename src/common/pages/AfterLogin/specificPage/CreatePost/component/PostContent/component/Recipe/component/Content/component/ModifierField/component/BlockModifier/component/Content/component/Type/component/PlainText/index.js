import React from "react";
import { Box } from "@mui/material";
import { InsertTypeIconStyles } from "../../../../../style";

const PlainTextComponent = (props) => {
    const insertTypeIconStyles = InsertTypeIconStyles();

    return(
        <Box 
            className={`fa fa-font ${insertTypeIconStyles.type}`}
            onPointerDown={() => {
                props.setType('plainText');
                props.setTransform(false);
                props.setAddEle(props.target);            
            }}
        />
    )
};

export default PlainTextComponent 