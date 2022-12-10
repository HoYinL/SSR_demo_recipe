import React from "react";
import { Typography } from "@mui/material";

const title = (props) => {
    return(
        <>
            <Typography className={props.webTitle.title} id="webtitle_title">Food Recipe</Typography>
            <Typography className={props.webTitle.subtitle} id="webtitle_subtitle">
                Share your masterpieces all over the world
            </Typography>
            <br />
        </>
    )
}

export default title