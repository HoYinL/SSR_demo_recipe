import React from "react";
import { Box } from "@mui/material";
import { InsertDeleteIconStyles } from "../../../style";

const UrlSearchComponent = (props) => {
    const insertDeleteIconStyle = InsertDeleteIconStyles();

    return(
        <Box
            title="search image on internet" 
            className={`fa fa-search ${insertDeleteIconStyle.type}`} 
            onPointerDown={() => {
                props.setDisplayUpslash(true);
                props.setDisplayUrlSearch(false);
                props.setIsUpslash(true);
            }}
        />
    )
};

export default UrlSearchComponent