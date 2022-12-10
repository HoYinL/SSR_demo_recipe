import React from "react";
import { Box, Typography } from "@mui/material";
import { v4 as uuid } from 'uuid';

const GridComponent = (props) => {
    return (
        <Box
            sx={{cursor: 'pointer'}} 
            onPointerDown={() => {
                props.setModifierType('gridBlock');
                props.setType('text');
            }} 
        >
            <Typography>Grid-box</Typography>
            <Box 
                sx={{
                    width: '200px', 
                    height: '100px', 
                    padding: '.5rem',
                    border: '1px dashed black', 
                    justifyContent: 'center',
                    display: 'grid',
                    gridGap: "10px 5px",
                    gridTemplateColumns: `repeat(auto-fill, 40px)`
                }}
            >
                {Array(8).fill(0).map((ele) => <Box key={uuid()} sx={{border: '1px dashed black'}}/>)}
            </Box>
        </Box>
    )
};

export default GridComponent