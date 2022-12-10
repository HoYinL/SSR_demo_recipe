import React from "react";
import { Box, Typography } from "@mui/material";
import { Appbar } from "../../style";

const BlockedPromptComponent = () => {
    const appbar = Appbar();

    return (
        <Box className={appbar.commentedPrompt}>
            <Typography>Post is blocked</Typography>
        </Box>
    )
};

export default BlockedPromptComponent