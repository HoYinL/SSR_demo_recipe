import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import FileInput from "../../../component/Img/component/Type/File";
import UrlSearch from "../../../component/Img/component/Type/UrlSearch";
import UpslashSearch from "../../../component/Img/component/Type/UpslashSearch";
import ImgFromUpslash from "../../../component/Img/component/ImgChoice/Upslash";
import ImgFromUrl from "../../../component/Img/component/ImgChoice/Url";
import ImgStyleModifier from "../../../../StyleModifier/ImgStyleModifer";
import { useSelector } from "react-redux";
import AddCategories from "../AddCategories";
import { Clear } from "@mui/icons-material";
import { InputContentStyles, IconTextStyles } from "../../../component/Content/component/InputBlock/style";

const InputImgComponent = (props) => {
    const iconTextStyles = IconTextStyles();

    const [transform, setTransform] = useState(false);
    const [displayUrlSearch, setDisplayUrlSearch] = useState(false);
    const [displayUpslash, setDisplayUpslash] = useState(false);
    const [id, setId] = useState(Date.now());
    const [displayImg, setDisplayImg] = useState('');
    const [displayLine, setDisplayLine] = useState(false);
    const [isUpslash, setIsUpslash] = useState(false);
    const [modifyImg, setModifyImg] = useState(false);
    const [imgStyle, setImgStyle] = useState(null);
    const [captionText, setCaptionText] = useState('');
    const [altText, setAltText] = useState('');
    const [defaultCaption, setDefaultCaption] = useState('');

    const imgContent = useRef(null);
    const useref = useRef(false);
    const Image_Block = useRef(null);
    const imgBlock = useRef(null);
    const imgBox = useRef(null);
    const imgPreviewBlock = useRef(null);
    const imgPreview = useRef(null);
    const imgCaption = useRef(null);

    const save = useSelector(state => state.save.save);

    useEffect(() => {
        if (useref.current === false) {
            useref.current = true
        } else {
            if (transform == false) {
                setDisplayUrlSearch(false);
                setDisplayUpslash(false);
            }
        }
    }, [transform]);

    useEffect(() => {
        if (props.content != undefined) {
            setAltText(props.content[0]?.alt);
            setDisplayImg(props.content[0]?.src);
            setImgStyle(props.content[0]?.style);
            setCaptionText(props.content[1]?.children || '');
        }
    }, [props.content]);

    useEffect(() => {
        if(defaultCaption != ''){
            setCaptionText(defaultCaption);
            setDefaultCaption('');
        }
    }, [defaultCaption]);

    return (
        <Box type="Img" sx={{position: 'relative'}}>
            {
                save === false && <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id={id}
                    multiple
                    type="file"
                />
            }

            {
                save === false && displayImg != '' && <Box>
                    <AddCategories
                        con={props.con}
                        setCon={props.setCon}
                        setInputImg={props.setInputImg}
                        setInputText={props.setInputText}
                        setAddEle={props.setAddEle}
                    />
                </Box>
            }

            {
                displayImg != '' &&
                <Box
                    ref={imgContent}
                    className={'GridImg'}
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
                        imgCaption={imgCaption}
                        style={imgStyle}
                        caption={captionText}
                        alt={altText}
                        gridImg={true}
                    />
                </Box>
            }

            {
                save === false && <Box sx={{ minWidth: '100%', maxWidth: '900px' }}>
                    {
                        displayImg == '' && <Box sx={{ position: 'relative', display: 'flex' }}>
                            <Box sx={{ display: 'flex', top: '0' }}>
                                <FileInput
                                    setDisplayImg={setDisplayImg}
                                    id={id}
                                />
                                <UrlSearch
                                    setDisplayUpslash={setDisplayUpslash}
                                    setDisplayUrlSearch={setDisplayUrlSearch}
                                    setIsUpslash={setIsUpslash}
                                />
                                <UpslashSearch
                                    setDisplayUpslash={setDisplayUpslash}
                                    setDisplayUrlSearch={setDisplayUrlSearch}
                                />
                            </Box>
                        </Box>
                    }

                    <Box>
                        {
                            displayUrlSearch &&
                            <ImgFromUrl
                                setDisplayImg={setDisplayImg}
                            />
                        }

                        {
                            displayUpslash &&
                            <ImgFromUpslash
                                setSelectedImg={setDisplayImg}
                                setDisplayLine={setDisplayLine}
                                setDisplayUpslash={setDisplayUpslash}
                                setDisplayImg={setDisplayImg}
                                setIsUpslash={setIsUpslash}
                                setDefaultCaption={setDefaultCaption}
                            />
                        }
                    </Box>
                </Box>
            }

            {
                save == false && <Box style={InputContentStyles.modifier}>
                    <Clear
                        className={iconTextStyles.root}
                        onPointerUp={(e) => {
                            props.setEleKey(props.target);
                            props.setDeleteEle(true);
                        }} />
                </Box>
            }
        </Box>
    )
};

export default InputImgComponent