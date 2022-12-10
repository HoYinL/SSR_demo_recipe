import { FormControl, TextField, InputAdornment, FormHelperText } from "@mui/material";
import { Description } from "@mui/icons-material";
import { textfieldNormal, componentStyle } from "../../../style";
import React from "react";

const Descripiton = (props) => {
    const normalTextfield = textfieldNormal();
    const component = componentStyle();

    return (
        <FormControl>
            <TextField 
                label={'optional'}
                variant="filled"
                value={`${props.username == "User Description"? "User Description": props.description}`}
                placeholder="User Description"
                size="small" 
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Description />
                    </InputAdornment>
                    ),
                }}
                classes={normalTextfield}
                style={{
                    marginBottom: '0px',
                }}
                onFocus={(e) => {props.description == "User Description"? props.setDescription(""): null}}
                onChange={(e) => {props.setDescription(e.target.value)}}
            />
            
            <FormHelperText className={component.helperText}>Set user description</FormHelperText>
        </FormControl>
    )
}

export default Descripiton