import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { AltTextStyles } from "./style";
import { DocumentOverflow } from "../../../../../../../../../../../../../../../../CommonComponent/Appbar/style";

const AltTextComponent = (props) => {
    const altTextStyles = AltTextStyles();

    const [ altTextContent, setAltTextContent ] = useState('');

    const imgAlt = useRef(null);
    const InputBlock = useRef(null);

    const documentOverflow = DocumentOverflow();

    useEffect(() => {
        setTimeout(() => {
            InputBlock.current.style.transition = 'transform .25s';
            InputBlock.current.style.transform = 'perspective(200px) translateZ(0px) translateY(0px)';
            document.body.classList.add(documentOverflow.hidden)
        }, 0)
    }, []);

    useEffect(() => {
        setAltTextContent(props.altText);
    }, [props.altText]);

    useEffect(() => {
        if(typeof window != 'undefined'){
            const img = new Image();

            img.onload = function(){
                switch(this.height > this.width){
                    case true: 
                        imgAlt.current.style.maxWidth = "50%";
                        imgAlt.current.style.maxHeight = "200px";
                        imgAlt.current.src = props.imgSrc
                        break;

                    case false:
                        imgAlt.current.style.maxWidth = "100%";
                        imgAlt.current.style.maxHeight = "175px";
                        imgAlt.current.src = props.imgSrc
                        break;
            }
        }

        img.src = props.imgSrc
    }}, [props.imgSrc])

    return (
        <>
        <Container className={altTextStyles.root} />
        <Container className={altTextStyles.root2}>
            <Box id="InputBlock" ref={InputBlock} className={altTextStyles.InputBlock}>
                <Typography sx={{fontWeight: '600', color: 'black', fontSize: '1.5rem', lineHeight: '2.25rem'}}>
                    Alternative text
                </Typography>

                <Typography>
                    Write a brief description of this image for readers with visual impairments
                </Typography>

                <Box 
                    component="img"
                    id="imgAlt"
                    ref={imgAlt}
                />

                <TextField 
                    placeholder="E.g., An antique typewriter with a blank sheet of paper sits on a wooden desk"
                    defaultValue={props.altText}
                    onChange={(e) => {
                        setAltTextContent(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if(e.key == 'Enter'){
                            props.setAltText(altTextContent);
                            props.setDisplay(false);
                        }
                    }}
                />

                <Box className={altTextStyles.button}>
                    <Button 
                        sx={{border: '1px solid #ff7200 !important'}}
                        onPointerUp={() => {
                            props.setAltText(altTextContent);
                            props.setDisplay(false);
                        }}
                    >
                        <Typography sx={{color: '#ff7200 !important'}}>Save</Typography>
                    </Button>
                    <Button 
                        className={altTextStyles.cancelButton}
                        onPointerUp={() => {
                            props.setDisplay(false)
                        }}
                    >
                        <Typography>Cancel</Typography>
                    </Button>
                </Box>
            </Box>
        </Container>
        </>
    )
}

export default AltTextComponent