import React, { useState, useEffect, useRef } from "react";
import { Box, List, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { GridBlockStyles, gridBox } from "./style";
import GridItem from "./component/GridItem";
import parse from 'html-react-parser'
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
import { addBlogContent } from "../../../../../../../../../../../../../../../store/blogcontentreducer";
import { getElementChildren, isGridBlock } from "./function";
import { getPropertyStyleValue } from "../FlexModifier/function";
import { GridBlockStyle } from "./component/GridItem/style";

const GridBlockModifierComponent = (props) => {
    const gridBlockStyle = GridBlockStyle();

    const slidebar = useRef(null);
    const numberInput = useRef(null);
    const gridBlock = useRef(null);
    const useref = useRef(false);
    const gridContainer = useRef(null);

    const gridBlockStyles = GridBlockStyles();

    const [count, setCount] = useState(0);
    const [gridBlockArray, setGridBlockArray] = useState([]);
    const [minWidth, setMinWidth] = useState(250);
    const [savedContent, setSavedContent] = useState([]);
    const [gridTemplateColumns, setGridTemplateColumns] = useState(null);
    const [deleteEle, setDeleteEle] = useState(null);
    const [addEle, setAddEle] = useState(null);
    const [swapTarget, setSwapTarget] = useState(null);

    const save = useSelector(state => state.save.save);

    const dispatch = useDispatch();

    const add_GridBlock = (content) => {
        return (
            <GridItem
                setSwapTarget={setSwapTarget}
                setAddEle={setAddEle}
                key={uuid()}
                setDeleteEle={setDeleteEle}
                setMinWidth={setMinWidth}
                savedContent={content}
            />
        )
    };

    useEffect(() => {
        if (save === true) {
            const content = gridBlock.current.getElementsByClassName('content');
            const gridListBlock = [];

            for (let index = 0; index < content.length; index++) {
                gridListBlock.push(content[index].childNodes[0]);
            };

            const gridList = gridContainer.current.children;

            for (let index = 0; index < gridList.length; index++) {
                gridList[index].classList.contains('content') && 
                gridList[index] != swapTarget &&  
                gridList[index].classList.remove(gridBlockStyle.cover);
            };

            dispatch(addBlogContent(renderToStaticMarkup(
                <Box
                    type="gridBlock"
                    style={{
                        ...gridBox,
                        gridTemplateColumns: `repeat(auto-fit, minmax(auto, ${minWidth}px))`
                    }}
                >
                    {
                        gridListBlock.map((gridItem) => parse(gridItem.outerHTML))
                    }
                </Box>
            )))
        }
    }, [save]);

    useEffect(() => {
        setGridBlockArray([...gridBlockArray, add_GridBlock()])
    }, [count]);

    useEffect(() => {
        if(deleteEle != null){
            const gridList = gridContainer.current.children;

            let eleIndex;

            for (let index = 0; index < gridList.length; index++) {
                gridList[index] === deleteEle && (eleIndex = index);
            };

            const clone_gridBlockArray = [...gridBlockArray];
            clone_gridBlockArray.splice(eleIndex, 1);
            setGridBlockArray([...clone_gridBlockArray]);

            setDeleteEle(null);
        }
    }, [deleteEle]);

    useEffect(() => {
        if(addEle != null){
            const gridList = gridContainer.current.children;

            let eleIndex;

            const newContent = add_GridBlock();

            for (let index = 0; index < gridList.length; index++) {
                gridList[index] === addEle && (eleIndex = index);
            };

            if (eleIndex == undefined) {
                const clone_gridBlockArray = [...gridBlockArray];
                const new_list = [...clone_gridBlockArray, newContent];
                setGridBlockArray([...new_list]);
            } else if(eleIndex == 0){
                setGridBlockArray([newContent, ...gridBlockArray]);
            } else if (gridList.length != 0 && eleIndex + 1 != gridList.length) {
                const clone_list = [...gridBlockArray];
                clone_list.splice(eleIndex - 1, 0, newContent);
                setGridBlockArray([...clone_list]);
            } else {
                setGridBlockArray([...gridBlockArray, newContent]);
            }
        }
    }, [addEle])

    useEffect(() => {
        const savedGridItemData = [];

        if (props.saveContent != undefined) {
            if (props.saveContent.props.children instanceof Array) {
                props.saveContent.props.children.map(child => {
                    savedGridItemData.push(getElementChildren(child));
                })
            } else {
                savedGridItemData.push(getElementChildren(props.saveContent.props.children));
            };

            setGridTemplateColumns({gridTemplateColumns: props.saveContent.props.style.gridTemplateColumns});
            setTimeout(() => {
                const gridItem = gridBlock.current.getElementsByClassName('content')[0];
                setMinWidth(getPropertyStyleValue(gridItem, "width"));
            })
        };
        
        setSavedContent([...savedGridItemData]);
    }, [props.saveContent]);

    useEffect(() => {
        if (savedContent.length != 0) {
            const savedContentBlock = [];

            savedContent.map((content) => {
                return content != undefined && savedContentBlock.push(add_GridBlock(content))
            });

            setGridBlockArray([...savedContentBlock]);
        };
    }, [savedContent]);

    useEffect(() => {
        slidebar.current.addEventListener('input', (e) => {
            setMinWidth(e.target.value);
        });

        numberInput.current.addEventListener('input', (e) => {
            setMinWidth(e.target.value);
        })
    }, []);

    useEffect(() => {
        if(useref.current === false && props.saveContent != undefined){
            useref.current = true;
        } else {
            setGridTemplateColumns({gridTemplateColumns: `repeat(auto-fill, minmax(auto, ${minWidth}px))`});
        };
    }, [minWidth]);

    useEffect(() => {
        const closure_swapFun = (swap_target, gridItemList) => {
            const swapTarget = swap_target;
            const grid_list = gridItemList;

            return (e) => {
                const swapedTarget = isGridBlock(e.target, 'content');
                if (swapedTarget) {
                    const gridList = gridContainer.current.children;
                    const clone_gridList = [...grid_list];
                    let swapEleIndex;
                    let swapedTargetIndex;

                    for (let index = 0; index < gridList.length; index++) {
                        gridList[index] === swapedTarget && (swapedTargetIndex = index);
                        gridList[index] === swapTarget && (swapEleIndex = index);
                    };

                    clone_gridList[swapEleIndex] = grid_list[swapedTargetIndex];
                    clone_gridList[swapedTargetIndex] = grid_list[swapEleIndex];
                    setGridBlockArray([...clone_gridList]);
                    setSwapTarget(null);
                }
            }
        }

        const gridList = gridContainer.current.children;

        if(swapTarget != null){
            for(let index = 0; index < gridList.length; index++){
                gridList[index].classList.contains('content') && 
                gridList[index] != swapTarget && 
                gridList[index].classList.add(gridBlockStyle.cover);
            };

            const swapFun = closure_swapFun(swapTarget, gridBlockArray);

            gridContainer.current.addEventListener('pointerdown', swapFun);
            gridContainer.current.addEventListener('pointerdown', (e) => {
                isGridBlock(e.target, 'content') && gridContainer.current.removeEventListener('pointerdown', swapFun)
            });
        } else {
            for (let index = 0; index < gridList.length; index++) {
                gridList[index].classList.contains('content') && 
                gridList[index] != swapTarget &&  
                gridList[index].classList.remove(gridBlockStyle.cover);
            };
        }
    }, [swapTarget])


    return (
        <Box ref={gridBlock}>
            <Box className={gridBlockStyles.widthModifier}>
                <input
                    className={`${gridBlockStyles.slider} ${gridBlockStyles.input}`}
                    ref={slidebar}
                    type="range"
                    min="250"
                    max="800"
                    defaultValue={minWidth}
                />

                <Box className={gridBlockStyles.input}>
                    <Typography sx={{ fontFamily: 'Times', padding: '0 .25rem' }}>{`Grid-item width: `}</Typography>
                    <input
                        ref={numberInput}
                        type="number"
                        name="Width"
                        min="250"
                        max="800"
                        value={minWidth}
                    />
                </Box>
            </Box>

            <List
                className={gridBlockStyles.root}
                style={gridTemplateColumns}
                ref={gridContainer}
            >
                {
                    gridBlockArray.map((GridItem) => GridItem)
                }
                <Box
                    className={gridBlockStyles.addBlock}
                    onPointerUp={(e) => setCount(value => value + 1)}
                >
                    <Add />
            </Box>
            </List>
        </Box>
    )
}

export default GridBlockModifierComponent