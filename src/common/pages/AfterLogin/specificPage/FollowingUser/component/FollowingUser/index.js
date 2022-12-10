import React, { useState, useEffect, useRef } from "react";
import { Card, Avatar, CardHeader, Box, Skeleton } from "@mui/material";
import { Image } from "@mui/icons-material";
import { getUser } from "../../../../../../../server/axios/api1";
import { Typography } from "@material-ui/core";
import FollowButton from "../../../component/FollowButton";
import { useSelector } from "react-redux";
import { FollowingUserStyles } from "../../style";
import { useNavigate } from "react-router-dom";
import { isChildElement } from "../../../../commonComponent/function";
import { getFollowerNo } from "../../../../../../../server/axios/Follower";

const FollowingUserBlock = (props) => {
    const followingUserStyles = FollowingUserStyles();

    const navigate = useNavigate();

    const [followingUserInfo, setFollowingUserInfo] = useState(null);
    const [userIcon, setUserIcon] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [followerNumber, setFollowerNumber] = useState('');

    const user = useSelector(state => state.token.token_payload);

    const container = useRef(null);
    const icon = useRef(null);
    const description = useRef(null);

    useEffect(() => {
        if (props.followingUser != null) {
            getUser(props.followingUser)
                .then((res) => setFollowingUserInfo(res.user));
            getFollowerNo(props.followingUser)
                .then((res) => setFollowerNumber(res.followerNumber));
        }
    }, [props.followingUser]);

    useEffect(() => {
        if (followingUserInfo != null) {
            setUserDescription(followingUserInfo.description || 'No user description');
            setUserIcon(followingUserInfo.icon);
            setUsername(followingUserInfo.username);
            setUserId(followingUserInfo._id);
        }
    }, [followingUserInfo]);

    useEffect(() => {
        if (userId != '') {
            container.current.addEventListener('pointerup', (e) => {
                if (
                    !isChildElement(e.target, description.current) &&
                    !isChildElement(e.target, icon.current)
                ) {
                    navigate(`/surfaceUI/AuthorPost/${userId}`);
                }
            })
        };
    }, [userId]);

    return (
        <Card
            ref={container}
            className={followingUserStyles.userCard}
        >
            {
                userIcon == '' ?
                    <Avatar ref={icon} className={followingUserStyles.avatar}><Image /></Avatar> :
                    <Avatar ref={icon} src={userIcon} className={followingUserStyles.avatar} />
            }
            <Box>
                <CardHeader
                    className={followingUserStyles.cardHeader}
                    title={
                        <>
                        <Typography className={followingUserStyles.username}>
                            {username == '' ? <Skeleton varient="text" width={200} /> : username}
                        </Typography>
                        <Typography>
                            {followerNumber == '' ? <Skeleton varient="text" width={200} /> : followerNumber}
                        </Typography>
                        </>
                    }
                    subheader={
                        <Box
                            onPointerUp={() => {
                                props.setTarget(props.followingUser);
                            }}
                        >
                            <FollowButton userId={user.id} followerId={userId} />
                        </Box>
                    }
                />
                <Box ref={description} className={followingUserStyles.descriptionBlock}>
                    <Typography>{userDescription}</Typography>
                </Box>
            </Box>
        </Card>
    )
};

export default FollowingUserBlock