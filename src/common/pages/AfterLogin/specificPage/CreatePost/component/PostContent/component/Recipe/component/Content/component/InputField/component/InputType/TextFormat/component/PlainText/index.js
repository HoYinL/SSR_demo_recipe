import React from "react";
import { Box, Typography } from "@mui/material";

const TextComponent = (props) => {
    return (
        <Box 
            sx={{cursor: 'pointer'}}
            onPointerDown={() => {
                props.setModifierType('text');
                props.setType('text');
            }} 
        >
            <Typography>Plain-Text</Typography>
            <Box sx={{width: '200px', height: '100px', padding: '.5rem',  border: '1px dashed black', display: 'flex', alignItems: 'end'}}>
                <Box sx={{padding: '0 .25rem', fontSize:'.75rem', fontFamily: 'Arial', width: '100%', height: '70%', border: '1px dashed black'}}>Context</Box>
            </Box>
        </Box>
    )
};

export default TextComponent