import React from "react";
import { Box, Typography } from "@mui/material";

const FlexComponent = (props) => {
    return (
        <Box 
            sx={{cursor: 'pointer'}}
            onPointerDown={() => {
                props.setModifierType('flexBlock');
                props.setType('text');
            }} 
        >
            <Typography>Flex-box</Typography>
            <Box sx={{width: '200px', height: '100px', display: 'flex'}}>
                <Box sx={{minWidth: '30%', border: '1px dashed black', borderRight: 'none'}} />
                <Box sx={{minWidth: '70%', border: '1px dashed black'}}/>
            </Box>
        </Box>
    )
};

export default FlexComponent