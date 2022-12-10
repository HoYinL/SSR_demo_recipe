import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { FloatImgStyle } from "./style";

const FloatImgComponent = (props) => {
    const floatImgStyle = FloatImgStyle();

    const [ style, setStyle ] = useState({});

    useEffect(() => {
        if(props.float === 'right'){
            setStyle({float: 'right !important', borderRight: 'none !important'})
        } else {
            setStyle({float: 'left !important', borderLeft: 'none !important'})
        }
    }, [props.float])
    return(
        <Box 
            title={`float: ${props.float}`}
            className={floatImgStyle.root}
            onPointerDown={(e) => props.setFloat({float: props.float})}
        >
            <Box 
                className={floatImgStyle.floatBlock}
                sx={{...style}}
            />
        </Box>
    )
};

export default FloatImgComponent