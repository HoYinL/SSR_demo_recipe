import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { getSelectedText } from "./function";
import { TextStyleModifierStyles } from "./style";
import lineHeightCal from 'line-height';
import BoldModifier from "./component/BoldModifier";
import ItalicModifier from "./component/ItalicModifier";
import ColorModifier from "./component/ColorModifier";
import LinkModifier from "./component/LinkModifier";
import TitleModifier from "./component/TitleModifier";
import { renderToStaticMarkup } from "react-dom/server";
import { useSelector } from "react-redux";
import { getSelectionHtml } from "./function";

const TextStyleModifier = (props) => {
    const userref = useRef(false);
    const contentRef = useRef(null);

    const textStyleModifierStyles = TextStyleModifierStyles();

    const save = useSelector(state => state.save.save);

    const [content, setContent] = useState(null);
    const [startClientX, setStartClientX] = useState(0);
    const [startClientY, setStartClientY] = useState(0);
    const [clickedClientX, setClickedClientX] = useState(0);
    const [endClientX, setEndClientX] = useState(0);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [parentNode, setParentNode] = useState(null);
    const [selectedLine, setSelectedLine] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [line_height, setLineHeight] = useState(0);
    const [selectedRange, setSelectedRange] = useState(null);
    const [displayModifier, setDisplayModifier] = useState(false);
    const [input, setInput] = useState(false);
    const [innerHTML, setInnerHTML] = useState('');

    useEffect(() => {
        if (userref.current === false) {
            userref.current = true
        } else if (displayModifier === true && content == null) {
            const icon = (<>
                <BoldModifier
                    setContent={setContent}
                    setDisplayModifier={setDisplayModifier}
                />
                <ItalicModifier
                    setContent={setContent}
                    setDisplayModifier={setDisplayModifier}
                />
                <ColorModifier
                    setContent={setContent}
                    setDisplayModifier={setDisplayModifier}
                    selectedRange={selectedRange}
                    setTranslateY={setTranslateY}
                    line_height={line_height}
                    selectedLine={selectedLine}
                />
                <TitleModifier
                    setContent={setContent}
                    setDisplayModifier={setDisplayModifier}
                    selectedRange={selectedRange}
                    setType={props.setType}
                    type={props.type}
                />
                <LinkModifier
                    setContent={setContent}
                    setDisplayModifier={setDisplayModifier}
                    selectedRange={selectedRange}
                />
            </>)

            setContent(icon)
        }
    }, [displayModifier, content]);

    useEffect(() => {
        const hide_modifier = (e) => {
            const selectedText = getSelectedText()
            if (selectedText.toString() == '' &&
                e.target.tagName != 'INPUT' &&
                e.target.id == 'colorSelector'
            ) {
                setDisplayModifier(false);
            }
        };

        if (parentNode === null) {
            document.body.addEventListener('pointerup', hide_modifier);

            window.addEventListener('resize', (e) => {
                setDisplayModifier(false);
            }, { once: true });
        } else {
            document.body.removeEventListener('pointerup', hide_modifier);
        };

    }, [parentNode])

    useEffect(() => {
        endClientX != 0 && setOffsetLeft(startClientX + endClientX / 2 - 75);
    }, [endClientX]);

    useEffect(() => {
        startClientY != 0 && setTranslateY(line_height * (selectedLine - 1) - line_height);
    }, [startClientY]);

    useEffect(() => {
        if (props.text != '' && props.text != undefined) {
            setInput(true);
            let saveContent = '';
            if (props.text instanceof Array) {
                props.text.map((text) => {
                    saveContent += renderToStaticMarkup(text);
                })
            } else {
                saveContent = props.text
            }
            setInnerHTML(saveContent);
            contentRef.current.innerHTML = saveContent;
        }
    }, [props.text]);

    useEffect(() => {
        switch (props.type) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                contentRef.current.innerHTML = innerHTML;
                break;
        }
    }, [props.type])

    useEffect(() => {
        displayModifier === false && setContent(null);
    }, [displayModifier]);

    const pointerDownHandler = (e) => {
        if (contentRef.current.innerHTML == '') return;

        let parentNode = e.target;

        while (
            parentNode.tagName != 'P' &&
            parentNode.tagName != 'SPAN' &&
            parentNode.tagName != 'H1' &&
            parentNode.tagName != 'H2' &&
            parentNode.tagName != 'H3' &&
            parentNode.tagName != 'H4' &&
            parentNode.tagName != 'H5' &&
            parentNode.tagName != 'H6'
        ) {
            parentNode = e.target.parentNode;
        }

        setDisplayModifier(false);

        setClickedClientX(e.clientX);
        setStartClientX(e.clientX - parentNode.getBoundingClientRect().left);
        setParentNode(parentNode);
        setStartClientY(e.clientY);

        setLineHeight(lineHeightCal(parentNode));
        const line = Math.abs((e.clientY - parentNode.getBoundingClientRect().top) / lineHeightCal(parentNode));
        const actualLine = (line > (Math.trunc(line) + 0.25) ? line : line - 1);

        setSelectedLine(Math.trunc(actualLine));

        if (e.target.innerHTML == "Input text...") {
            document.getSelection().setBaseAndExtent(e.target, 0, e.target, 0);
        }
    };

    const pointerUpHandler = (e) => {
        if (contentRef.current.innerHTML == '') return;

        setEndClientX(e.clientX - clickedClientX);
        const selectedText = getSelectedText();

        if (e.clientX - clickedClientX == 0) setDisplayModifier(false);
        else setDisplayModifier(true);

        if (selectedText.toString() != '') {
            if (selectedText.getRangeAt && selectedText.rangeCount) {
                setSelectedRange(selectedText.getRangeAt(0));
            }

            e.clientX - clickedClientX === 0 && setDisplayModifier(false);
        };

        if (e.target.innerHTML == "Input text...") {
            document.getSelection().setBaseAndExtent(e.target, 0, e.target, 0);
        }
    };

    const keyPressHandler = (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            getSelectionHtml('new');
        }
    }

    const PasteHandler = (e) => {
        e.preventDefault();

        let paste = (e.clipboardData || window.clipboardData).getData('text');
        paste != '' ? setInput(true) : setInput(false);
        e.target.innerHTML += paste + "<br />";

        const setpos = document.createRange();
        const set = window.getSelection();

        setpos.selectNodeContents(e.target);
        setpos.collapse(false);
        set.removeAllRanges();
        set.addRange(setpos);
    }

    const FocusHandler = (e) => {
        e.preventDefault();
        if (e.target.innerHTML == "Input text...") {
            if (e.relatedTarget) {
                e.relatedTarget.focus();
            }
            document.getSelection().setBaseAndExtent(e.target, 0, e.target, 0);
        }
    };

    const InputHandler = (e) => {
        e.target.innerHTML == "" ? setInput(false) : setInput(true);
    }

    return (
        <Box type="textContent" ref={props.textRef} style={{ width: '100%', lineBreak: 'anywhere', padding: '.25rem .5rem' }}>
            {
                (save === false && content != null) &&
                    <Box sx={{ position: 'absolute', zIndex: '100', transform: `translateX(${offsetLeft}px) translateY(${translateY}px)` }} /*translateY(${translateY}px)*/ >
                        <Box className={`${textStyleModifierStyles.root}`} >
                            <Box id="captionModifier" sx={{ display: 'flex' }}>
                                {content}
                            </Box>
                        </Box>
                    </Box>
            }
            
            {
                props.type == undefined && <p
                    className={`${input == false && textStyleModifierStyles.text} ${textStyleModifierStyles.textBlock} componentText`}
                    contentEditable={save == false ? "true" : "false"}
                    ref={contentRef}
                    id='text'
                    placeholder="Input text..."
                    blocktype={props.blocktype}
                    onPointerDown={pointerDownHandler}
                    onPointerUp={pointerUpHandler}
                    onKeyPress={keyPressHandler}
                    onPaste={PasteHandler}
                    onInput={InputHandler}
                    onFocus={FocusHandler}
                    style={{ ...props.style }}
                />
            }

            {
                props.type == 'caption' && <p
                    className={`${input == false && textStyleModifierStyles.text} ${input == false && textStyleModifierStyles.caption} ${textStyleModifierStyles.textBlock} componentText`}
                    contentEditable={save == false ? "true" : "false"}
                    ref={contentRef}
                    id='text'
                    placeholder="Input caption..."
                    blocktype={props.blocktype}
                    onPointerDown={pointerDownHandler}
                    onPointerUp={pointerUpHandler}
                    onKeyPress={keyPressHandler}
                    onPaste={PasteHandler}
                    onInput={InputHandler}
                    onFocus={FocusHandler}
                    style={{ ...props.style, textAlign: 'center' }}
                />
            }

            {
                props.type == 'h1' && <h1
                    id='text'
                    type='title'
                    placeholder="Input Title..."
                    contentEditable={save == false ? "true" : "false"}
                    ref={contentRef}
                    blocktype={props.blocktype}
                    className={`${input == false && textStyleModifierStyles.text} ${textStyleModifierStyles.textBlock} componentText`}
                    onFocus={FocusHandler}
                    onPointerDown={pointerDownHandler}
                    onPointerUp={pointerUpHandler}
                    onKeyPress={keyPressHandler}
                    onPaste={PasteHandler}
                    onInput={InputHandler}
                />
            }

            {
                props.type == 'h2' && <h2
                    id='text'
                    type='title'
                    placeholder="Input title..."
                    contentEditable={save == false ? "true" : "false"}
                    ref={contentRef}
                    blocktype={props.blocktype}
                    className={`${input == false && textStyleModifierStyles.text} ${textStyleModifierStyles.textBlock} componentText`}
                    onPointerDown={pointerDownHandler}
                    onPointerUp={pointerUpHandler}
                    onKeyPress={keyPressHandler}
                    onInput={InputHandler}
                />
            }

            {
                props.type == 'h3' && <h3
                    id='text'
                    type='title'
                    contentEditable={save == false ? "true" : "false"}
                    ref={contentRef}
                    blocktype={props.blocktype}
                    className={`${input == false && textStyleModifierStyles.text} ${textStyleModifierStyles.textBlock} componentText`}
                    onPointerDown={pointerDownHandler}
                    onPointerUp={pointerUpHandler}
                    onKeyPress={keyPressHandler}
                    onInput={InputHandler}
                />
            }

            {
                props.type == 'h4' && <h4
                    id='text'
                    type='title'
                    contentEditable={save == false ? "true" : "false"}
                    ref={contentRef}
                    blocktype={props.blocktype}
                    className={`${input == false && textStyleModifierStyles.text} ${textStyleModifierStyles.textBlock} componentText`}
                    onPointerDown={pointerDownHandler}
                    onPointerUp={pointerUpHandler}
                    onKeyPress={keyPressHandler}
                    onPaste={PasteHandler}
                    onInput={InputHandler}
                />
            }

            {
                props.type == 'h5' && <h5
                    id='text'
                    type='title'
                    contentEditable={save == false ? "true" : "false"}
                    ref={contentRef}
                    blocktype={props.blocktype}
                    className={`${input == false && textStyleModifierStyles.text} ${textStyleModifierStyles.textBlock} componentText`}
                    onPointerDown={pointerDownHandler}
                    onPointerUp={pointerUpHandler}
                    onKeyPress={keyPressHandler}
                    onPaste={PasteHandler}
                    onInput={InputHandler}
                />
            }

            {
                props.type == 'h6' && <h6
                    id='text'
                    type='title'
                    contentEditable={save == false ? "true" : "false"}
                    ref={contentRef}
                    blocktype={props.blocktype}
                    className={`${input == false && textStyleModifierStyles.text} ${textStyleModifierStyles.textBlock} componentText`}
                    onPointerDown={pointerDownHandler}
                    onPointerUp={pointerUpHandler}
                    onKeyPress={keyPressHandler}
                    onPaste={PasteHandler}
                    onInput={InputHandler}
                />
            }
        </Box>
    )
}

export default TextStyleModifier