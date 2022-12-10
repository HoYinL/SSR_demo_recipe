import React, { useState, useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";
import { Visibility } from '@mui/icons-material';
import { PreviewStyle } from "./style";
import { useSelector } from "react-redux";
import PreviewBlock from "./component/PreviewBlock";
import { DocumentOverflow } from "../../../../../../../../../CommonComponent/Appbar/style";

const PreviewComponent = (props) => {
    const previewStyle = PreviewStyle();
    const documentOverflow = DocumentOverflow();

    const [ preview, setPreview ] = useState(false);

    const blogContent = useSelector(state => state.blogContent.blogContent);

    const useref = useRef(false);

    useEffect(() => {
        if(useref.current === false){
            useref.current = true;
        } else if(preview == true){
            document.body.classList.add(documentOverflow.hidden);
        } else {
            document.body.classList.remove(documentOverflow.hidden);
        }
    }, [preview]);

    return(
        <>
        <Box className={previewStyle.root}>
            <Typography sx={{padding: '0 1rem'}}>{`Last Modified at: ${props.autoSavedDate}`}</Typography>
            <Box 
                className={previewStyle.box}
                onPointerUp={(e) => {
                    setPreview(!preview);
                }}
            >
                <Visibility /><Typography>Preview</Typography>
            </Box>
        </Box>

        {
            preview === true && 
                <PreviewBlock 
                    blogContent={blogContent}
                    setPreview={setPreview}
                />
        }
        </>
    )
}

export default PreviewComponent