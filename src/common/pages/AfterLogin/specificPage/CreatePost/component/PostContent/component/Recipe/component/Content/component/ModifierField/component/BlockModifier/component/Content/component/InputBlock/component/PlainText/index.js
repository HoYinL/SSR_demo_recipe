import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import TextStyleModifier from "../../../../../../../StyleModifier/TextStyleModifier";
import { InputContentStyles, IconTextStyles } from "../../style";
import { Clear } from '@mui/icons-material';
import { useSelector } from "react-redux";

const PlainTextInputComponent = (props) => {
    const content = useRef(null);

    const iconTextStyles = IconTextStyles();

    const [input, setInput] = useState('');
    const [target, setTarget] = useState(null);

    const save = useSelector(state => state.save.save);

    useEffect(() => {
        if(props.target == undefined){
            setTarget(content.current.parentNode);
        } else {
            setTarget(props.target);
        }
    }, []);

    useEffect(() => {
        if (props.saveContent != undefined) {

            setInput(props.saveContent?.children);
        }
    }, [props.saveContent]);

    return (
        <Box
            ref={content}
            sx={{ position: 'relative' }}
        >
            <Box>
                <TextStyleModifier blocktype={props.blocktype} style={props.TextStylesObj.font} text={input} />
            </Box>

            {
                save == false && <Box style={InputContentStyles.modifier}>
                    <Clear
                        className={iconTextStyles.root}
                        onPointerUp={(e) => {
                            props.setEleKey(target);
                            props.setDeleteEle(true);
                        }} />
                </Box>
            }
        </Box>
    )
};

export default PlainTextInputComponent