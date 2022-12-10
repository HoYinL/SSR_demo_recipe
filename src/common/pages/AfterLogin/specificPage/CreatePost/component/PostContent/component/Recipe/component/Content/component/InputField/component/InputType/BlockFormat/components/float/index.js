import React from "react";
import { Box, Typography } from "@mui/material";

const FloatComponent = (props) => {
    return (
        <Box 
            sx={{cursor: 'pointer'}}
            onPointerDown={() => {
                props.setModifierType('floatBlock');
                props.setType('text');
            }} 
        >
            <Typography>Float-box</Typography>
            <Box sx={{display: 'flex', width: '200px', height: '100px', overflow: 'hidden', border: '1px dashed black'}}>
                <Box sx={{margin: '0 0 0 auto', width: '70px', height: '75px', border: '1px dashed black', borderRight: 'none', borderTop: 'none'}}></Box>
                <Typography></Typography>
            </Box>
        </Box>
    )
};

export default FloatComponent