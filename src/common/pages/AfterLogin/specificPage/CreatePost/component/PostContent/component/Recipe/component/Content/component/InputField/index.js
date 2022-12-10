import React, { useEffect, useState } from "react";
import { ListItem } from "@mui/material";
import TypeList from "./component/TypeList";
import TextFormat from "./component/InputType/TextFormat";
import InputImg from "./component/InputType/Img";
import SearchImg from "./component/InputType/SearchImg";
import InputVideo from "./component/InputType/Video";
import Embed from "./component/InputType/Embed";
import BlockFormat from "./component/InputType/BlockFormat";
import { InputFieldStyles } from "./style";

const InputFieldComponent = (props) => {
    const inputFieldStyles = InputFieldStyles();

    const [ type, setType ] = useState('text');

    useEffect(() => {
        if(type === 'dividingBlock'){
            props.setModifierType('dividingBlock');
        }
        
        if(props.target != null){
            props.setEleKey(props.target);
        }
    }, [type]);

    return (
        <ListItem 
            className={inputFieldStyles.root} 
        >
            <TypeList setType={setType}/>
            {   
                type === 'textFormat' && <TextFormat
                    setModifierType={props.setModifierType}
                    setNewFieldContent={props.setNewFieldContent}
                    setType={setType}
                />
            }

            {
                type === 'img' && <InputImg 
                    setModifierType={props.setModifierType}
                    setNewFieldContent={props.setNewFieldContent}
                    setType={setType}
                />
            }

            {
                type === 'searchImg' && <SearchImg 
                    setModifierType={props.setModifierType}
                    setNewFieldContent={props.setNewFieldContent}
                    setType={setType}
                />
            }

            {
                type === 'video' && <InputVideo 
                    setModifierType={props.setModifierType}
                    setNewFieldContent={props.setNewFieldContent}
                    setType={setType}
                />
            }

            {
                type === 'embed' && <Embed 
                    setModifierType={props.setModifierType}
                    setNewFieldContent={props.setNewFieldContent}
                    setType={setType}
                />
            }

            {
                type === 'blockFormat' && <BlockFormat 
                    setModifierType={props.setModifierType}
                    setNewFieldContent={props.setNewFieldContent}
                    setType={setType}
                />
            }
        </ListItem>
    )
}

export default InputFieldComponent