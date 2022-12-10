import React from "react";
import { Box, Grid, ThemeProvider } from "@mui/material";
import theme from "./breakpoint";
import { Footer } from "./style"
import AppBadge from "./component/AppBadge";
import Contact from "./component/Contact";
import Discovery from "./component/Discovery";
import Navigation from "./component/Navigation";
import CopyRight from "./component/CopyRight";

const FooterComponent = () => {
    const footer = Footer();

    return (
        <Box id='footerBeforeLogin' className={footer.block}>
            <ThemeProvider theme={theme}>
                <Grid container className={footer.root}>
                    <AppBadge />
                    <Contact />
                    <Discovery />
                </Grid>
            </ThemeProvider>
            <Box id='navigation' sx={{backgroundColor: 'black'}}>
                <Navigation />
                <CopyRight />
            </Box>
        </Box>
    )
}

export default FooterComponent