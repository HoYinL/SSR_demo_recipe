import React, { useState, useEffect, useRef } from "react";
import { Skeleton, Card, CardHeader, Box, Avatar, Typography, TextField, InputAdornment } from "@mui/material";
import { PublicOutlined, Attachment, EmojiEmotions, Recommend, BookmarkBorder, Bookmark, MoreHoriz, SettingsInputCompositeRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { getPropertyStyleValue } from "../../../../../../../../commonComponent/function";
import { CardStyles } from "./style";
import { isChildElement } from "../../../../../../../../commonComponent/function";
import { useSelector } from "react-redux";
import { markNewPost, unmarkPost } from "../../../../../../../../../../../server/axios/MarkPost";
import Operation from "./OperationBlock";

const CardFormatComponent = (props) => {
    const cardStyles = CardStyles();

    const descriptionBlock = useRef(null);
    const description = useRef(null);
    const cardPost = useRef(null);
    const internet = useRef(null);
    const bookmark = useRef(null);
    const doMore = useRef(null);
    const comment = useRef(null);
    const emoji = useRef(null);
    const icon = useRef(null);

    const navigate = useNavigate();

    const [postInfo, setPostInfo] = useState(null)
    const [displayAll, setDisplayAll] = useState(false);
    const [backgroundImg, setBackgroundImg] = useState({ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHdK1FeLAv2TPQPY_nHlhGF4V4GX7cvj6QRg&usqp=CAU')` });
    const [authorIcon, setAuthorIcon] = useState('');
    const [createTime, setCreateTime] = useState('');
    const [userName, setUserName] = useState('');
    const [dishName, serDishName] = useState('');
    const [descriptionText, setDiscriptionText] = useState('');
    const [bookmarked, setBookMarked] = useState(false);
    const [postId, setPostId] = useState(false);
    const [filtered, setFiltered] = useState(false);
    const [tagList, setTagList] = useState([]);
    const [displayOperation, setDisplayOperation] = useState(false);

    const user = useSelector(state => state.token.token_payload);

    const xs = useMediaQuery({
        query: "(min-width: 420px)"
    });

    useEffect(() => {
        if (props.post != null) {
            setPostInfo(props.post);
        }
    }, [props.post]);

    useEffect(() => {
        if (postInfo != null) {
            setBackgroundImg({ backgroundImage: `url('${postInfo.feature.backgroundImg}')` });
            setAuthorIcon(postInfo.author.icon);
            setCreateTime(postInfo.createAt.slice(0, 10));
            setUserName(postInfo.author.username);
            serDishName(postInfo.feature.dish_name);
            setDiscriptionText(postInfo.feature.description);
            setPostId(postInfo._id);
            setTagList(postInfo.feature.tagList || []);

            cardPost.current.addEventListener('pointerup', (e) => {
                const clickedBody = (
                    !isChildElement(e.target, internet.current) &&
                    !isChildElement(e.target, bookmark.current) &&
                    !isChildElement(e.target, doMore.current) &&
                    !isChildElement(e.target, comment.current) &&
                    !isChildElement(e.target, doMore.current) &&
                    !isChildElement(e.target, emoji.current) &&
                    !isChildElement(e.target, icon.current)
                );

                clickedBody && navigate(`/surfaceUI/Blog/${postInfo._id}`)
            });

            setTimeout(() => {
                if (
                    getPropertyStyleValue(descriptionBlock.current, 'height') <
                    getPropertyStyleValue(description.current, 'height')
                ) {
                    setDisplayAll(true);
                } else {
                    setDisplayAll(false);
                }
            }, 25);
        }
    }, [postInfo]);

    useEffect(() => {
        if (postId != '') {
            props.markedPostList.includes(postId) && setBookMarked(true);
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
            <Card
                className={cardStyles.card}
                sx={backgroundImg}
                ref={cardPost}
            >
                <Box className={cardStyles.cardHeader}>
                    <CardHeader
                        ref={icon}
                        sx={{ width: '80%' }}
                        avatar={authorIcon == '' ?
                            (<Skeleton
                                variant="circular"
                                onPointerUp={(e) => navigate(`/surfaceUI/AuthorPost/${postInfo.author._id}`)}
                            >
                                <Avatar />
                            </ Skeleton>) :
                            (<Avatar
                                src={authorIcon}
                                onPointerUp={(e) => navigate(`/surfaceUI/AuthorPost/${postInfo.author._id}`)}
                            />)
                        }
                        subheader={
                            <Box className={cardStyles.subheaderRoot}>
                                <Typography className={cardStyles.subheadeCreateTime}>
                                    {createTime == '' ? <Skeleton variant="text" width={100} /> : createTime}
                                </Typography>
                                <PublicOutlined 
                                    ref={internet} 
                                    className={cardStyles.subheaderIcon} 
                                />
                            </Box>
                        }
                        title={userName == '' ? <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width={50} /> : userName}
                    />

                    <Box ref={doMore} className={cardStyles.avator}>
                        <Avatar 
                            className={cardStyles.cardDot}
                            onPointerUp={() => {
                                setDisplayOperation(!displayOperation)
                            }} 
                        >
                            <MoreHoriz />
                        </Avatar>
                        {
                            displayOperation && 
                                <Operation 
                                    postId={postId}
                                    setDeleteEle={props.setDeleteEle}
                                    post={props.post}
                                />
                        }
                    </Box>
                </Box>

                <Box className={cardStyles.cardBody}>
                    <Box className={cardStyles.description}>
                        <Typography className={cardStyles.dishName}>
                            {dishName == '' ? <Skeleton varient="text" sx={{ margin: 'auto' }} width={200} /> : dishName}
                        </Typography>
                        <Box ref={descriptionBlock} className={cardStyles.descriptionBlock}>
                            <Typography ref={description}>
                                {descriptionText == '' ? <Skeleton varient="text" sx={{ margin: 'auto' }} width={200} /> : descriptionText}
                            </Typography>
                        </Box>
                        {
                            displayAll && <MoreHoriz
                                onPointerDown={() => props.setDisplayAll(postInfo)}
                                className={cardStyles.dot}
                            />
                        }
                    </Box>

                    {
                        xs && <Box className={cardStyles.emoji}>
                            <Box ref={emoji} sx={{ display: 'inline-block' }}>
                                <EmojiEmotions sx={{ color: 'orange' }} />
                                <Recommend sx={{ color: 'blue', transform: 'translateX(-30%)' }} />
                            </Box>
                            {
                                bookmarked == false ?
                                    <BookmarkBorder
                                        ref={bookmark}
                                        onPointerUp={() => {
                                            setBookMarked(!bookmarked);
                                            markNewPost(user.id, postId);
                                        }}
                                    /> :
                                    <Bookmark
                                        ref={bookmark}
                                        onPointerUp={() => {
                                            setBookMarked(!bookmarked);
                                            unmarkPost(user.id, postId);
                                        }}
                                        className={cardStyles.bookmarked}
                                    />
                            }
                        </Box>
                    }

                    <Box ref={comment} className={cardStyles.commentBox}>
                        <TextField
                            onPointerUp={() => props.setDisplayCommentBlock(props.postId)}
                            disabled
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Attachment sx={{ fontSize: '1.25rem', color: 'grey' }} />
                                    </InputAdornment>
                                ),
                            }}
                            placeholder="Leave a comment..."
                        />
                    </Box>
                </Box>
            </Card> :
            <></>
    )
};

export default CardFormatComponent