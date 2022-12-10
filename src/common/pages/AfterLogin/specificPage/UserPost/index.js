import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, CircularProgress, CardHeader, Skeleton, Avatar, Button } from "@mui/material";
import { initialHideLeftRightColumns } from "../../commonComponent/function";
import { SavedPostStyle } from "../SavedPost/style";
import { getAuthorPost } from "../../../../../server/axios/api1";
import Recipes from "../LandingPage/component/RecipesList/component/Recipes";
import { getUser } from "../../../../../server/axios/api1";
import { getMarkedPost } from "../../../../../server/axios/MarkPost";
import { getFollowerNo } from "../../../../../server/axios/Follower";
import FollowButton from "../component/FollowButton";
import { DocumentOverflow } from "../../../CommonComponent/Appbar/style";

const UserPostsComponent = (props) => {
    const authorPostStyle = SavedPostStyle();
    const documentOverflow = DocumentOverflow();

    const paddingBottom = useSelector(state => state.paddingBottom.paddingBottom);
    const user = useSelector(state => state.token.token_payload);

    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [times, setTimes] = useState(1);
    const [loadedAll, setLoadedAll] = useState(false);
    const [authorIcon, setAuthorIcon] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [markedPostList, setMarkedPostList] = useState('');
    const [followerNumber, setFollowerNumber] = useState('');

    useEffect(() => {
        initialHideLeftRightColumns()

        const splitedPathname = window.location.pathname.split('/');
        const userId = splitedPathname[splitedPathname.length - 1];

        getUser(userId)
            .then((res) => {
                setUserInfo(res.user);
            });

        getFollowerNo(userId)
            .then((res) => {
                setFollowerNumber(res.followerNumber);
            })
    }, []);

    useEffect(() => {
        getAuthorPost(window.location.pathname, times)
            .then((res) => {
                setLoading(false);
                res.post.length != 0 && res.post != false ? setPostList([...postList, ...res.post]) : setLoadedAll(true);
            })
    }, [times]);

    useEffect(() => {
        const closure_scrollHandler = () => {
            return (e) => {
                if (window.scrollY + window.innerHeight + 2 >= document.body.scrollHeight) {
                    setTimes(times => times + 1);
                    setLoading(true);
                }
            }
        };
        const scrollHandler = closure_scrollHandler();

        if (loadedAll == false) {
            document.addEventListener('scroll', scrollHandler);
        } else {
            document.removeEventListener('scroll', scrollHandler);
        }

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [loadedAll]);

    useEffect(() => {
        if (userInfo != null) {
            setAuthorIcon(userInfo.icon);
            setUserName(userInfo.username);
            setUserId(userInfo._id);
        }
    }, [userInfo]);

    useEffect(() => {
        if (user != null) {
            getMarkedPost(user.id)
                .then((res) => {
                    setMarkedPostList(res.postList);
                });
        }
    }, [user])

    return (
        <Box
            sx={{ padding: `6rem 3rem ${paddingBottom} !important` }} className={authorPostStyle.root}
        >
            <Box className={authorPostStyle.savedPostContainer}>
                <CardHeader
                    sx={{ width: '100%', 'borderBottom': '2px solid #d9d9d9', "& .MuiTypography-root": { fontWeight: '700' } }}
                    avatar={authorIcon == '' ?
                        (<Skeleton variant="circular">
                            <Avatar />
                        </ Skeleton>) :
                        (<Avatar
                            src={authorIcon}
                            onPointerUp={(e) => navigate(`/surfaceUI/${user.id}`)}
                        />)
                    }
                    subheader={
                        <FollowButton userId={user.id} followerId={userId} />
                    }
                    title={
                        <>
                            {followerNumber}
                            {userName == '' ? <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width={50} /> : userName}
                        </>
                    }
                />
                <Typography className={authorPostStyle.editText}>Author's Posts</Typography>
                <Box>
                    <Recipes
                        format={'blog'}
                        posts={postList}
                        markedPostList={markedPostList}
                    />
                    {
                        loading ? <h2 className={authorPostStyle.loader}>Loading Posts <CircularProgress color="inherit" /></h2> : <Box className={authorPostStyle.loader} />
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default UserPostsComponent