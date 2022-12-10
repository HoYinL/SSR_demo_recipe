import React, { useEffect, useState } from "react";
import { List, ListItem, Box } from "@mui/material";
import { InputTypeListStyles } from "./style";
import { InsertDeleteIconStyles } from "../InsertDeleteIcon/style";

const InputTypeListComponent = (props) => {
    const inputTypeListStyles = InputTypeListStyles();
    const insertDeleteIconStyle = InsertDeleteIconStyles();
    
    useEffect(() => {
        if(typeof window != "undefined" && props.displayToolList){
            const toolList = document.querySelector('[data-toolList="toolList"]');

            for(let index = 0; index < toolList.childNodes.length; index++){
                setTimeout(() => {
                    toolList.childNodes[index].style.opacity = '1'
                    toolList.childNodes[index].style.transform = 'translateY(0)'
                }, 150 * (index + 1))
            }
        }
    }, [props.displayToolList])

    return (
        <>
            {
                props.displayToolList && 
                    <List data-toollist="toolList" className={inputTypeListStyles.root}>
                        <ListItem 
                            title="Add an image"
                            className={`fa fa-camera-retro ${inputTypeListStyles.List}`} 
                            onPointerDown={() => {
                                props.setTransform(false);
                                props.setType('img');
                                props.setDisplayToolList(!props.displayToolList);
                            }}
                        />
                        <ListItem 
                            title="Search an image"
                            className={`fa fa-search ${inputTypeListStyles.List}`} 
                            onPointerDown={(e) => {
                                props.setTransform(false);
                                props.setType('searchImg');
                                props.setDisplayToolList(!props.displayToolList);
                            }}
                        />
                        <ListItem 
                            title="Add a video"
                            className={`fa fa-play ${inputTypeListStyles.List}`}
                            onPointerDown={(e) => {
                                props.setTransform(false);
                                props.setType('video');
                                props.setDisplayToolList(!props.displayToolList);
                            }} 
                        />
                        <ListItem 
                            title="Add an embed"
                            className={`fa fa-code ${inputTypeListStyles.List}`} 
                            onPointerDown={(e) => {
                                props.setTransform(false);
                                props.setType('embed');
                                props.setDisplayToolList(!props.displayToolList);
                            }}
                        />
                        <ListItem 
                            className={`fa fa-th ${inputTypeListStyles.ListParent}`}
                            title="Add new block"
                            sx={{position: 'relative'}}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                props.setDisplaySubtleType(true);
                            }}
                            onMouseOver={(e) => {
                                e.stopPropagation();
                                e.target.classList.add(inputTypeListStyles.hover);
                            }}
                            onMouseLeave={(e) => {
                                e.stopPropagation();
                                e.target.classList.remove(inputTypeListStyles.hover);
                            }}
                        >
                            { 
                                props.displaySubtleType === true && <Box 
                                    title="add dividing block"
                                    sx={{position: 'absolute', left: '40px', top: '0', zIndex: '200'}} 
                                    className={`fa fa-ellipsis-h ${inputTypeListStyles.subtleType}`}
                                    onPointerDown={(e) => {
                                        e.stopPropagation();
                                        props.setTransform(false);
                                        props.setType('dividingBlock');
                                        props.setDisplayToolList(!props.displayToolList);
                                        props.setDisplaySubtleType(false);
                                    }}
                                    onMouseOver={(e) => {
                                        e.stopPropagation();
                                        e.target.classList.add(inputTypeListStyles.hover);
                                    }}
                                    onMouseLeave={(e) => {
                                        e.stopPropagation();
                                        e.target.classList.remove(inputTypeListStyles.hover);
                                    }}
                                /> 
                            }
                            { 
                                props.displaySubtleType === true && <Box 
                                    title="add text block"
                                    sx={{position: 'absolute', top: '40px', zIndex: '200'}} 
                                    className={`fa fa-font ${inputTypeListStyles.subtleType}`} 
                                    onPointerDown={(e) => {
                                        e.stopPropagation();
                                        props.setTransform(false);
                                        props.setType('textFormat');
                                        props.setDisplayToolList(!props.displayToolList);
                                        props.setDisplaySubtleType(false);
                                    }}
                                    onMouseOver={(e) => {
                                        e.stopPropagation();
                                        e.target.classList.add(inputTypeListStyles.hover);
                                    }}
                                    onMouseLeave={(e) => {
                                        e.stopPropagation();
                                        e.target.classList.remove(inputTypeListStyles.hover);
                                    }}
                                /> 
                            }
                            {   
                                props.displaySubtleType === true && <Box 
                                    sx={{position: 'absolute', top: '-125%', zIndex: '200'}} 
                                    className={`fa fa-th-large  ${inputTypeListStyles.subtleType}`} 
                                    onPointerDown={(e) => {
                                        e.stopPropagation();
                                        props.setTransform(false);
                                        props.setType('blockFormat');
                                        props.setDisplayToolList(!props.displayToolList);
                                        props.setDisplaySubtleType(false);
                                    }}
                                    onMouseOver={(e) => {
                                        e.stopPropagation();
                                        e.target.classList.add(inputTypeListStyles.hover);
                                    }}
                                    onMouseLeave={(e) => {
                                        e.stopPropagation();
                                        e.target.classList.remove(inputTypeListStyles.hover);
                                    }}
                                /> 
                            }
                        </ListItem>
                </List>
            }  
        </>
    )
}

export default InputTypeListComponent