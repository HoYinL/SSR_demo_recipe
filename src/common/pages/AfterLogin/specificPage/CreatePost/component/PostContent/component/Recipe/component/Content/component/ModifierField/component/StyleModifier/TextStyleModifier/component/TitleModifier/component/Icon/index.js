import React, {useState, useEffect} from "react";
import { Box } from "@mui/material";
import { Icon } from '@iconify/react';
import { HeaderStyleModifierStyles } from "../../style";
import { Clear } from "@mui/icons-material";

const IconComponent = (props) => {
    const headerStyleModifierStyles = HeaderStyleModifierStyles();

    return (
        <Box style={{ display: 'flex', gap: '.5rem' }}>
            <Icon 
                onPointerUp={() => {props.setType('h1')}}
                className={headerStyleModifierStyles.root} icon="gridicons:heading-h1" />
            <Icon 
                            onPointerUp={() => {props.setType('h2')}}
                className={headerStyleModifierStyles.root} icon="gridicons:heading-h2" />
            <Icon 
                            onPointerUp={() => {props.setType('h3')}}

                className={headerStyleModifierStyles.root} icon="gridicons:heading-h3" />
            <Icon 
                            onPointerUp={() => {props.setType('h4')}}

                className={headerStyleModifierStyles.root} icon="gridicons:heading-h4" />
            <Icon 
                            onPointerUp={() => {props.setType('h5')}}

                className={headerStyleModifierStyles.root} icon="gridicons:heading-h5" />
            <Icon 
                            onPointerUp={() => {props.setType('h6')}}

                className={headerStyleModifierStyles.root} icon="gridicons:heading-h6" />
            <Clear 
                sx={{color: 'white', margin: 'auto !important'}}  
                onPointerDown={(e) => {
                    props.setContent(null)
                }}
            />
        </Box>
    )
}

export default IconComponent