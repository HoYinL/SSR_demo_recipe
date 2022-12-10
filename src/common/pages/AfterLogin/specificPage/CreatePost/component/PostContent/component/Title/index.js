import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { ArrowCircleDown } from "@mui/icons-material";
import { TitleStyle } from "./style";
import { scrollToContentWriter } from "../../function";

const TitleComponent = () => {
    const titleStyle = TitleStyle();

    const [ scrolledToBlock, setScrolledToBlock ] = useState(true);

    useEffect(() => {
        if(typeof window != "undefined"){
            window.innerHeight + window.scrollY > document.getElementById("ContentWriter").offsetTop &&
                setScrolledToBlock(false);
            document.addEventListener('scroll', () => {
                if(document.getElementById("ContentWriter")){
                    window.innerHeight + window.scrollY > document.getElementById("ContentWriter").offsetTop ?
                    setScrolledToBlock(false): 
                    setScrolledToBlock(true);
                }
            })
        }
    }, [])

    return (
        <Box 
            id='createPostPage' 
            className={titleStyle.root}
        >
            <Typography>Create new <span style={{color: 'grey'}}>Recipes</span> as <span style={{color: 'orange'}}>Blog</span>
            </Typography>
            <>{scrolledToBlock && <Box 
                    className={titleStyle.prompt}
                    onClick={() => {scrollToContentWriter(setScrolledToBlock)}}
                    >
                    <ArrowCircleDown />
                    <Typography>Write recipes details</Typography>
                </Box>
            }</>
        </Box>
    )
}

export default TitleComponent