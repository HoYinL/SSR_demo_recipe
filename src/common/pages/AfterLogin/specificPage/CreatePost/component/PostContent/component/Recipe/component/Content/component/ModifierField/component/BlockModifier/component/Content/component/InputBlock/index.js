import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import PlainTextInput from "./component/PlainText";
import QuoteInput from "./component/Quote";
import ListInput from "./component/List";
import { getTextElement } from "../../../../../../function";
import { v4 as uuid } from "uuid";
import Add from "./component/AddDelete";
import { TextFields } from "@mui/icons-material";
import { InsertTypeIconStyles, InsertIconStyle } from "../../../style";

const InputFieldComponent = (props) => {
    const inputContent = useRef(null);

    const insertTypeIconStyles = InsertTypeIconStyles();
    const insertIconStyles = InsertIconStyle();

    const [content, setContent] = useState([]);
    const [saveText, setSaveText] = useState([]);
    const [saveTextArray, setSaveTextArray] = useState([]);
    const [deleteEle, setDeleteEle] = useState(null);
    const [addEle, setAddEle] = useState(null);
    const [eleKey, setEleKey] = useState(null);
    const [transform, setTransform] = useState(false);
    const [display, setDisplay] = useState(true);

    const closure_addModifier = (modifierList) => {
        return (type, saveContent) => {
            let modifier = null;

            switch (type) {
                case 'plainText':
                    modifier = <Box key={uuid()}>
                        <Add parent={props.parent} setAddEle={setAddEle} setType={props.setType} setTransform={setTransform} />
                        <PlainTextInput
                            saveContent={saveContent}
                            setContent={setContent}
                            setType={props.setType}
                            TextStylesObj={props.TextStylesObj}
                            InputTextStyles={props.InputTextStyles}
                            blocktype={type}
                            setDeleteEle={setDeleteEle}
                            setEleKey={setEleKey}
                        />
                    </Box>;
                    break;
                case 'quote':
                    modifier = <Box key={uuid()}>
                        <Add parent={props.parent} setAddEle={setAddEle} setType={props.setType} setTransform={setTransform} />
                        <QuoteInput
                            saveContent={saveContent}
                            setContent={setContent}
                            setType={props.setType}
                            QuotesStylesObj={props.QuotesStylesObj}
                            InputTextStyles={props.InputTextStyles}
                            blocktype={type}
                            setDeleteEle={setDeleteEle}
                            setEleKey={setEleKey}
                        />
                    </Box>;
                    break;
                case 'list':
                    modifier = <Box key={uuid()}>
                        <Add parent={props.parent} setAddEle={setAddEle} setType={props.setType} setTransform={setTransform} />
                        <ListInput
                            saveContent={saveContent}
                            setContent={setContent}
                            type={props.type}
                            ListStylesObj={props.ListStylesObj}
                            ulStylesObj={props.ulStylesObj}
                            InputTextStyles={props.InputTextStyles}
                            setDeleteEle={setDeleteEle}
                            setEleKey={setEleKey}
                        />
                    </Box>;
                    break;
                default:
                    modifier = <Box key={uuid()}>
                        <Add parent={props.parent} setAddEle={setAddEle} setType={props.setType} setTransform={setTransform} />
                    </Box>
            }

            return modifier
        }
    };

    const addModifier = closure_addModifier(content);

    useEffect(() => {
        if (props.saveTextContent != undefined) {
            if (props.saveTextContent.props.children instanceof Array) {
                setSaveText([...props.saveTextContent.props.children]);
            } else {
                setSaveText([props.saveTextContent.props.children]);
            }
        } else if (props.saveTextContent != undefined) {
            setSaveText([...props.saveTextContent]);
        }
    }, [props.saveTextContent]);

    useEffect(() => {
        if (saveText.length != 0) {
            const textArray = [];
            saveText.map((text) => {
                const getText = getTextElement(text);

                if (getText != null) textArray.push(getText);
            })
            setSaveTextArray([...textArray]);
        } else if (saveText.length != 0) {
            setSaveTextArray([...saveText])
        }
    }, [saveText]);

    useEffect(() => {
        if (saveTextArray.length != 0) {
            const saveText = [];
            saveTextArray.map((saveContent) => {
                saveContent != null && saveText.push(addModifier(saveContent.blocktype, saveContent))
            });
            saveText.push(addModifier(null, null));

            setContent([...content, ...saveText]);
        }
    }, [saveTextArray]);

    useEffect(() => {
        if (props.type != '' && addEle != null) {
            const newContent = addModifier(props.type);

            const list = inputContent.current.children;

            let eleIndex;

            for (let index = 0; index < list.length; index++) {
                list[index] === addEle && (eleIndex = index);
            };

            if (eleIndex == undefined) {
                const clone_list = [...content];
                const new_list = [...clone_list, newContent];
                setContent([...new_list]);
            } else if (list.length != 0 && eleIndex + 1 != list.length) {
                const clone_list = [...content];
                clone_list.splice(eleIndex, 0, newContent);
                setContent([...clone_list]);
            } else {
                setContent([...content, newContent]);
            }

            props.setType('');
        }
    }, [props.type, addEle]);

    useEffect(() => {
        if (eleKey != null && deleteEle == true) {
            const list = inputContent.current.children;

            let eleIndex;

            for (let index = 0; index < list.length; index++) {
                list[index] === eleKey && (eleIndex = index);
            };

            const clone_list = [...content];
            clone_list.splice(eleIndex, 1);

            setContent([...clone_list]);
        }
    }, [eleKey, deleteEle]);

    useEffect(() => {
        if (props.type != '') {
            setDisplay(false);
        }
    }, [props.type]);

    useEffect(() => {
        setTimeout(() => {
            if (inputContent.current.children.length != 0) {
                setDisplay(false);
            }
        }, 150)
    }, [])

    return (
        <Box className="Text" id="InputBlock" ref={props.textContent}>
            <Box style={{ margin: '1rem' }} ref={inputContent}>
                {
                    content.length != 0 && content.map((child) => child)
                }
            </Box>

            <Box sx={{ position: 'relative', display: 'flex', margin: '1rem 0' }}>
                {
                    <TextFields
                        className={`${insertTypeIconStyles.cross} ${insertIconStyles.root}`}
                        onPointerDown={() => {
                            props.setTransform(!props.transform);
                        }}
                    />
                }

                {
                    props.transform &&
                    <Add setAddEle={setAddEle} setType={props.setType} setTransform={setTransform} />
                }
            </Box>
        </Box>
    )
};

export default React.memo(InputFieldComponent)