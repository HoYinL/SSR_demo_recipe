import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import {
    InputTextStyles,
    ModifierStyles,
    ListStylesObj,
    ulStylesObj,
    TextStylesObj,
    QuotesStylesObj
} from "./style";
import { FlexInputTextStyles } from "../component/Content/component/InputBlock/style";
import InsertImgIcon from "../component/Img";
import InsertContentIcon from "../component/Content";
import { fun, getPropertyStyleValue, resizeFlex } from "./function";
import ImgStyleModifier from "../../StyleModifier/ImgStyleModifer";
import parse from 'html-react-parser';
import { useDispatch, useSelector } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
import { addBlogContent } from "../../../../../../../../../../../../../../../store/blogcontentreducer";
import { getImgElement } from "../../../function";

const FlexModifierComponent = (props) => {
    const textStyles = InputTextStyles();
    const modifierStyles = ModifierStyles();
    const flexInputTextStyles = FlexInputTextStyles();

    const useref = useRef(false);
    const flexBlockContainer = useRef(null);
    const contentField = useRef(null);
    const verticalDividingLine = useRef(null);
    const Image_Block = useRef(null);
    const imgBlock = useRef(null);
    const imgBox = useRef(null);
    const imgPreviewBlock = useRef(null);
    const imgPreview = useRef(null);
    const flexBlockImg = useRef(null);
    const textContent = useRef(null);
    const caption = useRef(null);

    const [displayImg, setDisplayImg] = useState('');
    const [saveImgData, setSaveImgData] = useState(null);
    const [imgStyle, setImgStyle] = useState(undefined);
    const [wrapped, setWrapped] = useState(false);
    const [displayLine, setDisplayLine] = useState(null);
    const [breakpoints, setBreakpoints] = useState(null);
    const [modifier, setModifier] = useState(null);
    const [settled, setSettled] = useState(null);
    const [modifyImg, setModifyImg] = useState(false);
    const [isUpslash, setIsUpslash] = useState(false);
    const [changeBreakPoint, setChangeBreakPoint] = useState(false);
    const [captionText, setCaptionText] = useState('');
    const [altText, setAltText] = useState('');
    const [defaultCaption, setDefaultCaption] = useState('');

    const save = useSelector(state => state.save.save);

    const dispatch = useDispatch();

    useEffect(() => {
        if(useref.current == false){
            useref.current = true
        } else if (save === true) {
                dispatch(addBlogContent(renderToStaticMarkup(
                    <Box
                        type="flexBlock"
                        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' }}
                    >
                        <Box
                        style={{
                            maxWidth: `${getPropertyStyleValue(flexBlockImg.current, 'width')}px`,
                        }}
                        >
                            <Box
                                component='img'
                                src={displayImg}
                                style={{
                                    maxWidth: `${getPropertyStyleValue(imgBlock.current, 'width')}px`,
                                    maxHeight: `${getPropertyStyleValue(imgBox.current, 'height')}px`,
                                    width: '100%'
                                }}
                            />
                            {caption.current != null && parse(caption.current.outerHTML)}
                        </Box>

                        <Box
                            style={{
                                width: `${getPropertyStyleValue(textContent.current, 'width')}px`,
                                maxWidth: '100%',
                                flexGrow: '1',
                            }}
                        >
                            {parse(textContent.current.childNodes[0].outerHTML)}
                        </Box>
                    </Box>
                )))
        }
    }, [save]);

    useEffect(() => {
        if (typeof window != "undefined") {
            setSettled(true);
        }
    }, []);

    useEffect(() => {
        if (settled != null) {
            const observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    if (entry.target.offsetLeft < 100 && isUpslash === false) {
                        setChangeBreakPoint(true);

                        if (imgBlock.current != null) {
                            imgBlock.current.classList.add(modifierStyles.heightAuto);
                            imgBox.current.classList.add(modifierStyles.heightAuto);

                            if (getPropertyStyleValue(imgBlock.current, 'width') === getPropertyStyleValue(Image_Block.current, 'width') && getPropertyStyleValue(imgBlock.current, 'width') >= getPropertyStyleValue(Image_Block.current, 'width')) {
                                !imgPreviewBlock.current.classList.contains(modifierStyles.heightAuto) && imgPreviewBlock.current.classList.add(modifierStyles.heightAuto);
                                if (getPropertyStyleValue(imgBox.current, 'height') != getPropertyStyleValue(imgPreviewBlock.current, 'height')) {
                                    imgPreviewBlock.current.classList.remove(modifierStyles.heightAuto)
                                }
                            } else {
                                imgPreviewBlock.current.classList.contains(modifierStyles.heightAuto) && imgPreviewBlock.current.classList.remove(modifierStyles.heightAuto);
                                if (getPropertyStyleValue(imgBox.current, 'height') != getPropertyStyleValue(imgPreviewBlock.current, 'height')) {
                                    imgPreviewBlock.current.classList.add(modifierStyles.heightAuto)
                                }
                            }
                        }

                    } else {
                        setChangeBreakPoint(false);

                        if (imgBlock.current != null) {
                            imgBlock.current.classList.remove(modifierStyles.heightAuto);
                            imgBox.current.classList.remove(modifierStyles.heightAuto);
                            imgPreviewBlock.current.classList.contains(modifierStyles.heightAuto) && imgPreviewBlock.current.classList.remove(modifierStyles.heightAuto);
                        }
                    }
                }
            });

            observer.observe(contentField.current);
        }
    }, [settled, isUpslash]);

    useEffect(() => {
        if (changeBreakPoint === true && isUpslash == false) {
            setBreakpoints(window.innerWidth);
        }
    }, [changeBreakPoint, isUpslash]);

    useEffect(() => {
            if (wrapped === false) setDisplayLine(true)
            else if (wrapped === true) setDisplayLine(false)
            else setDisplayLine(0);
    }, [wrapped]);

    useEffect(() => {
        if (useref.current == false) {
            useref.current = true;
        } else {
            const fun = (ModifierStyles, setWrapped, Breakpoints) => {
                const modifierStyles = ModifierStyles;
                const breakpoints = Breakpoints;

                return (e) => {
                    if (getPropertyStyleValue(flexBlockImg.current, 'width') > getPropertyStyleValue(flexBlockImg.current, 'width')) {
                        flexBlockImg.current.classList.add(modifierStyles.minWidth);
                    }

                    if (window.innerWidth > breakpoints) setWrapped(false)
                    else if (window.innerWidth < breakpoints) setWrapped(true)
                    else setWrapped(null);
                }
            }

            const closure_fun = fun(modifierStyles, setWrapped, breakpoints);

            if (window.innerWidth > breakpoints) setWrapped(false)
            else if (window.innerWidth < breakpoints) setWrapped(true)
            else setWrapped(null)

            breakpoints != null ? window.addEventListener('resize', closure_fun) : window.removeEventListener('resize', closure_fun);
        }
    }, [breakpoints])

    useEffect(() => {
        if (useref.current === false) {
            useref.current = true;
        } else if (modifier != null) {
            if (verticalDividingLine.current != null) {
                let closure_fun = fun(modifier, verticalDividingLine.current);

                flexBlockContainer.current.addEventListener('pointermove', closure_fun);
                flexBlockContainer.current.addEventListener('touchmove', closure_fun);

                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    flexBlockContainer.current.addEventListener('touchend', (e) => {
                        verticalDividingLine.current.style.transform = `translateX(0px)`;
                        resizeFlex(
                            e.changedTouches[0].pageX,
                            modifier.clientX,
                            flexBlockImg.current,
                            Image_Block.current,
                            contentField.current,
                            flexBlockContainer.current,
                            verticalDividingLine.current,
                        );
                        setBreakpoints(null);
                        flexBlockContainer.current.removeEventListener('touchmove', closure_fun);
                    }, { once: true });
                } else {
                    flexBlockContainer.current.addEventListener('pointerup', (e) => {
                        verticalDividingLine.current.style.transform = `translateX(0px)`;
                        resizeFlex(
                            e.clientX,
                            modifier.clientX,
                            flexBlockImg.current,
                            Image_Block.current,
                            contentField.current,
                            flexBlockContainer.current,
                            verticalDividingLine.current,
                        );
                        setBreakpoints(null);
                        flexBlockContainer.current.removeEventListener('pointermove', closure_fun);
                    }, { once: true });
                }
            }
        }
    }, [modifier]);

    // case of auto-saved
    useEffect(() => {
        if(props.saveContent != undefined){
            const saveData = getImgElement(props.saveContent.props.children[0]);
            (saveData);
            setSaveImgData(saveData[0]);
            setCaptionText(saveData[1]?.children || '');
        }
    }, [props.saveCotent]);

    useEffect(() => {
        if(defaultCaption != ''){
            setCaptionText(defaultCaption);
            setDefaultCaption('');
        }
    }, [defaultCaption]);

    useEffect(() => {
        if(saveImgData != null){
            setDisplayImg(saveImgData?.src);
            setAltText(saveImgData?.alt);
            setImgStyle(saveImgData?.style);
        }
    }, [saveImgData]);

    return (
        <>
            {
                <Box
                    className={modifierStyles.root}
                    ref={flexBlockContainer}
                    style={props.saveContent != undefined ? { minHeight: `${getImgElement(props.saveContent.props.children[0])[0].style.maxHeight}` }: {}}
                >
                    <Box
                        ref={flexBlockImg}
                        id="flexBlockImg"
                        style={props.saveContent != undefined ? { flexGrow: '1', padding: '1rem', width: `${props.saveContent.props.children[0].props.style.maxWidth}`}: {}}
                        className={displayLine == true ? (props.saveContent == undefined && modifierStyles.nonWrappedImgBlock) : (props.saveContent == undefined && modifierStyles.wrappedImgBlock)}
                    >
                        {
                            displayImg === '' && <InsertImgIcon
                                modifyImg={modifyImg}
                                setDisplayImg={setDisplayImg}
                                setDisplayLine={setDisplayLine}
                                displayLine={displayLine}
                                setIsUpslash={setIsUpslash}
                                setDefaultCaption={setDefaultCaption}
                            />
                        }

                        {
                            displayImg !== '' &&
                            <Box
                                className={modifierStyles.imgParent}
                            >
                                <ImgStyleModifier
                                    content={displayImg}
                                    setModifyImg={setModifyImg}
                                    setDisplayImg={setDisplayImg}
                                    Image_Block={Image_Block}
                                    imgBlock={imgBlock}
                                    imgBox={imgBox}
                                    imgPreviewBlock={imgPreviewBlock}
                                    imgPreview={imgPreview}
                                    imgCaption={caption}
                                    style={imgStyle}
                                    caption={captionText}
                                    alt={altText}
                                />
                            </Box>
                        }
                    </Box>

                    {
                        displayLine === true && <Box
                            className={modifierStyles.verticalDividingLine}
                            ref={verticalDividingLine}
                        >
                            <Box
                                className={modifierStyles.flexController}
                                onPointerDown={(e) => {
                                    setModifier({
                                        originalOffset: e.target.parentNode.offsetLeft,
                                        clientX: e.clientX
                                    });
                                }}
                            />
                        </Box>
                    }
                    {displayLine === false && <Box className={modifierStyles.horizontalDividingLine} />}

                    <Box
                        ref={contentField}
                        style={props.saveContent != undefined ? {width: props.saveContent.props.children[1].props.style.width, flexGrow: '1'}: {}}
                        className={displayLine == true ? modifierStyles.wrappedContentField : modifierStyles.nonWrappedContentField}
                    >
                        <InsertContentIcon
                            className={textStyles.root}
                            ListStylesObj={ListStylesObj}
                            ulStylesObj={ulStylesObj}
                            TextStylesObj={TextStylesObj}
                            QuotesStylesObj={QuotesStylesObj}
                            InputTextStyles={flexInputTextStyles}
                            textContent={textContent}
                            saveTextContent={props.saveContent?.props.children[1].props.children}
                        />
                    </Box>
                </Box>
            }
        </>
    )
};

export default FlexModifierComponent