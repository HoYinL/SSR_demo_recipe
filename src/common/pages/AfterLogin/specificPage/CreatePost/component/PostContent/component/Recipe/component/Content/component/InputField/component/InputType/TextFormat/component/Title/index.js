import React from "react";
import { Box, Typography } from "@mui/material";

const TitleComponent = (props) => {
    return (
        <Box 
            sx={{cursor: 'pointer'}}
            onPointerDown={() => {
                props.setModifierType('title');
                props.setType('title');
            }} 
        >
            <Typography>Title</Typography>
            <Box sx={{width: '200px', height: '100px', padding: '.5rem', border: '1px dashed black', display: 'flex', alignItems: 'start'}}>
                <Box sx={{padding: '0 .25rem', fontSize:'.75rem', fontFamily: 'Arial', width: '100%', height: '30%', border: '1px dashed black'}}>Title</Box>
            </Box>
        </Box>
    )
};

export default TitleComponent