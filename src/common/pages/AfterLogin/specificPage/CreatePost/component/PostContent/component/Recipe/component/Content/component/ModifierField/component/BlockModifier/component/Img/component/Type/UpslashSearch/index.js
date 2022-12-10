import React from "react";
import { Box } from "@mui/material";
import { InsertDeleteIconStyles } from "../../../style";

const UpslashSearchComponent = (props) => {
    const insertDeleteIconStyle = InsertDeleteIconStyles();

    return(
        <Box 
            title="add image src"
            className={`fa fa-globe ${insertDeleteIconStyle.type}`}
            onPointerDown={() => {
                props.setDisplayUrlSearch(true);
                props.setDisplayUpslash(false);
            }}
        />
    )
};

export default UpslashSearchComponent