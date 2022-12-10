import React, { useEffect, useState } from "react";
import { Box, Card, Avatar, Typography, Paper, Skeleton } from "@mui/material";
import { UserInfo } from "./style";
import { useSelector } from "react-redux";
import { getFollowerNo } from "../../../../../../../../server/axios/Follower";
import { Image } from "@mui/icons-material";

const UserInfoComponent = () => {
    const userinfo = UserInfo();
    const user = useSelector(state => state.token.token_payload);

    const [iconSrc, setIconSrc] = useState(null);
    const [username, setUsername] = useState('username');
    const [email, setEmail] = useState('email');
    const [followerNumber, setFollowerNumber] = useState(0);

    useEffect(() => {
        if (typeof window != 'undefined') {
            setIconSrc(localStorage.getItem('icon'))
        }
    }, []);

    useEffect(() => {
        if (user != null) {
            (user);
            if (user.payload) {
                let { username, email } = user.payload;
                setUsername(username);
                setEmail(email);
                setIconSrc(localStorage.getItem('icon'));
            } else {
                let { username, email } = user;
                setUsername(username);
                setEmail(email);
            };

            getFollowerNo(user.id)
                .then((res) => setFollowerNumber(res.followerNumber))
        }
    }, [user])

    return (
        <Card className={userinfo.root}>
            {
                iconSrc == '' ?
                    <Avatar className={userinfo.avatar}><Image /></Avatar> :
                    <Avatar src={iconSrc} className={userinfo.avatar} />
            }
            <Box>
                <Paper className={userinfo.description}>
                    {
                        username &&
                        <Typography sx={{ fontWeight: 'bold' }}>
                            {
                                username == '' ? <Skeleton varient="text" width={50} /> : username
                            }
                        </Typography>
                    }
                    {
                        email &&
                        <Typography sx={{ fontSize: '.85rem' }}>
                            {
                                email == '' ? <Skeleton varient="text" width={50} /> : email
                            }
                        </Typography>
                    }
                    {
                        followerNumber && <Typography sx={{ fontSize: '.85rem' }}>{followerNumber}</Typography>
                    }
                </Paper>
            </Box>
        </Card>
    )
}
export default UserInfoComponent