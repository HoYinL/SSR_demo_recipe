import React, {useEffect, useState} from "react";
import { FormatBold } from "@mui/icons-material";
import { getSelectionHtml } from "../../function";

const BoldModifier = (props) => {

    const [ bold, setBold ] = useState(false);

    useEffect(() => {
        if(bold === true){
            getSelectionHtml('b');
            setTimeout(() => {
                setBold(false);
                props.setContent(null);
                props.setDisplayModifier(false);
            }, 250);
        }
    }, [bold]);

    return(<>
        <FormatBold 
            onPointerDown={() => {
                setBold(true);
            }} 
        />
    </>)
};

export default BoldModifier