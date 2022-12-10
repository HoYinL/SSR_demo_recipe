import { Box, Button } from "@mui/material";
import { componentStyle } from "../../../style";
import React, {useEffect} from "react";

const RegIcon = (props) => {
    const component = componentStyle();

    useEffect(() => {
        if(typeof window != "undefined"){
            localStorage.removeItem('icon');

            const fileReader = new window.FileReader();

            const file = document.getElementById("icon-file");

            file.addEventListener("change", function(event) {
                fileReader.readAsDataURL(this.files[0]);
            })

            fileReader.addEventListener('load', () => {
                props.setDisplayImg(fileReader.result)
            })
        }
    }, []);

    useEffect(() => {
        if(typeof window != "undefined" && props.displayImg != ''){
            const img = new Image();
            const insert_img = document.getElementById("backgroundImage");
            const img_block = document.getElementById("backgroundImageBlock");

            img.onload = function() {
                img_block.style.width = "75px";
                img_block.style.height = "75px";
                img_block.style.borderRadius = '50%';
                insert_img.style.width = "75px";
                insert_img.style.height = "75px";
                insert_img.style.borderRadius = '50%';
            }

            img.src = `${props.displayImg}`;
        }
    }, [props.displayImg])

    return (
        <Box sx={{width: '90%', margin: '.5rem 0'}}>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-file"
                multiple
                type="file"
            />

            <label htmlFor="icon-file">
                <Button 
                    className={component.uploadButton} 
                    sx={{padding: '.25rem', margin: '.5rem auto .5rem 1rem'}} 
                    variant="raised" 
                    component="span"
                >
                Personal Icon
                </Button>
            </label> 

            {   
                props.displayImg && <Box id="backgroundImageBlock" className={component.iconImgBox}>
                    <Box 
                        component="img"
                        id="backgroundImage"
                        src={props.displayImg}
                    />
                </Box>
            }
        </Box>
    )
}

export default RegIcon