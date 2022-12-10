import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Type from "../../../component/Content/component/Type";
import InputField from "../../../component/Content/component/InputBlock";
import {
    GridInputStyles,
    ListStylesObj,
    ulStylesObj,
    TextStylesObj,
    QuotesStylesObj
} from "../../style";
import { useSelector } from "react-redux";
import AddCategories from "../AddCategories";
import { v4 as uuid } from "uuid";
import PlainTextInput from "../../../component/Content/component/InputBlock/component/PlainText";
import QuoteInput from "../../../component/Content/component/InputBlock/component/Quote";
import ListInput from "../../../component/Content/component/InputBlock/component/List";

const InputContentComponent = (props) => {
    const gridContent = useRef(null);

    const gridInputStyles = GridInputStyles();

    const [transform, setTransform] = useState(false);
    const [type, setType] = useState('');
    const [display, setDisplay] = useState(true);
    const [con, setCon] = useState([]);
    const [content, setContent] = useState([]);

    const save = useSelector(state => state.save.save);

    const closure_addModifier = (modifierList) => {
        return (type, saveContent) => {
            let modifier = null;

            switch (type) {
                case 'plainText':
                    modifier = <Box key={uuid()}>
                        <AddCategories
                            key={uuid()}
                            setInputImg={props.setInputImg}
                            setInputText={props.setInputText}
                            setAddEle={props.setAddEle}
                        />
                        <PlainTextInput
                            saveContent={saveContent}
                            setContent={setContent}
                            TextStylesObj={TextStylesObj}
                            InputTextStyles={gridInputStyles}
                            blocktype={type}
                            setDeleteEle={props.setDeleteEle}
                            setEleKey={props.setEleKey}
                            target={gridContent.current}
                            parent={'gridItem'}
                        />
                    </Box>;
                    break;
                case 'quote':
                    modifier = <Box key={uuid()}>
                        <AddCategories
                            key={uuid()}
                            setInputImg={props.setInputImg}
                            setInputText={props.setInputText}
                            setAddEle={props.setAddEle}
                        />
                        <QuoteInput
                            saveContent={saveContent}
                            setContent={setContent}
                            QuotesStylesObj={QuotesStylesObj}
                            InputTextStyles={gridInputStyles}
                            blocktype={type}
                            setDeleteEle={props.setDeleteEle}
                            target={gridContent.current}
                            setEleKey={props.setEleKey}
                            parent={'gridItem'}
                        />
                    </Box>;
                    break;
                case 'list':
                    modifier = <Box key={uuid()}>
                        <AddCategories
                            key={uuid()}
                            setInputImg={props.setInputImg}
                            setInputText={props.setInputText}
                            setAddEle={props.setAddEle}
                        />
                        <ListInput
                            saveContent={saveContent}
                            setContent={setContent}
                            ListStylesObj={ListStylesObj}
                            ulStylesObj={ulStylesObj}
                            InputTextStyles={gridInputStyles}
                            setDeleteEle={props.setDeleteEle}
                            target={gridContent.current}
                            setEleKey={props.setEleKey}
                            parent={'gridItem'}
                        />
                    </Box>;
                    break;
            }

            return modifier
        }
    };

    const addModifier = closure_addModifier(content);

    useEffect(() => {
        if (type != '') {
            setCon(addModifier(type));
            setDisplay(false);
        }
    }, [type]);

    useEffect(() => {
        if (props.content != undefined) {
            setCon(addModifier(props.content[0].blocktype, props.content[0]));
            setDisplay(false);
        }
    }, [props.content]);

    return (
        <Box ref={gridContent} type="GridContent">
            {con}

            {
                save === false && display &&
                <Box sx={{ position: 'relative', display: 'flex' }}>
                    <Type
                        type={type}
                        setType={setType}
                        setTransform={setTransform}
                        setAddEle={props.setAddEle}
                        setDeleteEle={props.setDeleteEle}
                    />
                </Box>
            }
        </Box>
    )
};

export default InputContentComponent