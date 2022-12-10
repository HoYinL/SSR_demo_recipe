import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import AltText from "./component/AltText";
import TextStyleModifier from "../TextStyleModifier";
import { ImgModifierStyles, direction_position, captionStyle } from "./style";
import { InsertTypeIconStyles } from "../../BlockModifier/component/style";
import { imgResize } from "./function";
import { useSelector } from "react-redux";
import { PlayArrow } from '@mui/icons-material';
import { DocumentOverflow } from "../../../../../../../../../../../../../../CommonComponent/Appbar/style";

const ImgStyleModifier = (props) => {
    const AltTextRef = useRef(null);

    const imgModifierStyles = ImgModifierStyles();
    const insertTypeIconStyles = InsertTypeIconStyles();
    const documentOverflow = DocumentOverflow();

    const direction_array = ['NW', 'N', 'NE', 'W', 'E', 'SW', 'S', 'SE'];

    const [clicked, setClicked] = useState(true);
    const [modifier, setModifier] = useState(null);
    const [caption, setCaption] = useState('');
    const [altText, setAltText] = useState('');
    const [hover, setHover] = useState(false);

    const [displayAltTextField, setDisplayAltTextField] = useState(false);

    const userref = useRef(false);
    const useref = useRef(false);
    const save = useSelector(state => state.save.save);

    useEffect(() => {
        if(useref.current == false){
            useref.current = true;
        } else if(save == false){
            (props.imgPreviewBlock.current.style.height);
            (props.imgBox.current.style.height);
            props.imgPreviewBlock.current.style.height = props.imgBox.current.style.height;
            props.imgPreviewBlock.current.style.width = props.imgBox.current.style.width;
        }
    }, [save]);

    useEffect(() => {
        if (typeof window != 'undefined') {
            const imgPreviewBlock = props.imgPreviewBlock.current;
            const imgBox = props.imgBox.current;
            const Image_Block = props.Image_Block.current;

            document.addEventListener('pointerUp', (e) => {
                if (e.target.contains(Image_Block)) {
                    imgPreviewBlock.classList.replace(imgModifierStyles.img_previewClicked, imgModifierStyles.img_preview);
                    imgBox.classList.replace(imgModifierStyles.imgBoxClicked, imgModifierStyles.imgBox);
                    setClicked(false);
                }
            })
        }
    }, [])

    useEffect(() => {
        if (userref.current == false) {
            userref.current = true
        } else {
            let direction = modifier['direction'];
            let clientXY = { clientX: modifier['clientX'], clientY: modifier['clientY'] };

            const imgPreviewBlock = props.imgPreviewBlock.current;
            const imgBlock = props.imgBlock.current;
            const Img_Block = props.Image_Block.current;

            switch (direction) {
                case 'W': case 'E':
                    imgResize['vertical_resize'](clientXY, modifier['direction'], imgBlock, imgPreviewBlock, Img_Block);
                    break;
                case 'S': case 'N':
                    imgResize['horizontal_resize'](clientXY, modifier['direction'], imgBlock, imgPreviewBlock, Img_Block);
                    break;
                case 'NW': case 'NE': case 'SW': case 'SE':
                    imgResize['slash_resize'](clientXY, modifier['direction'], imgBlock, imgPreviewBlock, Img_Block);
            }
        }
    }, [modifier])

    useEffect(() => {
        if (userref.current == false) {
            userref.current = true
        } else {
            const imgPreviewBlock = props.imgPreviewBlock.current;
            const imgBox = props.imgBox.current;

            if (clicked == true) {
                imgBox?.classList.replace(imgModifierStyles.imgBox, imgModifierStyles.imgBoxClicked);
                imgPreviewBlock?.classList.replace(imgModifierStyles.img_preview, imgModifierStyles.img_previewClicked);
            } else {
                imgBox?.classList.replace(imgModifierStyles.imgBoxClicked, imgModifierStyles.imgBox);
                imgPreviewBlock?.classList.replace(imgModifierStyles.img_previewClicked, imgModifierStyles.img_preview);
            }

            setTimeout(() => {
                clicked && AltTextRef.current?.classList.replace(
                    imgModifierStyles.altBlockHide, imgModifierStyles.altBlockShow
                )
            }, 0)
        }
    }, [clicked])

    useEffect(() => {
        if (userref.current == false) {
            userref.current = true;
        } else {
            if (displayAltTextField == false) {
                document.body.classList.remove(documentOverflow.hidden);
                caption != '' && altText != '' && setClicked(false);
            }
        }
    }, [displayAltTextField]);

    useEffect(() => {
        setAltText(props.alt);
    }, [props.alt]);

    useEffect(() => {
        if (props.caption != '') {
            setCaption(props.caption);
        }
    }, [props.caption]);

    useEffect(() => {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            clicked == false && setClicked(true);
        }
    }, [clicked, hover]);

    return (
        <Box
            id="Image_Block"
            ref={props.Image_Block}
            className={`${imgModifierStyles.root} ${clicked ? imgModifierStyles.clickedHover : imgModifierStyles.nonClickedHover}`}

            onPointerOver={() => {
                setHover(true);
            }}
            onPointerOut={() => {
                setHover(false);
            }}
        >
            <Box
                sx={{ position: 'relative', margin: 'auto' }}
                id="imgBlock"
                ref={props.imgBlock}
            >
                {
                    props.setDisplayImg && hover && clicked != true && save === false &&
                    <Box
                        className={imgModifierStyles.imgChangeBlock}
                        onPointerDown={(e) => {
                            e.target.id != 'change' && e.target.id != "delete" && setClicked(true)
                        }}
                    >
                        <Box
                            id="change"
                            title="change img"
                            className={`fa fa-refresh ${insertTypeIconStyles.type}`}
                            onPointerDown={() => {
                                props.setDisplayImg('');
                                props.setModifyImg(true);
                            }}
                        />

                        <Box
                            id="delete"
                            title="delete img"
                            className={`fa fa-trash ${insertTypeIconStyles.type}`}
                            onPointerDown={() => {
                                props.setDisplayImg('');
                                props.setModifyImg(false);
                            }}
                        />
                    </Box>
                }

                <Box
                    id="imgBox"
                    ref={props.imgBox}
                    component="img"
                    src={props.content}
                    alt={altText != '' ? altText : ''}
                    className={`boxContent imgBox ${imgModifierStyles.imgBox}`}
                    style={props.style != undefined ? { width: props.style.width == undefined ? '100%' : props.style.width, /*height: 'auto',*/ height: props.style.maxHeight } : { width: '100%' }}
                    onPointerUp={(e) => {
                        setClicked(!clicked)
                    }}
                />
                {
                    save === false && <Box
                        id="imgPreviewBlock"
                        ref={props.imgPreviewBlock}
                        style={props.style != undefined ? { width: props.style.width == undefined ? '100%' : props.style.width, /*height: 'auto',*/ height: props.style.maxHeight, top: '0'} : { top: '0' }}
                        className={`${imgModifierStyles.img_preview} ${props.style == undefined ? imgModifierStyles.height : ''}`}
                        onClick={(e) => {
                            setClicked(!clicked)
                        }}
                    >
                        <Box
                            id="imgPreview"
                            ref={props.imgPreview}
                            component="img"
                            src={props.content}
                            className={`${imgModifierStyles.previewImg} ${props.style == undefined ? imgModifierStyles.height : ''} ${props.gridImg != undefined && imgModifierStyles.height2}`}
                        />
                        {
                            direction_array.map((ele) => {
                                return (
                                    <Box
                                        sx={direction_position[ele]}
                                        className={imgModifierStyles.square}
                                        id={ele}
                                        key={ele}
                                        onPointerDown={(e) => {
                                            document.body.classList.remove(documentOverflow.auto);
                                            setModifier({
                                                direction: ele,
                                                clientX: e.clientX,
                                                clientY: e.clientY,
                                            })
                                        }}
                                        onPointerUp={() => {
                                            setTimeout(() => { setClicked(true) }, 0)
                                        }}
                                    />
                                )
                            })
                        }
                    </Box>
                }
            </Box>

            {
                props.caption != null && <TextStyleModifier
                    style={captionStyle}
                    text={caption}
                    type={'caption'}
                    textRef={props.imgCaption}
                />
            }

            {
                props.setModifierType != 'video' && save === false && clicked &&
                <Box
                    id='AltText'
                    ref={AltTextRef}
                    className={`${imgModifierStyles.altBlock} ${imgModifierStyles.altBlockHide}`}
                    onClick={() => {
                        setDisplayAltTextField(true);
                    }}
                >
                    <Typography>Alt text</Typography>
                </Box>
            }

            {
                save === false && displayAltTextField &&
                <AltText
                    imgSrc={props.content}
                    setDisplay={setDisplayAltTextField}
                    setAltText={setAltText}
                    AltText={AltTextRef}
                    altText={altText}
                />
            }

            {
                props.setModifierType == 'video' && save === false &&
                <PlayArrow className={imgModifierStyles.player} />
            }
        </Box>
    )
}

export default ImgStyleModifier