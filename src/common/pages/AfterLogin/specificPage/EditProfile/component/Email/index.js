import React, { useEffect, useState } from 'react';
import { TextField, Typography, FormHelperText, InputAdornment } from '@mui/material';
import { Email } from '@mui/icons-material';
import { EditProfilePage } from '../../style';

const EmailComponent = (props) => {
    const editProfilePage = EditProfilePage();

    return <>
        <TextField 
            className={props.validEmail == true? '': editProfilePage.warningTextField}
            name='emailForm'
            variant='filled'
            defaultValue={props.email}
            onChange={(e) => {
                props.setEmail(e.target.value)
                props.setModifiedEmail(true);
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Email />
                    </InputAdornment>
                ),
            }}
        />
        <FormHelperText className={props.validEmail == true? editProfilePage.helperText: editProfilePage.warningText}>
        {props.validEmail == true? 'Reset Email': `*${props.validEmail}*`}
        </FormHelperText>
    </>
}

export default EmailComponent