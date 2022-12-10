import React, { useEffect, useState } from 'react';
import { TextField, Typography, FormHelperText, InputAdornment } from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';
import { EditProfilePage } from '../../style';
import { htmlParser } from '../../function';

const Password = (props) => {
    const editProfilePage = EditProfilePage();

    return <>
        <TextField 
            className={props.validPassword == true? '': editProfilePage.warningTextField}
            name='password'
            variant='filled' 
            type='password' 
            onChange={(e) => {
                props.setPassword(e.target.value)
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <VisibilityOff />
                    </InputAdornment>
                ),
            }}
        />
        <FormHelperText className={editProfilePage.helperText}>
            {props.validPassword == true? 'New Password': <div dangerouslySetInnerHTML={{__html: htmlParser(props.validPassword)}}/>}
        </FormHelperText>
    </>
}

export default Password