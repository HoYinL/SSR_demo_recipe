import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Image } from "@mui/icons-material";
import { InsertTypeIconStyles, InsertIconStyle } from "../style";
import FileInput from "./component/Type/File";
import UrlSearch from "./component/Type/UrlSearch";
import UpslashSearch from "./component/Type/UpslashSearch";
import ImgFromUrl from "./component/ImgChoice/Url";
import ImgFromUpslash from "./component/ImgChoice/Upslash";
import { v4 as uuid } from 'uuid';

const InsertImgIconComponent = (props) => {
    const insertTyleIconStyle =  InsertTypeIconStyles();
    const insertImgStyle =  InsertIconStyle();

    const [ transform, setTransform ] = useState(false);
    const [ displayUrlSearch, setDisplayUrlSearch ] = useState(false);
    const [ displayUpslash, setDisplayUpslash ] = useState(false);

    const useref = useRef(false);

    useEffect(() => {
        if(props.modifyImg === true){
            setTransform(true);
        }
    }, [props.modifyImg]);

    useEffect(() => {
        if(useref.current === false){
            useref.current = true
        } else {
            if(transform == false){
                setDisplayUrlSearch(false);
                setDisplayUpslash(false);
            }
        }
    }, [transform]);

    return (
        <Box sx={ props.displayLine? {} : { minWidth: '100%', maxWidth: '900px' }}>
        <Box sx={{ position: 'relative', display: 'flex' }}>
            <Image
                className={`${insertTyleIconStyle.cross} ${insertImgStyle.root}`}
                onPointerDown={() => {
                    setTransform(!transform);
                }}
            />
                {
                    transform && <Box sx={{ display: 'flex', top: '0' }}>
                        <FileInput
                            setDisplayImg={props.setDisplayImg}
                            id={uuid()}
                        />
                        <UrlSearch 
                            setDisplayUpslash={setDisplayUpslash}
                            setDisplayUrlSearch={setDisplayUrlSearch}
                            setIsUpslash={props.setIsUpslash}
                        />
                        <UpslashSearch 
                            setDisplayUpslash={setDisplayUpslash}
                            setDisplayUrlSearch={setDisplayUrlSearch}
                        />
                    </Box>
                }
        </Box>

        <Box>
            {
                displayUrlSearch && <ImgFromUrl 
                    setDisplayImg={props.setDisplayImg} 
                />
            }

            {
                displayUpslash && <ImgFromUpslash  
                    setSelectedImg={props.setDisplayImg}
                    setDisplayLine={props.setDisplayLine}
                    setDisplayUpslash={setDisplayUpslash}
                    setDisplayImg={props.setDisplayImg}
                    setIsUpslash={props.setIsUpslash}
                    setDefaultCaption={props.setDefaultCaption}
                />
            }
        </Box>
    </Box>)
};

export default InsertImgIconComponent