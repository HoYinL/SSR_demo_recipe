import { FormControl, TextField, InputAdornment, FormHelperText } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { textfieldNormal, componentStyle } from "../../../style";
import React from "react";

const Username = (props) => {
    const normalTextfield = textfieldNormal();
    const component = componentStyle();

    return (
        <FormControl>
            <TextField 
                variant="filled"
                label="Required"
                value={`${props.username == "Username"? "Username": props.username}`}
                placeholder="Username"
                size="small" 
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <AccountCircle />
                    </InputAdornment>
                    ),
                }}
                classes={normalTextfield}
                style={{
                    marginBottom: '0px',
                }}
                onFocus={(e) => {props.username == "Username"? props.setUsername(""): null}}
                onChange={(e) => {props.setUsername(e.target.value)}}
            />
            
            <FormHelperText className={component.helperText}>Set username</FormHelperText>
        </FormControl>
    )
}

export default Username