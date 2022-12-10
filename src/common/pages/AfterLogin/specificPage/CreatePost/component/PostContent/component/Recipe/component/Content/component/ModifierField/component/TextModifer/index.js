import React, { useRef, useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import TextStyleModifier from "../StyleModifier/TextStyleModifier";
import parse from 'html-react-parser';
import { PlainTextStyle } from "./style";
import { renderToStaticMarkup } from "react-dom/server"
import { v4 as uuid } from 'uuid';
import { addBlogContent } from "../../../../../../../../../../../../../../store/blogcontentreducer";
import { useDispatch, useSelector } from "react-redux";
import { InputTextStyles } from "./style";
import { getTextElement } from "../../function";

const TextModifierComponent = (props) => {
    const inputTextStyles = InputTextStyles();

    const textRef = useRef(null);

    const [text, setText] = useState('');
    const [inputed, setInputed] = useState(false);

    const save = useSelector(state => state.save.save);

    const dispatch = useDispatch();

    useEffect(() => {
        if(props.saveContent != undefined){
            const text = getTextElement(props.saveContent);
            setText(text.children);
            setInputed(true);
        }
    }, [props.saveContent]);

    useEffect(() => {
        if (save === true) {
            dispatch(addBlogContent(renderToStaticMarkup(
                <Box
                    type='text'
                    key={uuid()}
                    style={{ margin: '1rem' }}
                >
                    {parse(textRef.current.childNodes[0].outerHTML)}
                </Box>
            )));
        }
    }, [save]);

    return (
        <Box>
            {
                <>
                    {inputed === false && <TextField
                        className={inputTextStyles.root}
                        placeholder="Input Text..."
                        onKeyPress={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault();
                                setText(e.target.value);
                                setInputed(true);
                                e.target.value = "";
                            }
                        }}
                        multiline
                    />}
                    {
                        inputed === true && <TextStyleModifier
                            textRef={textRef}
                            text={text}
                            style={PlainTextStyle}
                        />
                    }
                </>
            }
        </Box>
    )
}

export default TextModifierComponent