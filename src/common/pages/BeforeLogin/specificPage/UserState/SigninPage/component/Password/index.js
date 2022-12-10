import { FormControl, TextField, InputAdornment, FormHelperText } from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";
import { textfieldNormal, textfieldError, componentStyle } from "../../../style";
import React from "react";

const RegPassword = (props) => {
    const normalTextfield = textfieldNormal();
    const errorTextfield = textfieldError();
    const component = componentStyle();

    return (
    <>
    <FormControl>
        <TextField 
            name='password'
            required={false}
            type="password"
            variant="filled"
            label="Required"
            value={`${props.password == "Password"? "Password": props.password}`}
            placeholder="Password"
            size="small" 
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <VisibilityOff />
                    </InputAdornment>
                ),
            }}
            classes={props.validSetPassword == true? normalTextfield: errorTextfield}
            style={{
                marginBottom: '0px'
            }}
            onFocus={(e) => {e.target.value == "Password"? props.setPassword(""): null}}
            onChange={
                (e) => {props.setPassword(e.target.value)}
            }
            />
            <FormHelperText 
                className={`${props.validSetPassword == true? component.helperText: component.warningText}`}
            >
            {props.validSetPassword == true? 'Set password': <div dangerouslySetInnerHTML={{__html: props.htmlParser(props.validSetPassword)}}/>}
            </FormHelperText>
            </FormControl>

            <FormControl>
            <TextField 
                error={props.validPassword == true? false: true}
                required={props.validPassword == true? true: false}
                type="password"
                variant="filled"
                label={props.validPassword == true? "Password": "Error"}
                value={`${props.confirmedPassword == "Password"? "Password": props.confirmedPassword}`}
                placeholder="Confirm password"
                size="small" 
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <VisibilityOff />
                        </InputAdornment>
                    ),
                }}
                classes={props.validPassword == true? normalTextfield: errorTextfield}
                style={{
                    marginBottom: '0px'
                }}
                onFocus={(e) => {e.target.value == "Password"? props.setConfirmedPassword(""): null}}
                onChange={(e) => {props.setConfirmedPassword(e.target.value);}}
            />

            <FormHelperText 
                className={`${props.validPassword == true? component.helperText: component.warningText}`}
            >
                {props.validPassword == true? 'Confirm password': '*You have to enter the same password*'}
            </FormHelperText>
        </FormControl>
    </>
    )
}

export default RegPassword