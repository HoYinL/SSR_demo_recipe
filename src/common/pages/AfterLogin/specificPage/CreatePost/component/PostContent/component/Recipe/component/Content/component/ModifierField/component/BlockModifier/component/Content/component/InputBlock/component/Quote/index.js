import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { InputContentStyles, IconTextStyles } from "../../style";
import TextStyleModifier from "../../../../../../../StyleModifier/TextStyleModifier";
import { Clear } from '@mui/icons-material';
import { htmlToText } from 'html-to-text';
import { renderToStaticMarkup } from "react-dom/server";
import { useSelector } from "react-redux";

const QuoteInputCoponent = (props) => {
    const content = useRef(null);
    const quoteText = useRef(null);
    const contentRef = useRef(null);

    const iconTextStyles = IconTextStyles();

    const save = useSelector(state => state.save.save);

    const [inputed, setInputed] = useState(false);
    const [input, setInput] = useState('');
    const [target, setTarget] = useState(null);
    const [keyPress, setKeyPress] = useState(false);
    const [modifyText, setModifyText] = useState('');

    useEffect(() => {
        if(props.target == undefined){
            setTarget(content.current.parentNode);
        } else {
            setTarget(props.target);
        }
    }, []);

    useEffect(() => {
        if (modifyText != '' && keyPress == false) {
            const text = htmlToText(modifyText);
            setTimeout(() => { quoteText.current.innerHTML = text });
            setModifyText('');
        }
    }, [modifyText]);

    useEffect(() => {
        if (keyPress == true) {
            setTimeout(() => setKeyPress(false), 150);
        }
    }, [keyPress]);

    useEffect(() => {
        if (inputed == true && quoteText.current != null) {
            setInput(quoteText.current.innerHTML);
        } else if (inputed == false && input != '') {
            let text = renderToStaticMarkup(input);;
            setTimeout(() => { quoteText.current.innerHTML = text });
        }
    }, [inputed]);

    useEffect(() => {
        if (props.saveContent != undefined) {
            setInputed(true);
            setInput(props.saveContent?.children);
        }
    }, [props.saveContent]);

    return (
        <Box
            ref={content}
            sx={{ position: 'relative' }}
        >
            <Box style={props.QuotesStylesObj.root} >
                <Box style={props.QuotesStylesObj.alignLine} />
                <TextStyleModifier contentRef={contentRef} blocktype={props.blocktype} text={input} style={{ ...props.QuotesStylesObj.font, margin: 'auto' }} />
            </Box>
            {
                save == false &&
                <Box style={InputContentStyles.modifier}>
                    <Clear
                        className={iconTextStyles.root}
                        onPointerUp={(e) => {
                            props.setEleKey(target);
                            props.setDeleteEle(true);
                        }}
                    />
                </Box>
            }
        </Box>
    )
};

export default QuoteInputCoponent