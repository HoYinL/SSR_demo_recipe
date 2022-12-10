import React, { useState, useEffect, useRef } from "react";
import VideoUploaderStyles from "./style";
import { Box, Card, Avatar, Typography, Skeleton } from "@mui/material";
import { HighlightOff, Image } from "@mui/icons-material";
import { isChildElement } from "../../../../../../commonComponent/function";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const PlayVideoComponent = (props) => {
    const navigate = useNavigate();

    const videoUploaderStyles = VideoUploaderStyles();

    const VideoConatiner = useRef(null);
    const video = useRef(null);
    const playBlock = useRef(null);
    const cancel = useRef(null);
    const useref = useRef(false);
    const add = useRef(null);
    const minus = useRef(null);

    const [pause, setPause] = useState(true);
    const [icon, setIcon] = useState('');
    const [username, setUserName] = useState('');
    const [publisher, setPublisher] = useState('');

    useEffect(() => {
        VideoConatiner.current.addEventListener('pointerup', (e) => {
            if (
                !isChildElement(e.target, playBlock.current) &&
                !isChildElement(e.target, add.current) &&
                !isChildElement(e.target, minus.current)
            ) {
                props.setPlay(false);
            }
        });
    }, []);

    useEffect(() => {
        if (useref.current == false) {
            useref.current = true;
        } else if (pause == false) {
            video.current.pause();
        } else {
            video.current.play();
        }
    }, [pause]);

    useEffect(() => {
        if (props.video != null) {
            setIcon(props.video.icon);
            setUserName(props.video.username);
            setPublisher(props.video.publisher);
        }
    }, [props.video])

    return (
        <Box ref={VideoConatiner} className={videoUploaderStyles.root}>
            {
                props.targetIndex == 0 ?
                    <KeyboardArrowLeft className={videoUploaderStyles.changeVideo} sx={{ opacity: '0' }} /> :
                    <KeyboardArrowLeft
                        ref={minus}
                        className={videoUploaderStyles.changeVideo}
                        onPointerUp={() => props.setTargetIndex(value => value - 1)}
                    />
            }
            <Card
                ref={playBlock}
                className={videoUploaderStyles.uploadBlock}
            >
                <HighlightOff
                    ref={cancel}
                    className={videoUploaderStyles.cancel}
                    onPointerUp={() => {
                        props.setPlay(false);
                    }}
                />
                <Box className={videoUploaderStyles.reelsPreviewContainer}>
                    <Box 
                        className={videoUploaderStyles.info}
                        onPointerUp={() => navigate(`/surfaceUI/AuthorPost/${publisher}`)}
                    >
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

                    <Typography className={videoUploaderStyles.username}>
                        {username == '' ? <Skeleton varient="text" width={100} /> : username}
                    </Typography>
                    </Box>

                    <video
                        ref={video}
                        src={props.video.src}
                        style={{ objectFit: 'fill' }}
                        loop
                        autoPlay
                        onPointerUp={() => {
                            setPause(!pause);
                        }}
                    />
                </Box>
            </Card>

            <KeyboardArrowRight
                ref={add}
                className={videoUploaderStyles.changeVideo}
                onPointerUp={() => props.setTargetIndex(value => value + 1)}
            />
        </Box>
    )
};

export default PlayVideoComponent