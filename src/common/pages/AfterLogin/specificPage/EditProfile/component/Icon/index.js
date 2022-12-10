import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { EditProfilePage } from '../../style';

const Icon = (props) => {
    const editProfilePage = EditProfilePage();

    const [ displayImg, setDisplayImg ] = useState('');
    const [ iconSrc, setIconSrc ] = useState('');

    useEffect(() => {
        if(typeof window != "undefined"){
            setDisplayImg(localStorage.getItem('icon'));

            const fileReader = new window.FileReader();

            const file = document.getElementById("button-file");

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
            const img = new Image();
            const insert_img = document.getElementById("backgroundImgBox2");
            const img_block = document.getElementById("backgroundImgBlock2");

            img.onload = function() {
                switch(this.height > this.width){
                    case true: 
                        img_block.style.width = "75px";
                        img_block.style.height = "75px";
                        img_block.style.borderRadius = '50%';
                        insert_img.style.width = "75px";
                        insert_img.style.height = "75px";
                        insert_img.style.borderRadius = '50%';
                        setIconSrc(displayImg);
                        break;

                    case false:
                        img_block.style.width = "75px";
                        img_block.style.height = "75px";
                        img_block.style.borderRadius = '50%';
                        insert_img.style.width = "75px";
                        insert_img.style.height = "75px";
                        insert_img.style.borderRadius = '50%';
                        setIconSrc(displayImg);
                        break;
                }
            }

            img.src = `${displayImg}`;
        }
    }, [displayImg]);

    useEffect(() => {
        if(iconSrc != null && props.modifyInfo != null) {
            props.setIconSrc(iconSrc)
        }
    }, [iconSrc])

    return (
        <Box sx={{width: '90%', margin: '.5rem 0'}}>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="button-file"
                multiple
                type="file"
            />

            <label htmlFor="button-file">
                <Button className={editProfilePage.uploadButton} sx={{padding: '.25rem', margin: '.5rem auto .5rem 1rem'}} variant="raised" component="span">
                    <Typography>Personal Icon</Typography>
                </Button>
            </label> 

            {   
                displayImg && <Box id="backgroundImgBlock2" className={editProfilePage.iconImgBox}>
                    <Box 
                        component="img"
                        id="backgroundImgBox2"
                        src={displayImg}
                    />
                </Box>
            }
        </Box>
    )
}

export default Icon