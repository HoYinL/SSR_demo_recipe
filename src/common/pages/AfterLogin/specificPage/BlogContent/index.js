import React, { useEffect, useState } from "react";
import { Box, Container, Typography, CardHeader, Skeleton, Button, Avatar } from "@mui/material";
import { getBlogContent } from "../../../../../server/axios/api1";
import HTMLReactParser from "html-react-parser";
import { BlogContentStyle } from "./style";
import { initialHideLeftRightColumns } from "../../commonComponent/function";
import { useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import { getPostComment } from "../../../../../server/axios/api1";
import Comment from "./component/Comment";
import CommentBlock from "./component/CommentBlock";
import { getUser } from "../../../../../server/axios/api1";
import { CardStyles } from "../MarkedPost/component/BlogCard/style";
import { useNavigate } from "react-router-dom";
import FollowButton from "../component/FollowButton";

const BlogContent = () => {
    const navigate = useNavigate();

    const cardStyles = CardStyles();
    const blogContentStyle = BlogContentStyle();

    const [blogContent, setBlogContent] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [postId, setPostId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [authorInfo, setAuthorInfo] = useState('');

    const paddingBottom = useSelector(state => state.paddingBottom.paddingBottom);
    const user = useSelector(state => state.token.token_payload);

    useEffect(() => {
        initialHideLeftRightColumns();
        getBlogContent(window.location.pathname).then((res) => {
            setPostId(res.blog._id);
            setBlogContent([...res.blog.content]);
            setAuthorId(res.blog.author);
        });
    }, []);

    useEffect(() => {
        if (authorId != '') {
            getUser(authorId)
                .then((res) => {
                    setAuthorInfo(res.user)
                })
        }
    }, [authorId]);

    useEffect(() => {
        getPostComment(window.location.pathname)
            .then((res) => {
                setCommentList([...res.commentList]);
            });
    }, [])

    useEffect(() => {
        if (blogContent.length != 0) {
            const script = document.createElement("script");
            script.src = "https://cdn.iframe.ly/embed.js";
            document.body.appendChild(script);

            return script.remove();
        }
    }, [blogContent]);

    return (
        <Box sx={{ padding: `4rem 3rem ${paddingBottom} !important` }} className={blogContentStyle.root}>
            <Container>
                <CardHeader
                    sx={{ padding: '2.5rem 0 0 0 !important' }}
                    className={cardStyles.blogHeader}
                    avatar={authorInfo.icon == '' ?
                        (<Skeleton
                            variant="circular"
                            onPointerUp={(e) => {
                                navigate(`/surfaceUI/AuthorPost/${authorInfo._id}`);
                            }}
                        >
                            <Avatar />
                        </ Skeleton>) :
                        (<Avatar
                            src={authorInfo.icon}
                            onPointerUp={(e) => {
                                navigate(`/surfaceUI/AuthorPost/${authorInfo._id}`);
                            }}
                        />)
                    }
                    title={authorInfo.username == '' ? <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width={50} /> : authorInfo.username}
                    subheader={
                        <FollowButton userId={user.id} followerId={authorId}/>
                    }
                />
                {
                    blogContent.length != 0 && blogContent.map((content) =>
                        <Box key={`${uuid()}`}>
                            {HTMLReactParser(content)}
                        </Box>
                    )
                }

                <Typography sx={{ fontFamily: 'monospace', color: '#ff6a00' }}>Comments:</Typography>
                <CommentBlock postId={postId} />
                {
                    commentList.length != 0 && commentList.map((comment) =>
                        <Comment comment={comment} />
                    )
                }
            </Container>
        </Box>
    )
}

export default BlogContent