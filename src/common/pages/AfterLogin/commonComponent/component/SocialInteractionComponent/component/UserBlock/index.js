import React, { useState, useEffect } from "react";
import { ListItem, Avatar, CardHeader, Skeleton, Typography, Box } from "@mui/material";
import FollowButton from "../../../../../specificPage/component/FollowButton";
import { CardStyles } from "../../../../../specificPage/LandingPage/component/RecipesList/component/Recipes/component/Card/style";
import { useNavigate } from "react-router-dom";
import { FriendList } from "../../style";
import { setFollowerNumber } from "./function";

const UserBlockComponent = (props) => {
    const cardStyles = CardStyles();
    const friendlist = FriendList();

    const navigate = useNavigate();

    const [userIcon, setUserIcon] = useState('');
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [follower, setFollower] = useState('');
    const [followerNo, setFollowerNo] = useState('');

    useEffect(() => {
        if (props.popularUser != null) {
            setUserIcon(props.popularUser.icon);
            setUserId(props.popularUser._id);
            setUsername(props.popularUser.username);
            setFollower(props.popularUser.follower?.followerList?.length || 0);
        }
    }, [props.popularUser]);

    useEffect(() => {
        if(follower != ''){
            setFollowerNo(setFollowerNumber(follower));
        }
    }, [follower]);

    return (
        <ListItem className={friendlist.listitem}>
            <CardHeader
                sx={{ padding: '0 !important'}}
                className={cardStyles.blogHeader}
                avatar={
                    userIcon == '' ?
                        (<Skeleton
                            variant="circular"
                            onPointerUp={(e) => {
                                navigate(`/surfaceUI/AuthorPost/${userId}`);
                            }}
                        >
                            <Avatar />
                        </ Skeleton>) :
                        (<Avatar
                            src={userIcon}
                            onPointerUp={(e) => {
                                navigate(`/surfaceUI/AuthorPost/${userId}`);
                            }}
                        />)
                }
                title={
                    <Typography sx={{fontWeight: 'bold', color: 'black'}}>
                        {
                            username == '' ?
                                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width={50} /> :
                                username
                        }
                    </Typography>
                }
                subheader={
                    props.user != null && <>
                        <Box>{followerNo}</Box>
                        <FollowButton userId={props.user?.id} followerId={userId} />
                    </>
                }
            />
        </ListItem>
    )
};

export default UserBlockComponent