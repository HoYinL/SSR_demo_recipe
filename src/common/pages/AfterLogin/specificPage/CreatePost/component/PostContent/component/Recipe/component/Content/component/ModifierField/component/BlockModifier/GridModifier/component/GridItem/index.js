import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import InputContent from "../InputContent";
import InputImg from "../InputImg";
import AddCategories from "../AddCategories";
import { v4 as uuid } from 'uuid';
import { GridBlockStyle } from "./style";
import { Clear, Add, Cached } from "@mui/icons-material";
import { useSelector } from "react-redux";

const GridItemComponent = (props) => {
    const gridBlockStyle = GridBlockStyle();

    const textContent = useRef(null);
    const content = useRef(null);
    const gridBlock = useRef(null);

    const save = useSelector(state => state.save.save);


    const [inputText, setInputText] = useState(false);
    const [inputImg, setInputImg] = useState(false);
    const [gridCon, setCon] = useState([]);
    const [addEle, setAddEle] = useState(null);
    const [deleteEle, setDeleteEle] = useState(null);
    const [eleKey, setEleKey] = useState(null);
    const [display, setDisplay] = useState(false);

    const closure_addModifier = () => {
        let modifier = null;

        return (type, saveContent) => {
            switch (type) {
                case 'inputText':
                    modifier = <InputContent
                        key={uuid()}
                        textContent={textContent}
                        setInputImg={setInputImg}
                        setInputText={setInputText}
                        setAddEle={setAddEle}
                        setDeleteEle={setDeleteEle}
                        setEleKey={setEleKey}
                        content={saveContent}
                    />;
                    break;
                case 'inputImg':
                    modifier = <InputImg
                        key={uuid()}
                        setInputImg={setInputImg}
                        setInputText={setInputText}
                        setAddEle={setAddEle}
                        setDeleteEle={setDeleteEle}
                        setEleKey={setEleKey}
                        content={saveContent}
                    />
            }

            return modifier
        }
    };

    const add_modifier = closure_addModifier();

    useEffect(() => {
        if (addEle != null && (inputText == true || inputImg == true)) {
            const newContent = (inputText == true ? add_modifier('inputText') : add_modifier('inputImg'));

            const gridList = content.current.children;

            let eleIndex;

            for (let index = 0; index < gridList.length; index++) {
                gridList[index] === addEle && (eleIndex = index);
            };

            if (eleIndex == undefined) {
                const clone_list = [...gridCon];
                const new_list = [...clone_list, newContent];
                setCon([...new_list]);
            } else if (gridList.length != 0) {
                const clone_list = [...gridCon];
                clone_list.splice(eleIndex, 0, newContent);
                setCon([...clone_list]);
            }

            inputText == true && setInputText(false);
            inputImg == true && setInputImg(false);
        }
    }, [addEle, inputText, inputImg]);

    useEffect(() => {
        if (deleteEle == true) {
            const gridList = content.current.children;

            let eleIndex;

            for (let index = 0; index < gridList.length; index++) {
                gridList[index] === eleKey && (eleIndex = index);
            };

            const clone_gridCon = [...gridCon];
            clone_gridCon.splice(eleIndex, 1);
            setCon([...clone_gridCon]);

            setDeleteEle(false);
        }
    }, [deleteEle, eleKey]);

    useEffect(() => {
        const savedCon = [];

        if (props.savedContent != undefined) {
            props.savedContent.map((saveContent) => {
                if (saveContent != null) {
                    if (saveContent.id == "imgBox" || saveContent[0].id == "imgBox") {
                        savedCon.push(add_modifier('inputImg', saveContent));
                    } else {
                        savedCon.push(add_modifier('inputText', saveContent));
                    }
                }
            })
        }

        setCon([...savedCon]);
    }, [props.savedContent]);

    return (
        <Box
            ref={gridBlock}
            className={`${gridBlockStyle.root} content`}
            onPointerEnter={(e) => { setDisplay(true) }}
            onPointerLeave={(e) => { setDisplay(false) }}
        >
            <Box ref={content}>
                {gridCon.map((con) => con)}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <AddCategories setAddEle={setAddEle} setInputImg={setInputImg} setInputText={setInputText} />
                <Box sx={{ display: 'flex', gap: '.5rem'}}>
                    <Cached
                        title="swap element"
                        className={gridBlockStyle.icon}
                        onPointerUp={() => {
                            props.setSwapTarget(gridBlock.current);
                        }}
                    />
                    <Clear
                        title='remove grid item'
                        className={gridBlockStyle.icon}
                        onPointerUp={() => {
                            props.setDeleteEle(gridBlock.current);
                        }}
                    />
                </Box>
            </Box>

            {
                save == false && display && <Add
                    className={gridBlockStyle.addBlockIcon}
                    onPointerUp={() => {
                        props.setAddEle(gridBlock.current);
                    }}
                />
            }
        </Box>
    )
};

export default GridItemComponent