import React, { useEffect, useState, useRef } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { Advertisement } from "./style";
import { scrollreveal } from "./function";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdvertisementComponent = (props) => {
    const advertisement = Advertisement();

    const advertisement_box = useRef(null);

    const [ display, setDisplay ] = useState(true);

    useEffect(() => {
        const watcher = new IntersectionObserver(onEnterView);

        watcher.observe(advertisement_box.current);
                
        function onEnterView(entries, observer) {
            for (let entry of entries) {
                if (entry.isIntersecting) {
                    advertisement_box.current.classList.add(advertisement.reveal)
                    //observer.unobserve(advertisement_box.current)
                }
            }
        }
    }, [])

    return (
        <Box ref={advertisement_box} className={advertisement.container}>
            <Paper className={advertisement.root}>
                <Box className={advertisement.titleBox}>
                    <Typography className={advertisement.title}>
                        Love cooking and want to share your recipes with others?
                    </Typography>
                    <Link to="/signin">
                        <Button className={advertisement.button}>
                            <Typography className={advertisement.buttonText}>
                                Start sharing recipe
                            </Typography>
                        </Button>
                    </Link>
                </Box>
            </Paper>
        </Box>
    ) 
}

export default AdvertisementComponent