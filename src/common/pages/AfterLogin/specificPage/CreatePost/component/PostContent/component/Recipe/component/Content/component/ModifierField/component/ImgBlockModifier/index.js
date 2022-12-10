import React, { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import ImgStyleModifier from '../StyleModifier/ImgStyleModifer'
import { imgBlockStyle } from "./style";
import parse from 'html-react-parser';
import { useDispatch, useSelector } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
import { addBlogContent } from "../../../../../../../../../../../../../../store/blogcontentreducer";
import { getImgElement } from "../../function";

const ImgBlockModifier = (props) => {
    const [displayImg, setDisplayImg] = useState('');
    const [saveImgData, setSaveImgData] = useState(null);
    const [imgStyle, setImgStyle] = useState(undefined);
    const [captionText, setCaptionText] = useState('');
    const [altText, setAltText] = useState('');

    const Image_Block = useRef(null);
    const imgBlock = useRef(null);
    const imgBox = useRef(null);
    const imgPreviewBlock = useRef(null);
    const imgPreview = useRef(null);
    const caption = useRef(null);
    const AltText = useRef(null);

    const save = useSelector(state => state.save.save);

    const dispatch = useDispatch();

    useEffect(() => {
        if (save === true) {
            dispatch(addBlogContent(renderToStaticMarkup(
                <Box
                    style={imgBlockStyle}
                    type="img"
                >
                    {parse(imgBox.current.outerHTML)}
                    {parse(caption.current.outerHTML)}
                </Box>
            )));
        }
    }, [save]);

    useEffect(() => {
        if (props.saveContent != undefined) {
            const saveData = getImgElement(props.saveContent);
            setAltText(saveData[0]?.alt);
            setSaveImgData(saveData[0]);
            setCaptionText(saveData[1]?.children || '');
        } else {
            setDisplayImg(props.content.props.src);
            props.content.props.caption != undefined && setCaptionText(props.content.props.caption);
        }
    }, [props.saveContent]);

    useEffect(() => {
        if (saveImgData != null) {
            setDisplayImg(saveImgData.src);
            setImgStyle(saveImgData.style);
        }
    }, [saveImgData]);

    return (
        <ImgStyleModifier
            setModifierType={props.setModifierType}
            content={displayImg}
            Image_Block={Image_Block}
            imgBlock={imgBlock}
            imgBox={imgBox}
            imgPreviewBlock={imgPreviewBlock}
            imgPreview={imgPreview}
            imgCaption={caption}
            AltText={AltText}
            style={imgStyle}
            caption={captionText}
            alt={altText}
        />
    )

};

export default ImgBlockModifier