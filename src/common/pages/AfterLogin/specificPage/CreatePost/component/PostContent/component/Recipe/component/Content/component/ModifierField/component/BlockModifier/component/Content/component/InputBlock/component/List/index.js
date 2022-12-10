import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { ListStylesObj, ListStyles } from "./style";
import TextStyleModifier from "../../../../../../../StyleModifier/TextStyleModifier";
import { v4 as uuid } from 'uuid';
import { useSelector } from "react-redux";
import Add from "./component/Add";
import Delete from "./component/Delete";
import { Clear } from "@mui/icons-material";

const ListInputComponent = (props) => {
    const listStyles = ListStyles();

    const list = useRef(null);
    const contentList = useRef(null);

    const [ulList, setUlList] = useState([]);
    const [count, setCount] = useState(1);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState([]);
    const [target, setTarget] = useState(null);
    const [addEle, setAddEle] = useState(null);
    const [deleteEle, setDeleteEle] = useState(null);

    const closure_addModifier = () => {
        return (saveContent) => {
            return <li key={uuid()} style={{position: 'relative'}}>
                <TextStyleModifier blocktype={'list'} text={saveContent?.children} style={ListStylesObj.font} />
                <Add setAddEle={setAddEle} setCount={setCount}/>
                <Delete setDeleteEle={setDeleteEle}/>
            </li>
        }
    };

    const addModifier = closure_addModifier();

    useEffect(() => {
        if(props.target == undefined){
            setTarget(content.current?.parentNode);
        } else {
            setTarget(props.target);
        }
    }, []);

    useEffect(() => {
        if(props.saveContent != undefined){
            setTitle(props.saveContent.children[0].children);
            setContent([...props.saveContent.children[1]]);
        }
    }, [props.saveContent]);

    useEffect(() => {
    if(content.length != 0){
        const savedLi = [];
        content.map((liContent) => {
            savedLi.push(addModifier(liContent));
        })

        setUlList([...savedLi]);
    }
    }, [content]);

    useEffect(() => {
        if(count != 0){
            setUlList([addModifier()]);
        }
    }, [count])

    useEffect(() => {
        if(addEle != null){
            const liList = list.current.children;

            let eleIndex;

            for (let index = 0; index < liList.length; index++) {
                liList[index] === addEle && (eleIndex = index);
            };

            if(eleIndex == undefined){
                const clone_list = [...content];
                const new_list = [...clone_list, addModifier()];
                setContent([...new_list]);
            } else if (liList.length != 0 && eleIndex + 1 != liList.length) {
                const clone_list = [...content];
                clone_list.splice(eleIndex, 0, addModifier());
                setContent([...clone_list]);
            } else {
                setContent([...content, addModifier()]);
            }
        }
    }, [addEle]);

    useEffect(() => {
        if(deleteEle != null){
            const liList = list.current.children;

            let eleIndex;

            for (let index = 0; index < liList.length; index++) {
                liList[index] === deleteEle && (eleIndex = index);
            };

            const clone_list = [...ulList];
            clone_list.splice(eleIndex, 1);

            setUlList([...clone_list]);
        }
    }, [deleteEle])

    return (
        <>
            <Box ref={contentList} type="list" sx={{ position: 'relative', display: 'flex', flexDirection: 'column', margin: '0 0 .5rem 0' }}>
                <TextStyleModifier blocktype={'list'} type={"h2"} text={title} style={ListStylesObj.font} />

                <ul ref={list} style={{ listStyleType: 'circle', width: 'auto', margin: '0' }}>
                    {ulList.length != 0 && ulList.map((li) => li)}
                </ul>

                <Clear 
                    className={`${listStyles.add} ${listStyles.absolute}`}
                    onPointerUp={(e) => {
                        props.setEleKey(target);
                        props.setDeleteEle(true);
                    }}
                />
            </Box>
        </>
    )
};

export default React.memo(ListInputComponent);