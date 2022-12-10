import React from 'react';
import { TextField, FormHelperText, InputAdornment } from '@mui/material';
import { Description } from '@mui/icons-material';
import { EditProfilePage } from '../../style';

const Descripiton = (props) => {
    const editProfilePage = EditProfilePage();

    return <>
        <TextField 
            defaultValue={props.description}
            name='descripiton'
            variant='filled' 
            onChange={(e) => {
                props.setDescription(e.target.value)
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Description />
                    </InputAdornment>
                ),
            }}
        />
        <FormHelperText className={editProfilePage.helperText}>User descripiton</FormHelperText>

    </>
}

export default Descripiton