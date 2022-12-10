import { FormControl, TextField, InputAdornment, FormHelperText } from "@mui/material";
import { Email } from "@mui/icons-material";
import { textfieldNormal, textfieldError, componentStyle } from "../../../style";
import React from "react";

const RegEmail = (props) => {
    const normalTextfield = textfieldNormal();
    const errorTextfield = textfieldError();
    const component = componentStyle();

    return (
        <FormControl>
            <TextField
                name='emailFrom' 
                error={props.validEmail == true? false: true}
                required={props.validEmail == true? true: false}
                variant="filled"
                label={props.validEmail == true? "Required": "Error"}
                value={`${props.email == "Email"? "Email": props.email}`}
                placeholder="Email"
                size="small" 
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Email />
                    </InputAdornment>
                ),
                }}
                classes={props.validEmail == true? normalTextfield: errorTextfield}
                style={{
                    marginBottom: '0px',
                }}
                onFocus={(e) => {e.target.value == "Email"? props.setEmail(""): null}}
                onChange={(e) => {props.setEmail(e.target.value);}}
            />

            <FormHelperText 
                className={`${props.validEmail == true? component.helperText: component.warningText}`}
            >
            {props.validEmail == true? 'Enter associated email': `*${props.rejectMessage}*`}
            </FormHelperText>
        </FormControl>
    )
}

export default RegEmail