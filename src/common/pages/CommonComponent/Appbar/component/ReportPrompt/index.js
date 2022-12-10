import React from "react";
import { Box, Typography } from "@mui/material";
import { Appbar } from "../../style";

const ReportedPromptComponent = () => {
    const appbar = Appbar();

    return (
        <Box className={appbar.commentedPrompt}>
            <Typography>Post is reported</Typography>
        </Box>
    )
};

export default ReportedPromptComponent