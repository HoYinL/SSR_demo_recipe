import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { AddStyle } from './style';
import InputField from '../../../InputField';

const AddComponent = (props) => {
    const addStyle = AddStyle();

    const addRef = useRef(null);

    const [ target, setTarget ] = useState(null);

    useEffect(() => {
        setTarget(addRef.current.parentNode);
    }, [])

    return(
        <Box ref={addRef} className={addStyle.root}>
            <InputField target={target} setEleKey={props.setEleKey} setNewFieldContent={props.setNewFieldContent} setModifierType={props.setModifierType}/>
            <Box title="delete element">
                <Clear 
                    className={addStyle.clear}
                    onPointerUp={(e) => {
                        props.setEleKey(target);
                        props.setDeleteEle(true);
                    }}
                />
            </Box>
        </Box>
    )
};

export default AddComponent;