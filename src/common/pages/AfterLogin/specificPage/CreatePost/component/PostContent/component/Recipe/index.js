import React, { useEffect, useState } from "react";
import Preview from "./component/Preview";
import Content from "./component/Content";
import { CreateRecipeStyle } from "./style";
import { Box } from "@mui/material";

const CreateRecipeComponent = (props) => {
    const createRecipeStyle = CreateRecipeStyle();

    const [autoSavedContent, setAutoSavedContent] = useState([]);
    const [autoSavedDate, setAutoSavedDate] = useState('');

    useEffect(() => {
        if (props.saveContent != null) {
            setAutoSavedContent(props.saveContent.content);
            setAutoSavedDate(props.saveContent.createAt.split('T')[0]);
        }
    }, [props.saveContent]);

    return (
        <Box className={createRecipeStyle.root}>
            <Box id="ContentWriter">
                <Preview autoSavedDate={autoSavedDate} />
                <Content autoSavedContent={autoSavedContent} />
            </Box>
        </Box>
    )
}

export default CreateRecipeComponent