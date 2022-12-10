import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Card, Typography, Button } from "@mui/material";
import { Login } from "@mui/icons-material";
import { WebTitle, Title, ResponsiveTitle } from "./style";
import { useMediaQuery } from "react-responsive";
import SearchBar from "./component/searchBar";
import Titles from "./component/title";
import { scrollreveal } from "./function";
import { isChildElement } from "../Contributer/function";

const Webtitle = (props) => {
    const [ display, setDisplay ] = useState(true);
    const [ displayButton, setDisplayButton ] = useState(false);

    const webTitle = WebTitle();
    const title = Title();
    const responsiveTitle = ResponsiveTitle();

    const userref = useRef(false);

    useEffect(() => {
        scrollreveal();
        props.setRevealTitle(true);
        setTimeout(() => setDisplay(false), 10);

        document.addEventListener('pointerdown', (e) => {
            !isChildElement(e.target, document.getElementById('loginButton')) &&
            !isChildElement(e.target, document.getElementById('login')) &&
            !isChildElement(e.target, document.getElementById('signin')) &&
            setDisplayButton(false);      
        })
    }, []);

    useEffect(() => {
        if(userref.current = false){
            userref.current = true;
        }
        else if(displayButton == true && window.innerWidth <= 360 ){
            document.getElementById("loginButton").classList.add(webTitle.loginButtonClick);
            const button = document.getElementsByClassName(webTitle.linkButton);
            for(let index = 0; index < button.length; index++){
                setTimeout(() => {
                    button[index].style.transform = 'translateX(0%)';
                    button[index].style.opacity = '1';
                }, (index + 1)*250)
            }
        } else if(displayButton == false && window.innerWidth <= 360){
            document.getElementById("loginButton").classList.remove(webTitle.loginButtonClick);
        }
        
    }, [displayButton])

    const xxs = useMediaQuery({
        query: "(max-width: 360px)"
    })

    const sm = useMediaQuery({
        query: "(min-width: 501px)"
    })

    const ml = useMediaQuery({
        query: "(max-width: 799px)"
    })

    const lg = useMediaQuery({
        query: "(min-width: 800px)"
    })

    const xs = useMediaQuery({
        query: "(min-width: 301px)"
    })

    return(
        <Box id="webTitle" className={webTitle.title}>
            {display && <Box className={webTitle.cover} />}
            <Box className={webTitle.container}>
                { lg && <Titles webTitle={title}/> }
                <Box id="searchbar_card">
                <Card className={webTitle.searchBarCard}>
                    { ml && <Titles webTitle={responsiveTitle}/> }
                    { xs && <Typography sx={{fontWeight: 'bold', fontFamily: 'Arial'}}>Search Recipes</Typography> }
                    <SearchBar />
                    <Typography sx={{fontSize: '14px', color: '#777777'}}>pencarian popular</Typography>
                </Card>
                </Box>
                { sm && <div className={webTitle.backgroundImg} id="webtitle_backgroundImg"></div>}
            </Box>
            {
                xxs && 
                <Box className={webTitle.buttonBlock}>
                    <Box 
                        id="loginButton"
                        className={webTitle.loginButton}
                        onPointerDown={(e) => setDisplayButton(!displayButton)}
                    >
                        <Login sx={{color: 'white'}}/>
                    </Box>
                    {   displayButton &&
                        <Box sx={{display: 'flex', flexDirection: 'column', margin: '10px 0'}}>
                            <Link id="login" style={{ textDecoration: 'none' }} to="/login"><Button className={webTitle.linkButton}>Login</Button></Link>
                            <Link id="signin" style={{ textDecoration: 'none' }} to="/signin"><Button className={webTitle.linkButton}>Signin</Button></Link>
                        </Box>
                    }
                </Box>
            }
        </Box>
    )
}

export default Webtitle