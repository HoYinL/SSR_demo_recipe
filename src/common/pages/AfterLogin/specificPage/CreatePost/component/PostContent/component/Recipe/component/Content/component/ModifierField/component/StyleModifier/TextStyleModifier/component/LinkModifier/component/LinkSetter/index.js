import React, { useEffect, useState } from "react";
import { Clear } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { getSelectionHtml } from "../../../../function";

const LinkSetter = (props) => {
    const [ link, setLink ] = useState('');

    useEffect(() => {
        if(link != ''){
            getSelectionHtml('a', link, props.selectedRange);
            setTimeout(() => {
                setLink('');
                props.setContent(null);
                props.setDisplayModifier(false);
            }, 250);
        };
    }, [link]);

    return(
        <Box sx={{display: 'flex'}}>
            <TextField 
                placeholder="Paste a Link..."
                onKeyPress={(e) => {
                    if(e.key === 'Enter' && e.target.value != ''){
                        setLink(e.target.value);
                    }
                }}
            />
            <Clear 
                sx={{color: 'white', margin: 'auto !important'}}  
                onPointerDown={(e) => {
                    props.setContent(null)
                }}
            />
        </Box>
    )
}

export default LinkSetter