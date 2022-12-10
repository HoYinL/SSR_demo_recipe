import React from "react";
import { Box, Typography } from "@mui/material";
import { Appbar } from "../../style";

const CommentedPromptComponent = () => {
    const appbar = Appbar();

    return (
        <Box className={appbar.commentedPrompt}>
            <Typography>Commented successfully</Typography>
        </Box>
    )
};

export default CommentedPromptComponent