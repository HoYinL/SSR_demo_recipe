import React,{ useState, useEffect, useRef } from "react";
import { Box, Typography, CircularProgress, Container } from "@mui/material";
import FollowingUserBlock from "./component/FollowingUser";
import { SavedPostStyle } from "../SavedPost/style";
import { useSelector } from "react-redux";
import { initialHideLeftRightColumns } from "../../commonComponent/function";
import { FollowingUserStyles } from "./style";
import { getFollowingUser } from "../../../../../server/axios/Follower";
import { DocumentOverflow } from "../../../CommonComponent/Appbar/style";

const FollowingUserComponent = () => {
    const followingUserCardStyle = SavedPostStyle();
    const followingUserStyles = FollowingUserStyles();
    const documentOverflow = DocumentOverflow();

    const paddingBottom = useSelector(state => state.paddingBottom.paddingBottom);
    const user = useSelector(state => state.token.token_payload);

    const [followingUser, setFollowingUser] = useState([]);
    const [target, setTarget] = useState(null);
    const [times, setTimes] = useState(1);
    const [loadedAll, setLoadedAll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [noFollowingUser, setNoFollowingUser] = useState(false);

    useEffect(() => {
        initialHideLeftRightColumns()
        //document.body.classList.remove(documentOverflow.hidden);
    }, []);

    useEffect(() => {
        if (user != null) {
            getFollowingUser(user.id, times)
                .then((res) => {
                    setLoading(false);
                    res.followingUserList.length != 0 && setFollowingUser([...followingUser, ...res.followingUserList]);
                    res.followingUserList.length != 10 && setLoadedAll(true);
                    res.followingUserList.length == 0 && times == 1 && setNoFollowingUser(true);
                });
        }
    }, [user, times]);

    useEffect(() => {
        if (target != null) {
            let targetIndex = followingUser.indexOf(target);
            const clone_list = [...followingUser];
            clone_list.splice(targetIndex, 1);
            setFollowingUser([...clone_list]);

            setTimeout(() => setTarget(null));
        }
    }, [target]);

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

        if(loadedAll == false){
            document.addEventListener('scroll', scrollHandler);
        } else {
            document.removeEventListener('scroll', scrollHandler);
        }

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [loadedAll]);

    return (
        <Box
            sx={{ padding: `6rem 0 ${paddingBottom} !important` }} className={followingUserCardStyle.root}
        >
            <Box className={followingUserCardStyle.savedPostContainer}>
                <Typography className={followingUserStyles.editText}>Following Users</Typography>
                {
                    noFollowingUser && <Typography className={followingUserCardStyle.noEditText}>No following user</Typography>
                }
                <Container sx={{padding: '2rem', display: 'flex', flexFlow: 'column', gap: '1.5rem'}}>
                    {
                        followingUser.length != 0 && followingUser.map((user) => 
                            <FollowingUserBlock 
                                key={user}
                                followingUser={user} 
                                setTarget={setTarget}
                            />
                        )
                    }
                    {
                        loading && <h2 className={followingUserCardStyle.loader}>Loading Posts <CircularProgress color="inherit" /></h2>
                    }
                    {
                        !loading && <Box className={followingUserCardStyle.loader} />
                    }
                </Container>
            </Box>
        </Box>
    )
};

export default FollowingUserComponent