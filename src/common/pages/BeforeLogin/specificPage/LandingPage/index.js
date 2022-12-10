import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { LandingPage } from "./style";
import WebTitle from "./components/WebTitle/";
import Info from "./components/Info/";
import Contributer from "./components/Contributer/";
import Recipes from "./components/Recipes/";
import Comment from "./components/Comment/";
import Advertisement from "./components/Advertisement/";
import { useSelector } from "react-redux";
import { scrollBig } from "../../../BeforeLogin/commonComponent/Footer/function/index.js";

const landingPage = () => {
    const landingPageStyle = LandingPage();

    const [ revealTitle, setRevealTitle ] = useState(false);
    const [ revealInfo, setRevealInfo ] = useState(false);
    const [ revealContributer, setRevealContributer ] = useState(false);
    const [ revealRecipes, setRevealRecipes ] = useState(false);
    const [ revealComment, setRevealComment ] = useState(false);

    const paddingBottom = useSelector(state => state.paddingBottomBeforeLogin.paddingBottom)
    const clearState = useSelector(state => state.clearState.clearstate)
    const [ displayReveal, setDispalyReveal ] = useState(false);

    if(typeof window != 'undefined'){
        if (document.readyState === 'interactive') {
            const scroll = setInterval(() => {
                window.scrollTo(0, 0);

                if(document.body.scrollTop === 0){
                    setTimeout(() => {
                        document.addEventListener('scroll', () => clearInterval(scroll), {once: true});
                    }, 250)
                }
            }, 1)
        }
    }

    useEffect(() => {
        if(displayReveal == true){
            (async() => {
                const scrollreveal = await import('scrollreveal');
                const ScrollReveal = scrollreveal.default;
                ScrollReveal().destroy()
                scrollBig();
            })()
        }
    }, [displayReveal])

    useEffect(() => {
        function closure_fun(paddingBottom){
            const body_style = window.getComputedStyle(document.body);
            const height_style = body_style.getPropertyValue('height');
            const height_value = height_style.slice(0, height_style.length - 2);
            const padding_value = paddingBottom.slice(0, paddingBottom.length - 2);

            return (() => {
                if(window.scrollY + window.innerHeight + 100 > height_value - padding_value && clearState == false){
                   setDispalyReveal(true)                   
                }
            })
        }

        const scrollFun = closure_fun(paddingBottom);

        if(paddingBottom != '' && clearState == false){
            document.addEventListener('scroll', scrollFun)
        }
    }, [paddingBottom, clearState])
    
    return (
        <Container sx={{padding: `4rem 0 ${paddingBottom} 0 !important`}} className={landingPageStyle.webpage}>
            <WebTitle 
                revealTitle={revealTitle}
                setRevealTitle={setRevealTitle}
            />
            <Info 
                revealTitle={revealTitle}
                setRevealInfo={setRevealInfo}
            />
            {<Contributer 
                revealInfo={revealInfo}
                setRevealContributer={setRevealContributer}
            />}
            <Recipes 
                revealContributer={revealContributer}
                setRevealRecipes={setRevealRecipes}
            />
            <Comment 
                revealRecipes={revealRecipes}
                setRevealComment={setRevealComment}
            />
            <Advertisement 
                revealComment={revealComment}
            />
        </Container>
    )
}

export default landingPage