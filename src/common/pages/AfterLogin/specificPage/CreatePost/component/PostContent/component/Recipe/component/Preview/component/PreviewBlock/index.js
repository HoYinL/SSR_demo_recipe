import React, { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import parse from 'html-react-parser';
import { isChildElement } from "../../../../../../../../../../commonComponent/function";
import { PreviewStyle, previewBlock } from "../../style";
import { getPropertyStyleValue } from "../../../Content/component/ModifierField/component/BlockModifier/FlexModifier/function";
import { resizeContainer } from "../../function";
import { Close } from "@mui/icons-material";
import { InsertTypeIconStyles, InsertIconStyle } from "../../../Content/component/ModifierField/component/BlockModifier/component/style";
import { useDispatch } from "react-redux";
import { setSave } from "../../../../../../../../../../../../store/savereducer";
import { clearBlogContent } from "../../../../../../../../../../../../store/blogcontentreducer";

const PreviewBlockComponent = (props) => {
    const dispatch = useDispatch();

    const previewStyle = PreviewStyle();
    const insertTypeIconStyles = InsertTypeIconStyles();
    const insertIconStyle = InsertIconStyle();

    const PreviewBlock = useRef(null);
    const PreviewContainer = useRef(null);
    const Preview = useRef(null);
    const modifierBlock = useRef(null);
    const rightController = useRef(null);
    const leftController = useRef(null);

    const [ width, setWidth ] = useState(0);
    const [ height, setHeight ] = useState(0);
    const [ originalClientX, setOriginalClientX ] = useState(null);

    useEffect(() => {
        dispatch(setSave(true));

        PreviewContainer.current.addEventListener('pointerdown', (e) => {
            if(!isChildElement(e.target, Preview.current) && !isChildElement(e.target, modifierBlock.current)){
                props.setPreview(false);
                dispatch(setSave(false));
                dispatch(clearBlogContent([]));
            }
        });

        setTimeout(() => {
            setWidth({width: `${getPropertyStyleValue(Preview.current, 'width')}px`});
            setHeight({height: `${getPropertyStyleValue(Preview.current, 'height')}px`});
        })
    }, []);

    useEffect(() => {
        if(originalClientX != null){
            const closure_resizeContainer = resizeContainer(
                    modifierBlock.current, 
                    Preview.current,
                    originalClientX.controller, 
                    originalClientX
                )
            
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                PreviewContainer.current.addEventListener('touchmove', closure_resizeContainer);
                PreviewContainer.current.addEventListener('touchend', () => {
                    PreviewContainer.current.removeEventListener('touchmove', closure_resizeContainer)
                }, { once: true });
            } else {
                PreviewContainer.current.addEventListener('pointermove', closure_resizeContainer);
                PreviewContainer.current.addEventListener('pointerup', () => {
                    PreviewContainer.current.removeEventListener('pointermove', closure_resizeContainer)
                }, { once: true });
            }
        }
    }, [originalClientX]);

    useEffect(() => {
        if(props.blogContent.length != 0){
            const script = document.createElement("script");
            script.src = "https://cdn.iframe.ly/embed.js";
            document.body.appendChild(script);
            
            return script.remove();
        }
    }, [props.blogContent]);

    return(
    <>
        <Box
            ref={PreviewContainer}
            className={previewStyle.previewContainer}
        >
            <Box ref={modifierBlock} sx={{...width, ...height, position: 'absolute'}}>
                <Box
                    ref={leftController}
                    onPointerDown={(e) => {
                        setOriginalClientX({ clientX: e.clientX, controller: leftController.current});
                    }} 
                    id="leftController" 
                    className={`${previewStyle.controllerBlock} ${previewStyle.leftBlock}`}
                />
                <Box 
                    ref={rightController}
                    onPointerDown={(e) => {
                        setOriginalClientX({ clientX: e.clientX, controller: rightController.current});
                    }}
                    id="rightController" 
                    className={`${previewStyle.controllerBlock} ${previewStyle.rightBlock}`}
                />
            </Box>

            <Box 
                ref={Preview} 
                className={previewStyle.previewBlock}
            >
                <Box
                    ref={PreviewBlock}
                    sx={previewBlock}
                >
                    {
                        <Close 
                            onPointerUp={(e) => {
                                props.setPreview(false);
                                dispatch(setSave(false));
                                dispatch(clearBlogContent([]));
                            }} 
                            sx={{margin: '0 0 0 auto !important'}}
                            className={`${insertTypeIconStyles.cross} ${insertIconStyle.root}`} 
                        />
                    }
                    {
                        props.blogContent.map((content) => parse(content))
                    }
                </Box>
            </Box>
        </Box>
    </>
    )
};

export default PreviewBlockComponent