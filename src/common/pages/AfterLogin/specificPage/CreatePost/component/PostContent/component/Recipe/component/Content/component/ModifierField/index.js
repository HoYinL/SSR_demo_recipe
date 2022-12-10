import React, { useState, useEffect, useRef } from "react";
import TextModifier from "./component/TextModifer";
import ImgBlockModifier from "./component/ImgBlockModifier";
import EmbedModifier from "./component/EmbedModifier";
import FlexModifier from "./component/BlockModifier/FlexModifier";
import PlainBlockModifier from "./component/BlockModifier/PlainModifier";
import FloatBlockModifier from "./component/BlockModifier/FloatModifier";
import GridBlockModifier from "./component/BlockModifier/GridModifier";
import VideoModifier from "./component/VideoModifier";
import TitleBlockModifier from "./component/TitleModifier";
import DividingBlockModifier from "./component/DividingBlock";
import AddDelete from "./component/AddComponent";
import { Box } from "@mui/material";
import { v4 as uuid } from 'uuid';
import parse from 'html-react-parser';
import { useSelector } from "react-redux";

const ModifierComponent = (props) => {
    const blogContent = useSelector(state => state.blogContent.blogContent);

    const [eleKey, setEleKey] = useState(null);
    const [deleteEle, setDeleteEle] = useState(false);

    const modifierList = useRef(null);

    const closure_addModifier = (modifierList) => {
        return (type, saveContent) => {
            let modifier = null;

            switch (type) {
                case 'img':
                    modifier =
                        <Box className={modifierList.root} key={uuid()}>
                            <ImgBlockModifier setModifierType={props.setModifierType} content={props.newFieldContent} saveContent={saveContent} />
                            <AddDelete setDeleteEle={setDeleteEle} setEleKey={setEleKey} setModifierType={props.setModifierType} setNewFieldContent={props.setNewFieldContent} />
                        </Box>
                    break;
                case 'text':
                    modifier =
                        <Box className={modifierList.root} key={uuid()}>
                            <TextModifier setModifierType={props.setModifierType} content={props.newFieldContent} saveContent={saveContent} />
                            <AddDelete setDeleteEle={setDeleteEle} setEleKey={setEleKey} setModifierType={props.setModifierType} setNewFieldContent={props.setNewFieldContent} />
                        </Box>
                    break;
                case 'video':
                    modifier =
                        <Box className={modifierList.root} key={uuid()}>
                            <VideoModifier setModifierType={props.setModifierType} content={props.newFieldContent} saveContent={saveContent} />
                            <AddDelete setDeleteEle={setDeleteEle} setEleKey={setEleKey} setModifierType={props.setModifierType} setNewFieldContent={props.setNewFieldContent} />
                        </Box>
                    break;
                case 'embed':
                    modifier =
                        <Box className={modifierList.root} key={uuid()}>
                            <EmbedModifier setModifierType={props.setModifierType} embedSite={props.newFieldContent} saveContent={saveContent} />
                            <AddDelete setDeleteEle={setDeleteEle} setEleKey={setEleKey} setModifierType={props.setModifierType} setNewFieldContent={props.setNewFieldContent} />
                        </Box>
                    break;
                case 'flexBlock':
                    modifier =
                        <Box className={modifierList.root} key={uuid()}>
                            <FlexModifier setModifierType={props.setModifierType} saveContent={saveContent} />
                            <AddDelete setDeleteEle={setDeleteEle} setEleKey={setEleKey} setModifierType={props.setModifierType} setNewFieldContent={props.setNewFieldContent} />
                        </Box>
                    break;
                case 'plainBlock':
                    modifier =
                        <Box className={modifierList.root} key={uuid()}>
                            <PlainBlockModifier setModifierType={props.setModifierType} saveContent={saveContent} />
                            <AddDelete setDeleteEle={setDeleteEle} setEleKey={setEleKey} setModifierType={props.setModifierType} setNewFieldContent={props.setNewFieldContent} />
                        </Box>
                    break;
                case 'floatBlock':
                    modifier =
                        <Box className={modifierList.root} key={uuid()}>
                            <FloatBlockModifier setModifierType={props.setModifierType} saveContent={saveContent} />
                            <AddDelete setDeleteEle={setDeleteEle} setEleKey={setEleKey} setModifierType={props.setModifierType} setNewFieldContent={props.setNewFieldContent} />
                        </Box>
                    break;
                case 'gridBlock':
                    modifier =
                        <Box className={modifierList.root} key={uuid()}>
                            <GridBlockModifier setModifierType={props.setModifierType} saveContent={saveContent} />
                            <AddDelete setDeleteEle={setDeleteEle} setEleKey={setEleKey} setModifierType={props.setModifierType} setNewFieldContent={props.setNewFieldContent} />
                        </Box>
                    break;
                case 'title':
                    modifier =
                        <Box className={modifierList.root} key={uuid()}>
                            <TitleBlockModifier setModifierType={props.setModifierType} saveContent={saveContent} />
                            <AddDelete setDeleteEle={setDeleteEle} setEleKey={setEleKey} setModifierType={props.setModifierType} setNewFieldContent={props.setNewFieldContent} />
                        </Box>
                    break;
                case 'dividingBlock':
                    modifier =
                        <Box className={modifierList.root} key={uuid()}>
                            <DividingBlockModifier setModifierType={props.setModifierType} saveContent={saveContent} />
                            <AddDelete setDeleteEle={setDeleteEle} setEleKey={setEleKey} setModifierType={props.setModifierType} setNewFieldContent={props.setNewFieldContent} />
                        </Box>
                    break;
                default:
                    return;
            }

            return modifier
        }
    };

    const addModifier = closure_addModifier(props.modifierList);

    useEffect(() => {
        if (blogContent.length != 0) {
            const script = document.createElement("script");
            script.src = "https://cdn.iframe.ly/embed.js";
            document.body.appendChild(script);

            return script.remove();
        }
    }, [blogContent]);

    //display auto saved content
    useEffect(() => {
        if (props.autoSavedContent.length != 0) {
            const autoSavedContentHTML = [];

            props.autoSavedContent.map((content) => {
                if (typeof content == 'string') {
                    autoSavedContentHTML.push(addModifier(parse(content)?.props?.type, parse(content)));
                }
            });

            props.setModifierList([...props.modifierList, ...autoSavedContentHTML])
        }
    }, [props.autoSavedContent]);

    useEffect(() => {
        if (props.type != '' && eleKey != '') {
            const list = modifierList.current.children;

            let eleIndex;

            for (let index = 0; index < list.length; index++) {
                list[index] === eleKey && (eleIndex = index);
            };

            if (props.modifierList.length != 0 && eleIndex + 1 != list.length) {
                const clone_list = [...props.modifierList];
                clone_list.splice(eleIndex + 1, 0, addModifier(props.type));
                props.setModifierList([...clone_list]);
            } else {
                props.setModifierList([...props.modifierList, addModifier(props.type)]);
            }
        }
    }, [props.type]);

    useEffect(() => {
        if(eleKey != null && deleteEle == true){
            const list = modifierList.current.children;

            let eleIndex;

            for (let index = 0; index < list.length; index++) {
                list[index] === eleKey && (eleIndex = index);
            };

            const clone_list = [...props.modifierList];
            clone_list.splice(eleIndex + 1, 1);
            props.setModifierList([...clone_list]);

            setTimeout(() => setDeleteEle(false));
        }
    }, [eleKey, deleteEle]);

    return (
        <Box>
            <Box
                ref={modifierList}
                id="modifierList"
                sx={{ display: 'flex', flexDirection: 'column', gap: '0 0 1rem 0' }}
            >
                {
                    props.modifierList.length != 0 && props.modifierList.map((modifier) =>
                        modifier
                    )
                }
            </Box>
        </Box>
    )
};

export default ModifierComponent