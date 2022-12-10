import React, { useEffect, useState } from 'react';
import { TextField, Typography, FormHelperText, InputAdornment } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { EditProfilePage } from '../../style';

const Username = (props) => {
    const editProfilePage = EditProfilePage();

    return <>
        <TextField 
            variant='filled'
            defaultValue={props.username}
            onChange={(e) => {
                props.setUsername(e.target.value)
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <AccountCircle />
                    </InputAdornment>
                ),
            }}
        />
        <FormHelperText className={editProfilePage.helperText}>Username</FormHelperText>
    </>
}

export default Username