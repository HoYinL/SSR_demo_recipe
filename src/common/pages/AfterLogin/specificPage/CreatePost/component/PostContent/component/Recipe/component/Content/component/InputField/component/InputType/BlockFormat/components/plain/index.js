import React from "react";
import { Box, Typography } from "@mui/material";

const PlainComponent = (props) => {
    return (
        <Box 
            sx={{cursor: 'pointer'}}
            onPointerDown={() => {
                props.setModifierType('plainBlock');
                props.setType('text');
            }} 
        >
            <Typography>Plain-box</Typography>
            <Box sx={{width: '200px', height: '100px', border: '1px dashed black'}} />
        </Box>
    )
};

export default PlainComponent