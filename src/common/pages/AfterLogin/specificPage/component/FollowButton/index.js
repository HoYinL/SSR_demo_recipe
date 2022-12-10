import React, { useState, useEffect } from "react";
import { SavedPostStyle } from "../../SavedPost/style";
import { Button } from "@mui/material";
import { 
    postFollowUser,
    postFollower,
    deleteFollowUser,
    deleteFollower,
    getFollowUser
} from "../../../../../../server/axios/Follower";

const FollowButtonComponent = (props) => {
    const authorPostStyle = SavedPostStyle();

    const [followed, setFollowed] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (props.userId != '' && props.followerId != '') {
            getFollowUser(props.userId, props.followerId)
                .then((res) => {
                    (res);
                    if (res.followingUserList.length != 0 && res.followingUserList.includes(props.followerId)) {
                        setFollowed(true);
                    } else {
                        setFollowed(false);
                    }
                })
        }
    }, [props.userId, props.followerId]);

    useEffect(() => {
        if (followed == false) {
            setStatus('Follow +');
        } else if (followed == true) {
            setStatus('Unfollow');
        } else {
            setStatus('Loading');
        }
    }, [followed]);

    const pointerUpHandler = () => {
        if (followed == false) {
            setFollowed(null);
            postFollowUser(props.userId, props.followerId)
                .then((res) => {
                    (res);
                    return postFollower(props.userId, props.followerId)
                })
                .then((res) => {
                    (res);
                    setFollowed(true);
                })
        }
        if (followed == true) {
            setFollowed(null);
            deleteFollowUser(props.userId, props.followerId)
                .then((res) => {
                    return deleteFollower(props.userId, props.followerId)
                })
                .then((res) => {
                    setFollowed(false);
                })
        }
    }

    return (
        <Button
            onPointerUp={pointerUpHandler}
            className={authorPostStyle.button}
        >
            {status}
        </Button>
    )
};

export default FollowButtonComponent