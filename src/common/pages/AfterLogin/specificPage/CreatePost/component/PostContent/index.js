import React from "react";
import { Box } from "@mui/material";
import CreateRecipeComponent from "./component/Recipe";
import TitleComponent from "./component/Title";
import { CreatePostStyle } from "./style"; 

const CreatePostContentComponent = (props) => {
    const createPostStyle =  CreatePostStyle();

    return (
        <Box className={createPostStyle.root}>
            <TitleComponent />
            <CreateRecipeComponent saveContent={props.saveContent}/>
        </Box>
    )
}

export default CreatePostContentComponent