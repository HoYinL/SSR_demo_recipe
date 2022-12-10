import React, { useState, useEffect, useRef } from "react";
import { InsertTypeIconStyles, InsertIconStyle } from "../../../component/style";
import { GridBlockStyles } from '../../style'
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import {v4 as uuid} from "uuid"

const addCategories = (props) => {
    const add = useRef(null);

    const gridBlockStyles = GridBlockStyles();
    const insertTypeIconStyles = InsertTypeIconStyles();
    const insertIconStyles = InsertIconStyle();

    const save = useSelector(state => state.save.save);

    return(
        <>
        {save === false && <Box ref={add} sx={{ display: 'flex', margin: '.25rem 0' }}>
            <Box
                title="image"
                onPointerDown={(e) => {
                    props.setInputImg(true);
                    props.setAddEle(add.current.parentNode.parentNode);
                }}
                className={`fa fa-picture-o ${insertTypeIconStyles.cross} ${insertIconStyles.root} ${gridBlockStyles.icon}`}
            />
            <Box
                title="text content"
                onPointerDown={(e) => {
                    props.setInputText(true);
                    props.setAddEle(add.current.parentNode.parentNode);
                }}
                className={`fa fa-font ${insertTypeIconStyles.cross} ${insertIconStyles.root} ${gridBlockStyles.icon}`}
            />
        </Box>}
        </>
    )
};

export default addCategories