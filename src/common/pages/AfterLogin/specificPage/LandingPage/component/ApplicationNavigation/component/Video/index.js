import React, { useState, useEffect } from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Skeleton } from "@mui/material";
import { Image } from "@mui/icons-material";
import { getVideo, getUser } from "../../../../../../../../../server/axios/api1";
import { Navigation } from "../../style";

const VideoComponent = (props) => {
    const navigation = Navigation();

    const [icon, setIcon] = useState('');
    const [username, setUsername] = useState('');
    const [videoSrc, setVideoSrc] = useState('');
    const [videoId, setVideoId] = useState('');
    const [publisher, setPublisher] = useState('');

    useEffect(() => {
        setVideoId(props.video._id);

        getUser(props.video.publisher)
            .then((res) => {
                setIcon(res.user.icon);
                setUsername(res.user.username);
                setPublisher(res.user._id);
                return getVideo(props.video.video)
            })
            .then((res) => {
                (res);
                setVideoSrc(res);
            })
        ;
    }, [props.video]);

    useEffect(() => {
        if(videoSrc != ''){
            props.playVideoList[`${videoId}`]  = {src: videoSrc, icon, username, publisher};
        }
    }, [videoSrc]);

    return (
        <ListItem
            className={navigation.postList}
            onPointerUp={() => {
                props.setPlay(true);
                props.setPlayVideo(props.video);
            }}
        >
            <ListItemAvatar className={navigation.icon}>
                {
                    icon == '' ?
                        (
                            <Avatar>
                                <Image />
                            </Avatar>
                        ) :
                        (
                            <Avatar src={icon} />
                        )
                }
            </ListItemAvatar>

            {
                videoSrc == ''?
                <Skeleton variant="rounded"/>:
                <video src={videoSrc} />
            }

            <ListItemText className={navigation.Text}>
                {username == ''? <Skeleton varient="text" width={100}/> : username}
            </ListItemText>
        </ListItem>
    )
}

export default VideoComponent