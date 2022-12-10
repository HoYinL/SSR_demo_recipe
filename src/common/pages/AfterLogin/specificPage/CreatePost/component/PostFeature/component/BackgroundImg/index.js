import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Edit } from '@mui/icons-material'
import { FormStyle } from "./style";

const BackgroundImgFormComponent = (props) => {
    const formStyle = FormStyle();

    const [ displayImg, setDisplayImg ] = useState('');

    useEffect(() => {
        if(typeof window != "undefined"){
            const fileReader = new window.FileReader();

            const file = document.getElementById("raised-button-file");

            file.addEventListener("change", function(event) {
                fileReader.readAsDataURL(this.files[0]);
            })

            fileReader.addEventListener('load', () => {
                setDisplayImg(fileReader.result)
            })
        }
    }, [])

    useEffect(() => {
        if(typeof window != "undefined" && displayImg != ''){
            (displayImg);
            const img = new Image();
            const insert_img = document.getElementById("backgroundImgBox");
            const img_block = document.getElementById("backgroundImgBlock");

            img.onload = function() {
                switch(this.height > this.width){
                    case true: 
                        img_block.style.maxWidth = "50%";
                        img_block.style.height = "250px";
                        insert_img.style.maxWidth = "100%";
                        insert_img.style.height = '250px';
                        props.setBackgroundImg(displayImg);
                        break;

                    case false:
                        img_block.style.maxWidth = "82.5%";
                        img_block.style.height = "auto";
                        img_block.style.maxHeight = '100%';
                        insert_img.style.maxWidth = "100%";
                        insert_img.style.height = 'auto';
                        props.setBackgroundImg(displayImg);
                        break;
                }
            }

            img.src = `${displayImg}`;
        }
    }, [displayImg]);

    useEffect(() => {
        props.savedBackgroundImg && setDisplayImg(props.savedBackgroundImg)
    }, [props.savedBackgroundImg])

    return (
        <>
            <Typography>BackgroundImage:</Typography>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
            />

            <Box sx={{display: 'flex'}}>
            <label htmlFor="raised-button-file">
                <Button className={formStyle.button} variant="raised" component="span">
                    <Typography>Upload</Typography>
                </Button>
            </label> 

            
            {   
                displayImg && <Box id="backgroundImgBlock" className={formStyle.backgroundImgBox}>
                    <Box 
                        component="img"
                        id="backgroundImgBox"
                        src={displayImg}
                    />
                </Box>
            }
            </Box>
        </>
    )
}

export default BackgroundImgFormComponent