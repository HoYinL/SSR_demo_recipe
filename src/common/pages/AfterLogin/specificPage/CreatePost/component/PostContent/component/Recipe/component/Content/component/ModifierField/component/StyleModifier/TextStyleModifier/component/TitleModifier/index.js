import React, {useState, useEffect} from "react";
import { Box } from "@mui/material";
import { HeaderStyleModifierStyles } from "./style";
import IconComponent from "./component/Icon";

const TitleModifierComponent = (props) => {
    const headerStyleModifierStyles = HeaderStyleModifierStyles();

    const [titleModifier, setTitleModifier] = useState(false);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if(titleModifier == true){
            props.setContent(<IconComponent setContent={props.setContent} setType={props.setType}/>)
        }
    }, [titleModifier]);

    useEffect(() => {
        switch(props.type){
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                setDisplay(true);
                break;
        }
    }, [props.type])

    return(
        <>
            {
                display && <Box
                    onPointerUp={(e) => { setTitleModifier(true) }}
                    className={`fa fa-header ${headerStyleModifierStyles.header}`}
                />
            }
        </>
    )
};

export default TitleModifierComponent