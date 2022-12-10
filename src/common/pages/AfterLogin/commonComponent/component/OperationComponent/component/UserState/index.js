import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { ExitToApp, PermIdentity } from "@mui/icons-material";
import { UserState } from "./style";
import Cookies from 'js-cookie';
import { setupLoginState } from "../../../../../../../store/loginreducer";
import { useDispatch } from "react-redux";

const UserStateComponent = () => {
    const userstate = UserState();

    const dispatch = useDispatch();

    return(
        <Box id="userState" className={userstate.root}> 
            <Link to='/surfaceUI/EditProfile' style={{textDecoration: 'none'}}>
                <Box className={userstate.stateBox}>
                    <PermIdentity className={userstate.icon}/>
                    <Typography className={userstate.text}>
                        Edit profile
                    </Typography>
                </Box>
            </Link>
            
            <Box 
                className={userstate.stateBox}
                onPointerDown={() => {
                    Cookies.set('refresh_token', '');
                    localStorage.clear();
                    dispatch(setupLoginState(false))
                    window.location.replace(`http://${window.location.hostname}:${window.location.port}`)
                }}
            >
                <ExitToApp className={userstate.icon}/>
                <Typography className={userstate.text}>SignOut</Typography>
            </Box>
        </Box>
    )
} 

export default UserStateComponent