import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { InputTextStyles } from "./style";

const InputTextComponent = (props) => {
    const [ textContent, setTextContent ] = useState('');
    const inputTextStyles = InputTextStyles();

    return (
        <TextField 
            id="inputText"
            data-div="div"
            className={inputTextStyles.root}
            placeholder="Input Text..."
            value={textContent}
            onChange={(e) => {
                setTextContent(e.target.value)
            }}
            onKeyPress={(e) => {
                if(e.key == "Enter"){
                    e.preventDefault();
                    props.setModifierType('text');
                    props.setNewFieldContent(e.target.value);
                    setTextContent('');
                }
            }}
            multiline
        />
    )
}

export default InputTextComponent