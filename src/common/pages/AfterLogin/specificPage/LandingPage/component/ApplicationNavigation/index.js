import React, { useRef, useEffect, useState } from "react";
import {
    Card, Box, Typography, List, ListItem,
    ListItemText, ListItemAvatar, Avatar,
    CircularProgress
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material"
import { Navigation } from "./style";
import VideoUploader from "./component/Uploader";
import { getReelsVideos } from "../../../../../../../server/axios/api1";
import Video from "./component/Video";
import PlayVideo from "./component/PlayBlock";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const navigationComponent = () => {
    const navigation = Navigation();

    const uploader = useRef(null);
    const container = useRef(null);
    const loadMore = useRef(null);
    const useref = useRef(null);

    const [upload, setUpload] = useState(false);
    const [iconSrc, setIconSrc] = useState({ background: `` });
    const [videosList, setVideosList] = useState([]);
    const [playVideoList, setPlayVideoList] = useState([]);
    const [playVideo, setPlayVideo] = useState(null);
    const [video, setVideo] = useState(false);
    const [targetIndex, setTargetIndex] = useState(null);
    const [play, setPlay] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadedAll, setLoadedAll] = useState(false);
    const [times, setTimes] = useState(1);
    const [scrollDirection, setScrollDirection] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const background = localStorage.getItem('icon') != ''? `url("${localStorage.getItem('icon')}") !important`: `#b3b3b3`;
            setIconSrc({ background: background });

            uploader.current.addEventListener('pointerup', () => {
                setUpload(true);
            });
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        getReelsVideos(times)
            .then((res) => {
                if (res.videosList.length != 0) {
                    setVideosList([...videosList, ...res.videosList]);
                } else {
                    setLoadedAll(true);
                };

                setLoading(false);
            });
    }, [times]);

    useEffect(() => {
        if (playVideo != null) {
            setTargetIndex(videosList.indexOf(playVideo));
        }
    }, [playVideo]);

    useEffect(() => {
        if (targetIndex != null && targetIndex < videosList.length) {
            setVideo(playVideoList[videosList[targetIndex]._id]);
            if(targetIndex == videosList.length - 1){
                setTimes(time => time + 1);
            }
        }
    }, [targetIndex]);

    useEffect(() => {
        if (scrollDirection != null && scrollDirection != '') {
            const rightScrollLength = container.current.scrollLeft + container.current.clientWidth + 10;
            const leftScrollLength = container.current.scrollLeft - 10;
            const containerElement = container.current.children; 
            
            let rightTarget;
            let leftTarget;
            let scrollLeft;

            for(let index = 0; index < containerElement.length; index++){
                if (containerElement[index].offsetLeft < rightScrollLength && containerElement[index].offsetLeft + containerElement[index].clientWidth > rightScrollLength) {
                    rightTarget = containerElement[index];
                }
                if (containerElement[index].offsetLeft < leftScrollLength && containerElement[index].offsetLeft + containerElement[index].clientWidth > leftScrollLength) {
                    leftTarget = containerElement[index];
                }
            }

            scrollLeft = scrollDirection == 'left' ?
                leftTarget?.offsetLeft :
                rightTarget?.offsetLeft;

            setTimeout(() => {
                container.current.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }, 50);

            setTimeout(() => setScrollDirection(''), 10);
        }
    }, [scrollDirection]);

    return (
        <>
            <Card className={navigation.root}>
                <Box className={navigation.box}>
                    <Typography>Reels</Typography>
                </Box>

                <Box className={navigation.container}>
                    <KeyboardArrowLeft 
                        onPointerUp={() => setScrollDirection('left')}
                    />
                    <List 
                        className={navigation.list}
                        ref={container}
                        onScroll={() => {
                            if (
                                loadedAll == false && 
                                container.current.clientWidth + container.current.scrollLeft >= loadMore.current.offsetLeft + loadMore.current.clientWidth
                            ) {
                                setTimes(times => times + 1);
                            }
                        }}
                    >
                        <ListItem
                            ref={uploader}
                            sx={iconSrc}
                            className={navigation.uploadVideo}
                        >
                            <Box className={navigation.uploadBlock}>
                                <ListItemAvatar >
                                    <Avatar>
                                        <AddOutlined />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText className={navigation.Text}>Upload Video</ListItemText>
                            </Box>
                        </ListItem>

                        {
                            videosList.length != 0 && videosList.map(
                                (video1) =>
                                    <Video
                                        key={video1._id}
                                        video={video1}
                                        setPlayVideo={setPlayVideo}
                                        playVideoList={playVideoList}
                                        setPlayVideoList={setPlayVideoList}
                                        setPlay={setPlay}
                                    />
                            )
                        }

                        <ListItem
                            className={navigation.loadMore}
                            ref={loadMore} 
                        >
                            {loading && <CircularProgress color="inherit" />}
                            <ListItemText className={navigation.Text}>More Videos...</ListItemText>
                        </ListItem>
                    </List>
                    <KeyboardArrowRight 
                        onPointerUp={() => setScrollDirection('right')}
                    />
                </Box>
            </Card>

            {
                upload && <VideoUploader setUpload={setUpload} />
            }

            {
                play &&
                <PlayVideo
                    video={video}
                    setPlay={setPlay}
                    targetIndex={targetIndex}
                    setTargetIndex={setTargetIndex}
                />
            }
        </>
    )
}

export default navigationComponent