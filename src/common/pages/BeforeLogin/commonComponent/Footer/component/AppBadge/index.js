import React, { useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Footer } from "../../style";
import googlePlay from "../../../../../../img/google-play3.png";
import appStore from "../../../../../../img/appStore2.png";

const AppBadgeComponent = () => {
    const footer = Footer();

    return (
        <Grid item xs={12} md={6}>
            <Paper sx={{padding: '1.5rem 1rem'}} className={footer.appPaper}>
                <Box className={footer.logo} id="footer_logo"/>

                <Typography className={footer.appDiscription} id="footer_appDiscription">
                    allrecipes.com helps bring together many people who want to learn to cook new things 
                    for them and people who want to share their recipes. Apart from this website, you can also 
                    download our application in the app store.
                </Typography>

                <Box className={footer.appLink} id="app_logo">
                    <Box
                        alt="AppleStore"
                        className={footer.appBradge}
                        sx={{backgroundImage: `url(${appStore})`}}
                    />
                    <Box
                        alt="GooglePlay"
                        className={footer.appBradge}
                        sx={{backgroundImage: `url(${googlePlay})`}}
                    />
                </Box>
            </Paper>
        </Grid>
    )
}

export default AppBadgeComponent