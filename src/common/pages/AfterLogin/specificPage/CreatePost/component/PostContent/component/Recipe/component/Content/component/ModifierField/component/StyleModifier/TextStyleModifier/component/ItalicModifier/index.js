import React, {useEffect, useState} from "react";
import { FormatItalic } from "@mui/icons-material";
import { getSelectionHtml } from "../../function";

const ItalicModifier = (props) => {

    const [ italic, setItalic ] = useState(false);

    useEffect(() => {
        if(italic === true){
            getSelectionHtml('i');
            setTimeout(() => {
                setItalic(false);
                props.setContent(null);
                props.setDisplayModifier(false);
            }, 250);
        }
    }, [italic]);

    return(<>
        <FormatItalic 
            onPointerDown={() => {
                setItalic(true);
            }} 
        />
    </>)
};

export default ItalicModifier