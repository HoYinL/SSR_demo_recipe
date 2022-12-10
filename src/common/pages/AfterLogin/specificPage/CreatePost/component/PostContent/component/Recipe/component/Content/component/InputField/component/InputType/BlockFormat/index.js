import React from "react";
import { Box } from "@mui/material";
import FlexComponent from "./components/flex";
import PlainComponent from "./components/plain";
import FloatComponent from "./components/float";
import GridComponent from "./components/grid";

const BlockFormatComponent = (props) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap'}}>
            <FlexComponent 
                setModifierType={props.setModifierType}
                setType={props.setType}
            />
            <PlainComponent 
                setModifierType={props.setModifierType}
                setType={props.setType}
            />
            <FloatComponent 
                setModifierType={props.setModifierType}
                setType={props.setType}
            />
            <GridComponent 
                setModifierType={props.setModifierType}
                setType={props.setType}
            />
        </Box>
    )
};

export default BlockFormatComponent