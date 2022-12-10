import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import TextStyleModifier from "../StyleModifier/TextStyleModifier";
import { captionStyle } from "../StyleModifier/ImgStyleModifer/style";
import { VideoModifierStyles } from "./style";
import parse from 'html-react-parser';
import { renderToStaticMarkup } from "react-dom/server"
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addBlogContent } from "../../../../../../../../../../../../../../store/blogcontentreducer";
import { getTextElement } from "../../function";
import ImgStyleModifier from "../StyleModifier/ImgStyleModifer";
import { getPropertyStyleValue } from "../BlockModifier/FlexModifier/function";
import { extract } from 'oembed-parser';

const VideoModifierComponent = (props) => {
    const useref = useRef(false);
    const Image_Block = useRef(null);
    const imgBlock = useRef(null);
    const imgBox = useRef(null);
    const imgPreviewBlock = useRef(null);
    const imgPreview = useRef(null);
    const imgCaption = useRef(null);
    const AltText = useRef(null);
    const modifierStyle = VideoModifierStyles();
    const videoCaption = useRef(null);

    const [video, setVideo] = useState(null);
    const [captionText, setCaptionText] = useState('');
    const [displayImg, setDisplayImg] = useState('');
    const [link, setLink] = useState('');
    const [style, setStyle] = useState({});

    const save = useSelector(state => state.save.save);

    const dispatch = useDispatch();

    useEffect(() => {
        if(useref.current == false){
            useref.current = true;
        } else if (save === true) {
            let cloneVideoHTML = video;
            cloneVideoHTML = cloneVideoHTML?.replace(/width=".*?"/, `width="${getPropertyStyleValue(imgBlock.current, 'width')}"`);
            cloneVideoHTML = cloneVideoHTML?.replace(/height=".*?"/, `height="auto" maxHeight="${getPropertyStyleValue(imgBlock.current, 'height')}"`);
            cloneVideoHTML = cloneVideoHTML?.replace(" ", ` link="${link}" `);
            
            dispatch(addBlogContent(renderToStaticMarkup(
                <Box
                    type='video'
                    key={uuid()}
                    style={{ margin: '1rem', display: 'flex', flexFlow: 'column', justifyContent: 'center' }}
                >
                    {video != null && parse(cloneVideoHTML)}
                    {videoCaption.current != null && parse(videoCaption.current.outerHTML)}
                </Box>
            )))
        }
    }, [save]);

    useEffect(() => {
        if(props.saveContent != undefined){
            const savedVideo = props.saveContent.props.children[0];
            setLink(savedVideo.props.link);
            setStyle({maxHeight: `${savedVideo.props.maxHeight}px`, width: `${savedVideo.props.width}px`});
            setCaptionText(getTextElement(props.saveContent?.props?.children[1])?.children);
        } else {
            setLink(props.content.props.src.link);
        }
    }, [props.saveContent]);

    useEffect(() => {
        if(link != ''){
            extract(link)
            .then((res) => {
                setDisplayImg(res.thumbnail_url);
                setCaptionText(res.title);
                setVideo(res.html);
            })
        }
    }, [link]);

    return (
        <Box className={modifierStyle.root}>
            <ImgStyleModifier
                setModifierType={'video'}
                content={displayImg}
                Image_Block={Image_Block}
                imgBlock={imgBlock}
                imgBox={imgBox}
                imgPreviewBlock={imgPreviewBlock}
                imgPreview={imgPreview}
                imgCaption={imgCaption}
                AltText={AltText}
                style={style}
                caption={null}
                alt={''}
            />

            <TextStyleModifier
                style={captionStyle}
                text={captionText}
                textRef={videoCaption}
            />
        </Box>
    )
}

export default VideoModifierComponent