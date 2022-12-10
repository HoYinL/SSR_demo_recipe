import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { ImgStyles } from "./style";

const InputImgComponent = (props) => {
    const imgStyles = ImgStyles();

    const useref = useRef(false);
    const box = useRef(null);

    const [ displayImg, setDisplayImg ] = useState('');

    useEffect(() => {
        if(typeof window != "undefined"){
            const fileReader = new window.FileReader();

            const file = document.getElementById("contentImg-file");

            const dragEnter = (e) => {
                e.stopPropagation();
                e.preventDefault();
            }
            
            const dragOver = (e) => {
                e.stopPropagation();
                e.preventDefault();
            }
            
            const drop = (e) => {
                ('hihih');
                const files = e.dataTransfer.files;
                (files);

                fileReader.readAsDataURL(files[0]);
            };

            box.current.addEventListener("dragenter", dragEnter, false);
            box.current.addEventListener("dragover", dragOver, false);
            box.current.addEventListener("drop", drop, false);

            file.addEventListener("change", function(event) {
                fileReader.readAsDataURL(this.files[0]);
            })

            fileReader.addEventListener('load', () => {
                setDisplayImg(fileReader.result)
            })
        }
    }, [])

    useEffect(() => {
        if(useref.current == false){
            useref.current = true;
        } else {
            props.setModifierType('img');
            props.setNewFieldContent(<Box component='img' src={displayImg} />);
            setTimeout(() => {
                props.setType('text');
            }, 0)
        }
    }, [displayImg])

    return (
        <>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contentImg-file"
                multiple
                type="file"
            />


            <Box ref={box} className={imgStyles.root}>
                <label htmlFor="contentImg-file">
                    <Box className={imgStyles.imgBox}><Typography>Upload / Drag and Drop Img</Typography><AddPhotoAlternate /></Box>
                </label>
            </Box>
        </>
    )
} 

export default InputImgComponent