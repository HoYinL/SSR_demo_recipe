import React, { useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Footer } from "../../style";

const ContactComponent = () => {
    const footer = Footer();

    return(
        <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{height: '100%', padding: '1rem 0'}} className={footer.paper}>
                <Box className={footer.infoListTitle} id="contact_infoList">Contact</Box>
                <Box id="footer_infoList">
                    <Paper className={footer.infoList}>
                        <Typography>jasonHui@gmail.com</Typography>
                        <Typography>{`(+852)11223344`}</Typography>
                        <Typography>{`1526677892730861972`}</Typography>
                        <Typography>@allrecipes</Typography>
                    </Paper>
                </Box>
            </Paper>
        </Grid>
    )
}

export default ContactComponent