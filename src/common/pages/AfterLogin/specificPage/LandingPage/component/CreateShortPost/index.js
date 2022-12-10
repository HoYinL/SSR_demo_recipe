import React, { useState, useEffect, useRef } from "react";
import { Card, TextField, Avatar, Box, Button, Typography } from "@mui/material";
import { Image, ArticleOutlined, CenterFocusStrong} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CreatePost } from "./style";
import { useSelector } from "react-redux";
import PostFeatures from "./component/PostFeature";
import VideoUploader from "../ApplicationNavigation/component/Uploader";

const createPostComponent = (props) => {
    const navigate = useNavigate();

    const createpost = CreatePost();

    const useref = useRef(null);

    const [ iconSrc, setIconSrc ] = useState(null);
    const [ createPost, setCreatePost ] = useState(false); 
    const [uploadVideo, setUploadVideo] = useState(false);

    const user = useSelector(state => state.token.token_payload);

    useEffect(() => {
        if(typeof window != 'undefined'){
            setIconSrc(localStorage.getItem("icon"))
        }
    }, []);
    
    return (
        <>
        <Card className={createpost.root}>
            <Box className={createpost.textBox}>
                <Avatar src={iconSrc || null} sx={{backgroundColor: 'white !important'}}>
                    {(iconSrc == null) && <Image />}
                </Avatar>
                <TextField 
                    disabled 
                    placeholder="Create new Post"
                    onPointerUp={() => {
                        setCreatePost(true);
                    }}
                />
            </Box>

            {
                createPost && <PostFeatures setCreatePost={setCreatePost}/>
            }

            <Box className={createpost.textButton}>
                <Button
                    onPointerUp={(e) => {
                        navigate(`/surfaceUI/${user.id}/CreatePost`)
                    }}
                >
                    <ArticleOutlined />
                    <Typography>Blog</Typography>
                </Button>
                <Button
                    onPointerUp={(e) => {
                        setUploadVideo(true);
                    }}
                >
                    <CenterFocusStrong />
                    <Typography>Video</Typography>
                </Button>
            </Box>
        </Card>
        {
            uploadVideo && <VideoUploader setUpload={setUploadVideo}/>
        }
        </>
    )
}

export default createPostComponent