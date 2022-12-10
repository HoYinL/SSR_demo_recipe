import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton, Card, CardHeader, Box, List, ListItem, Avatar, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { PublicOutlined } from "@mui/icons-material";
import { BlogStyles } from "./style";
import { isChildElement } from "../../../../../../../../commonComponent/function";
import { getUser, getFeatures } from "../../../../../../../../../../../server/axios/api1";
import { markNewPost, unmarkPost } from "../../../../../../../../../../../server/axios/MarkPost";
import { useSelector, useDispatch } from "react-redux";
import { blockPost } from "../../../../../../../../../../../server/axios/api1";
import { setBlockedPost } from "../../../../../../../../../../store/blockedpostreducer";
import ReportBlock from "../ReportBlock";

const BlogFormatComponent = (props) => {
    const blogPost = useRef(null);
    const internet = useRef(null);
    const operationBlock = useRef(null);
    const bookmark = useRef(null);

    const blogStyles = BlogStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [postInfo, setPostInfo] = useState(null);
    const [backgroundImg, setBackgroundImg] = useState('https://media.tenor.com/guhB4PpjrmUAAAAC/loading-loading-gif.gif');
    const [authorIcon, setAuthorIcon] = useState('');
    const [createTime, setCreateTime] = useState('');
    const [userName, setUserName] = useState('');
    const [dishName, serDishName] = useState('');
    const [descriptionText, setDiscriptionText] = useState('');
    const [tagList, setTagList] = useState([]);
    const [features, setFeatures] = useState(null);
    const [author, setAuthor] = useState(null);
    const [bookmarked, setBookMarked] = useState(false);
    const [postId, setPostId] = useState(false);
    const [report, setReport] = useState(false);
    const [filtered, setFiltered] = useState(false);

    const user = useSelector(state => state.token.token_payload);

    const s = useMediaQuery({
        query: "(min-width: 500px)"
    });

    useEffect(() => {
        if (props.post != null) {
            setPostInfo(props.post);
        }
    }, [props.post]);

    useEffect(() => {
        if (postInfo != null) {
            setCreateTime(postInfo.createAt.slice(0, 10));
            setPostId(postInfo._id);
            if (typeof postInfo.feature == 'string') {
                getFeatures(postInfo.feature)
                    .then((res) => {
                        setFeatures(res.features);
                    });
            } else {
                setFeatures(postInfo.feature);
            }
            if (typeof postInfo.author == 'string') {
                getUser(postInfo.author)
                    .then((res) => {
                        setAuthor(res.user);
                    });
            } else {
                setAuthor(postInfo.author);
            }

            blogPost.current.addEventListener('pointerup', (e) => {
                const clickedBody = (
                    !isChildElement(e.target, internet.current) &&
                    !isChildElement(e.target, operationBlock.current)
                );

                clickedBody && navigate(`/surfaceUI/Blog/${postInfo._id}`)
            });
        }
    }, [postInfo]);

    useEffect(() => {
        if (features != null) {
            setBackgroundImg(features.backgroundImg);
            serDishName(features.dish_name);
            setDiscriptionText(features.description);
            setTagList(features.tagList || []);
        }
    }, [features]);

    useEffect(() => {
        if (author != null) {
            setAuthorIcon(author.icon);
            setUserName(author.username);
        }
    }, [author]);

    useEffect(() => {
        if (postId != '') {
            props.markedPostList?.includes(postId) && setBookMarked(true);
        }
    }, [postId]);

    useEffect(() => {
        if (props.filterContent.length != 0) {
            tagList.map((tag) => {
                if (props.filterContent.includes(tag)) {
                    setFiltered(true);
                };
            });
        };
    }, [props.filterContent]);

    return (
        props.filterContent.length == 0 || (props.filterContent.length != 0 && filtered) ?
            <>
                <Card
                    ref={blogPost}
                    className={blogStyles.blogCard}
                >
                    {!window.location.pathname.includes('AuthorPost') && <CardHeader
                        className={blogStyles.blogHeader}
                        avatar={
                            authorIcon == '' ?
                                (<Skeleton variant="circular">
                                    <Avatar />
                                </ Skeleton>) :
                                (<Avatar src={authorIcon} />)
                        }
                        title={userName == '' ? <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width={50} /> : userName}
                        subheader={
                            <Box className={blogStyles.subheaderRoot}>
                                <Typography className={blogStyles.subheaderCreateTime}>
                                    {createTime == '' ? <Skeleton variant="text" width={200} /> : createTime}
                                </Typography>
                                <PublicOutlined ref={internet} className={blogStyles.subheaderIcon} />
                            </Box>
                        }
                    />
                    }
                    <Box className={blogStyles.blogRoot}>
                        <Box className={blogStyles.blogContent}>
                            <Typography className={blogStyles.blogTitle}>
                                {dishName == '' ? <Skeleton varient="text" width={200} /> : dishName}
                            </Typography>
                            <Box className={blogStyles.blogContentText}>
                                <Box className={blogStyles.blogDescriptionBlock}>
                                    <Typography className={blogStyles.blogDescription}>
                                        {descriptionText == '' ? <Skeleton varient="text" width={200} /> : descriptionText}
                                    </Typography>
                                </Box>

                                {
                                    s &&
                                    tagList?.length != 0 && <List sx={{ margin: 'auto 0 0 0' }}>
                                        {
                                            tagList?.map((tag) =>
                                                <ListItem className={blogStyles.tagList}>
                                                    {tag}
                                                </ListItem>
                                            )
                                        }
                                    </List>
                                }
                                <Box ref={operationBlock} className={blogStyles.blogIcons}>
                                    {
                                        bookmarked == false ?
                                            <i
                                                title="bookmark"
                                                ref={bookmark}
                                                aria-hidden="true"
                                                onPointerUp={() => {
                                                    setBookMarked(!bookmarked);
                                                    markNewPost(user.id, postId);
                                                }}
                                                className="fa fa-bookmark-o"
                                            /> :
                                            <i
                                                className="fa fa-bookmark"
                                                aria-hidden="true"
                                                onPointerUp={() => {
                                                    setBookMarked(!bookmarked);
                                                    unmarkPost(user.id, postId);
                                                }}
                                            />
                                    }
                                    <i
                                        title="block post"
                                        className="fa fa-minus-square-o"
                                        onPointerUp={() => {
                                            blockPost(user.id, postId)
                                                .then((res) => {
                                                    props.setDeleteEle(props.post);
                                                    dispatch(setBlockedPost(true));
                                                })
                                        }}
                                    />
                                    <i
                                        title="report post"
                                        className="fa fa-ellipsis-h"
                                        onPointerUp={() => {
                                            setReport(true);
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        {
                            <Box className={blogStyles.blogBackgroundBlock}>
                                <Box
                                    component="img"
                                    src={backgroundImg}
                                    className={blogStyles.blogImg}
                                />
                            </Box>
                        }
                    </Box>
                </Card>
                {
                    report &&
                    <ReportBlock
                        setDeleteEle={props.setDeleteEle}
                        post={props.post}
                        postId={postId}
                        setReport={setReport}
                    />
                }
            </> :
            <></>
    )
};

export default BlogFormatComponent