import React, { useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Footer } from "../../style"

const DiscoveryComponent = () => {  
    const footer = Footer();

    return(
        <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{height: '100%', padding: '1rem 0'}} className={footer.paper}>
                <Box className={footer.infoListTitle} id="discovery_infoListTitle">Discovery</Box>
                <Paper className={footer.infoDiscoveryList} id="footer_infoDiscoveryList">
                    <Typography>About Us</Typography>
                    <Typography>Career</Typography>
                    <Typography>Sitemap</Typography>
                    <Typography>Privacy Policy</Typography>
                </Paper>
            </Paper>
        </Grid>
    )
}

export default DiscoveryComponent