import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Footer } from "../../style"

const CopyRightComponent = () => {  
    const footer = Footer();

    return (
        <Box className={footer.copyrightBox} id="copyright">
            <Typography className={footer.webName}>allrecipes.com</Typography>
            <Typography className={footer.copyright}>&copy;Copyright 2022</Typography>
            <Typography className={footer.copyright}>All right reserved. Powered by 
                <span style={{color: '#ff7600'}}> Jason Hui</span>
            </Typography>
        </Box>
    )
}

export default CopyRightComponent 