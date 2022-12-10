import React from "react";
import { Box } from "@mui/material";
import { InsertTypeIconStyles } from "../../../../../style";

const QuoteComponent = (props) => {
    const insertTypeIconStyles = InsertTypeIconStyles();

    return(
        <Box 
            className={`fa fa-quote-right ${insertTypeIconStyles.type}`}
            onPointerDown={() => {
                props.setType('quote');
                props.setTransform(false);
                props.setAddEle(props.target);            
            }}
        />
    )
};

export default QuoteComponent 