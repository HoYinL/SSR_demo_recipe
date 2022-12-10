import React from "react";
import { Box } from '@mui/material';
import { LinesBlockStyle } from "./style";

const linesBlockComponent = () => {
    const linesBlockStyle = LinesBlockStyle();

    return (
        <Box className={linesBlockStyle.root}>
            <Box />
            <Box />
        </Box>
    )
}

export default linesBlockComponent