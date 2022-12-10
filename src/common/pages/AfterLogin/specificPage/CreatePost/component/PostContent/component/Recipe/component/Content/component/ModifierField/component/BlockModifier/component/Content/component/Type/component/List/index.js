import React from "react";
import { Box } from "@mui/material";
import { InsertTypeIconStyles } from "../../../../../style";

const ListComponent = (props) => {
    const insertTypeIconStyles = InsertTypeIconStyles();

    return(
        <Box 
            className={`fa fa-list-ul ${insertTypeIconStyles.type}`}
            onPointerDown={() => {
                props.setType('list');
                props.setTransform(false);
                props.setAddEle(props.target);
            }}
        />
    )
};

export default ListComponent