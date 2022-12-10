import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { Footer } from "./style";

const FooterComponent = () => {
    const footer = Footer();

    return (
        <Box id="footer" className={footer.root}>
            <List sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', padding: '0'}}>
                <ListItem><Typography>Terms of use</Typography></ListItem>
                <ListItem><Typography>Cookies</Typography></ListItem>
                <ListItem><Typography>Contact</Typography></ListItem>
                <ListItem><Typography>Sitemap</Typography></ListItem>
                <ListItem><Typography>Privacy Policy</Typography></ListItem>
            </List>

            <Box className={footer.copyright}>
                <Typography sx={{fontSize: '1.2rem !important', fontWeight: 'bold', color: '#ff7600'}}>allrecipes.com</Typography>
                <Typography sx={{color: 'white'}}>&copy;Copyright 2022</Typography>
                <Typography sx={{color: 'white', textAlign: 'center'}}>All right reserved. Powered by 
                    <span style={{color: '#ff7600'}}> HoYin Lui</span>
                </Typography>
            </Box>
        </Box>
    )
}

export default FooterComponent