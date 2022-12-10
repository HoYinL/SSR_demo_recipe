import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { getPropertyStyleValue } from "../FlexModifier/function";
import InsertContentIcon from "../component/Content";
import InsertImgIcon from "../component/Img";
import {
    InputTextStyles,
    ListStylesObj,
    ulStylesObj,
    TextStylesObj,
    QuotesStylesObj,
    FloatBoxStyle
} from "./style";
import ImgStyleModifier from "../../StyleModifier/ImgStyleModifer";
import FloatImg from './component/FloatImg'
import { FlexInputTextStyles } from "../component/Content/component/InputBlock/style";
import parse from 'html-react-parser';
import { useDispatch, useSelector } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
import { addBlogContent } from "../../../../../../../../../../../../../../../store/blogcontentreducer";
import { getImgElement } from "../../../function";

const FloatBlockModifier = (props) => {
    const floatBoxStyle = FloatBoxStyle();
    const textStyles = InputTextStyles();
    const flexInputTextStyles = FlexInputTextStyles();

    const [displayCross, setDisplayCross] = useState(false);
    const [displayImg, setDisplayImg] = useState('');
    const [displayLine, setDisplayLine] = useState(null);
    const [modifyImg, setModifyImg] = useState(false);
    const [isUpslash, setIsUpslash] = useState(false);
    const [minHeight, setMinHeight] = useState({ minHeight: '250px' });
    const [float, setFloat] = useState({ float: 'right' });
    const [borderNone, setBorderNone] = useState({ borderRight: 'none !important' });
    const [margin, setMargin] = useState({ margin: '0 0 1rem 1rem' });
    const [saveImgData, setSaveImgData] = useState(null);
    const [imgStyle, setImgStyle] = useState(null);
    const [captionText, setCaptionText] = useState('');
    const [altText, setAltText] = useState('');
    const [defaultCaption, setDefaultCaption] = useState('');

    const Image_Block = useRef(null);
    const imgBlock = useRef(null);
    const imgBox = useRef(null);
    const imgPreviewBlock = useRef(null);
    const imgPreview = useRef(null);
    const FloatTextBlock = useRef(null);
    const FloatBlock = useRef(null);
    const FloatImgBlock = useRef(null);
    const textContent = useRef(null);
    const imgCaption = useRef(null);

    const save = useSelector(state => state.save.save);

    const dispatch = useDispatch();

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                getPropertyStyleValue(entry.target, 'height') > getPropertyStyleValue(FloatImgBlock.current, 'height') ?
                    setDisplayCross(true) :
                    setDisplayCross(false);
            }
        });

        observer.observe(FloatTextBlock.current);
    }, []);

    useEffect(() => {
        if (displayImg != '') {
            const observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    setMinHeight({ minHeight: `${getPropertyStyleValue(entry.target, 'height') + 50}px` });
                    getPropertyStyleValue(entry.target, 'height') > getPropertyStyleValue(FloatTextBlock.current, 'height') ?
                        setDisplayCross(false) :
                        setDisplayCross(true);
                }
            })

            observer.observe(FloatImgBlock.current);
        }
    }, [displayImg]);

    useEffect(() => {
        if (float.float === 'right') {
            setBorderNone({ borderRight: 'none !important' });
            setMargin({ margin: '0 0 1rem 1rem !important' })
        } else {
            setBorderNone({ borderLeft: 'none !important' });
            setMargin({ margin: '0 1rem 1rem 0 !important' })
        }
    }, [float]);

    useEffect(() => {
        if (save === true) {
            dispatch(addBlogContent(renderToStaticMarkup(
                <Box type="floatBlock">
                    <Box
                        style={{
                            ...float,
                            padding: `0 1rem`,
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                    >
                        <Box
                            component='img'
                            src={displayImg}
                            style={{ width: `${getPropertyStyleValue(imgBlock.current, 'width')}px`, maxHeight: `${getPropertyStyleValue(imgBlock.current, 'height')}px` }}
                        />
                        {imgCaption.current != null && parse(imgCaption.current.outerHTML)}
                    </Box>
                    <Box
                        sx={{ margin: '1rem 0' }}
                    >
                        {textContent.current != null && parse(textContent.current.childNodes[0].outerHTML)}
                    </Box>
                </Box>
            )))
        }
    }, [save]);

    useEffect(() => {
        if (props.saveContent != undefined) {
            const SaveData = getImgElement(props.saveContent.props.children[0]);
            setFloat({ float: props.saveContent.props.children[0].props.style.float });

            setSaveImgData(SaveData[0]);
            setCaptionText(SaveData[1]?.children || '');
        }
    }, [props.saveCotent]);

    useEffect(() => {
        if(defaultCaption != ''){
            setCaptionText(defaultCaption);
            setDefaultCaption('');
        }
    }, [defaultCaption]);


    useEffect(() => {
        if (saveImgData != null) {
            setDisplayImg(saveImgData?.src);
            setAltText(saveImgData?.alt)
            setImgStyle(saveImgData?.style);
        }
    }, [saveImgData]);

    return (
        <>
            {
                <>
                    <Box
                        className={floatBoxStyle.floatSetter}
                    >
                        <FloatImg
                            float={'left'}
                            setFloat={setFloat}
                        />
                        <FloatImg
                            float={'right'}
                            setFloat={setFloat}
                        />
                    </Box>

                    <Box
                        ref={FloatBlock}
                        className={floatBoxStyle.floatBlock}
                        sx={{ ...minHeight }}
                    >
                        <Box
                            ref={FloatImgBlock}
                            className={floatBoxStyle.floatImgBlock}
                            sx={{ ...borderNone, ...float, ...margin }}
                        >
                            {
                                displayImg === '' && <InsertImgIcon
                                    modifyImg={modifyImg}
                                    setDisplayImg={setDisplayImg}
                                    setDisplayLine={setDisplayLine}
                                    displayLine={true}
                                    setIsUpslash={setIsUpslash}
                                    setDefaultCaption={setDefaultCaption}
                                />
                            }

                            {
                                displayImg !== '' &&
                                <ImgStyleModifier
                                    content={displayImg}
                                    setModifyImg={setModifyImg}
                                    setDisplayImg={setDisplayImg}
                                    Image_Block={Image_Block}
                                    imgBlock={imgBlock}
                                    imgBox={imgBox}
                                    imgPreviewBlock={imgPreviewBlock}
                                    imgPreview={imgPreview}
                                    imgCaption={imgCaption}
                                    style={imgStyle}
                                    caption={captionText}
                                    alt={altText}
                                />
                            }
                        </Box>

                        <Box
                            ref={FloatTextBlock}
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
                                display={displayCross}
                            />
                        </Box>

                    </Box>
                </>
            }
        </>
    )
}

export default FloatBlockModifier