import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { Info } from "./style";
import { scrollreveal } from './function'

const InfoComponent = (props) => {
    const info = Info();

    const [ display, setDisplay ] = useState(true);

    useEffect(() => {
        if(props.revealTitle == true){    
            scrollreveal();
            setTimeout(() => setDisplay(false), 10)
            setTimeout(() => props.setRevealInfo(true), 100);
        }
    }, [props.revealTitle])

    return(
        <Box className={info.root} id="info_root">
            {display && <Box className={info.cover}/>}
            <Card className={info.card}>
                <Typography className={info.data}>450K+</Typography>
                <Typography sx={{color: '#A81600'}}>Recipes</Typography>
            </Card>
            <Card className={info.card}>
                <Typography className={info.data}>8000+</Typography>
                <Typography sx={{color: '#A81600'}}>Contributer</Typography>
            </Card>
            <Card className={info.card}>
                <Typography className={info.data}>800+</Typography>
                <Typography sx={{color: '#A81600'}}>Card</Typography>
            </Card>
        </Box>
    )
}

export default InfoComponent