import React, { useRef, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { SavedPostStyle } from "../../style";

const DeletedPromptComponent = () => {
    const deletedPrompt = useRef(null);

    const savedPostStyle = SavedPostStyle();

    return (
        <Paper ref={deletedPrompt} className={`${savedPostStyle.deletedPrompt}`}>
            <Typography>Successfully deleted post!</Typography>
        </Paper>
    )
}

export default DeletedPromptComponent