import React, { useState, useEffect, useRef } from "react";
import { Clear } from "@mui/icons-material";
import { InsertDeleteIconStyles } from "./style";

const InsertDeleteIconComponent = (props) => {
    const insertDeleteIconStyle =  InsertDeleteIconStyles();
    const useref = useRef(false);
    const addButton = useRef(null);

    useEffect(() => {
        if(useref.current == false){
            useref.current = true;
        } else {            
            addButton.current.classList.replace(insertDeleteIconStyle.cross, insertDeleteIconStyle.add);
        }
    }, [props.displayToolList])

    useEffect(() => {
        if(useref === false){
            useref = true;
        } else {            
            props.transform == false ? 
                addButton.current.classList.replace(insertDeleteIconStyle.cross, insertDeleteIconStyle.add):
                addButton.current.classList.replace(insertDeleteIconStyle.add, insertDeleteIconStyle.cross);

        }
    }, [props.transform]);

    return (
        <Clear 
            ref={addButton}
            className={insertDeleteIconStyle.cross}
            onPointerDown={() => {
                props.setDisplayToolList(!props.displayToolList);
                props.setTransform(!props.transform);
                props.setDisplaySubtleType(false);
            }}
        />
    )
}

export default InsertDeleteIconComponent