import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import Footer from "./Footer";
import { setPaddingBottom } from "../../../store/paddingb_reducer_beforeLogin";

const BeforeLoginCommonUI = () => {
    const dispatch = useDispatch();
    const ref = useRef();

    const [ paddingHeight, setPaddingHeight ] = useState('');
    const [ navigationHeight, setNavigationHeight ] = useState('');
    const [ navigationHeightValue, setNavigationHeightValue ] = useState('');

    useEffect(() => {
        if(typeof window != 'undefined'){
            let footerStyle = window.getComputedStyle(document.getElementById('footerBeforeLogin'))
            let navigation = window.getComputedStyle(document.getElementById('navigation'))

            setPaddingHeight(footerStyle.getPropertyValue('height'))
            setNavigationHeight(navigation.getPropertyValue('height'))
            
            window.addEventListener('load', () => {
                setPaddingHeight(footerStyle.getPropertyValue('height'));
                setNavigationHeight(navigation.getPropertyValue('height'));
            })

            window.addEventListener('resize', () => {
                setPaddingHeight(footerStyle.getPropertyValue('height'));
                setNavigationHeight(navigation.getPropertyValue('height'))
            })
        }
    }, [])

    useEffect(() => {
        if(ref.current != false){
            dispatch(setPaddingBottom(paddingHeight));
        }
    }, [paddingHeight])

    useEffect(() => {
        if(navigationHeight != null && paddingHeight != null){
            setNavigationHeightValue(
                (Number(paddingHeight.slice(0, paddingHeight.length - 2)) - Number(navigationHeight.slice(0, navigationHeight.length - 2)))
            )
        }
    }, [navigationHeight, paddingHeight])

    return (
        <>
            <Box sx={{
                height: paddingHeight, 
                position: 'absolute', 
                bottom: '0', 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                background: `linear-gradient(#ffe0c4 ${navigationHeightValue}px, black 0)`
            }}>
                <Footer/>
            </Box>
        </>
    )
}

export default BeforeLoginCommonUI