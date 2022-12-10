import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { PageList } from "./style";
import { initialHideLeftRightColumns } from "../../../../function";
import { getPropertyStyle } from "../../../../function";
import { useSelector } from "react-redux";
import { DocumentOverflow } from "../../../../../../CommonComponent/Appbar/style";

const PageListComponent = (props) => {
    const pagelist = PageList();
    const documentOverflow = DocumentOverflow();

    const navigate = useNavigate();

    const [ display, setDisplay ] = useState(false);

    const user = useSelector(state => state.token.token_payload);

    useEffect(() => {
        if(
            getPropertyStyle(document.getElementById("innerBlock"), 'height') > 
            getPropertyStyle(document.getElementById("PageList"), 'height')
        ){
            setDisplay(true)
        }
    }, []);

    return (
        <Box 
            onPointerEnter={(e) => {
                document.body.classList.add(documentOverflow.hidden)
            }} 
            onPointerLeave={() => {
                document.body.classList.remove(documentOverflow.hidden)
            }}
            id="PageBlock" 
            className={pagelist.root}
        >
            <Typography className={pagelist.text}>allrecipes</Typography>
                <Box 
                    id="PageList"
                    sx={{height: '90%', overflowY: 'scroll'}} 
                    onPointerUp={() => {
                        window.location.pathname == `/surfaceUI/${user.id}/LandingPage` && initialHideLeftRightColumns();
                    }}
                >
                <Box id="innerBlock">
                <Button 
                    className={pagelist.button}
                    onPointerUp={() => { navigate(`/surfaceUI/${user.id}/SavedPost`)}}
                >
                    <Typography>Create Post</Typography>
                </Button>
            
                <Button 
                    className={pagelist.button}
                    onPointerUp={() => { navigate(`/surfaceUI/${user.id}/PublishedPost`)}}
                >
                    <Typography>Published Post</Typography>
                </Button>
                <Button 
                    className={pagelist.button}
                    onPointerUp={() => { navigate(`/surfaceUI/${user.id}/MarkedPost`)}}
                >
                    <Typography>Marked Post</Typography>
                </Button>
                <Button
                    className={pagelist.button}
                    onPointerUp={() => { navigate(`/surfaceUI/${user.id}/FollowingUsers`)}}
                >
                    <Typography>Following Users</Typography>
                </Button>
                </Box>
            </Box>
            {display && <KeyboardDoubleArrowDown className={pagelist.KeyboardDoubleArrowDown}/>}
        </Box>
    )
}

export default PageListComponent 