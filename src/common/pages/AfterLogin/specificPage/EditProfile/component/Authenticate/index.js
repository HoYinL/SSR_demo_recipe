import React, { useEffect, useState } from 'react';
import { TextField, Typography, FormHelperText, Box, InputAdornment } from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';
import { EditProfilePage } from '../../style';

const Authenticate = (props) => {
    useEffect(() => {
        props.setConfirmPassword('')
    }, []);

    const editProfilePage = EditProfilePage();

    return <>
        <TextField 
            inputProps={{
                autoComplete: 'new-password',
                form: {
                    autoComplete: 'off',
                },
            }}
            className={props.confirmed == false? editProfilePage.warningTextField: null}
            variant='filled'
            type="password"
            defaultValue=''
            onChange={(e) => {
                props.setConfirmPassword(e.target.value)
                //props.setPassword(e.target.value)
            }}  
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <VisibilityOff sx={{color: `${props.confirmed == false? 'red': 'grey'}`}}/>
                    </InputAdornment>
                ),
            }}  
        />
        <FormHelperText className={props.confirmed == false?  editProfilePage.warning: editProfilePage.helperText}>
            {props.confirmed == false? 'Please enter correct password':'Confirm Password'}
        </FormHelperText>
    </>
}

export default Authenticate