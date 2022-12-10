import React, { useEffect, useState, useRef } from "react";
import { Paper, Box, Typography, Skeleton, CardHeader, Avatar, Button } from "@mui/material";
import { getUser, getFeatures } from "../../../../../../../server/axios/api1";
import { CardStyles } from "./style";
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { isChildElement } from "../../../../commonComponent/function";
import DeletePrompt from "./component/DeletePrompt";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FollowButton from "../../../component/FollowButton";
import { DocumentOverflow } from "../../../../../CommonComponent/Appbar/style";

const BlogComponent = (props) => {
    const cardRef = useRef(null);
    const operateBlock = useRef(null);

    const cardStyles = CardStyles();
    const documentOverflow = DocumentOverflow();

    const navigate = useNavigate();

    const [features, setFeatures] = useState(null);
    const [author, setAuthor] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [authorIcon, setAuthorIcon] = useState('');
    const [authorId, setAuthorId] = useState(null);
    const [userName, setUserName] = useState('');
    const [display, setDisplay] = useState(false);
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [deleteEle, setDeleteEle] = useState(null);

    const user = useSelector(state => state.token.token_payload);

    useEffect(() => {
        if (props.post != undefined) {
            getUser(props.post.author)
                .then((res) => {
                    setAuthor(res.user)
                });
            getFeatures(props.post.feature)
                .then((res) => {
                    setFeatures(res.features)
                });
        }
    }, [props.post]);

    useEffect(() => {
        cardRef.current.addEventListener('pointerup', () => {
            if (isChildElement(e.target, operateBlock.current)) {
                setDisplay(!display);
            } else {

            }
        })
    }, []);

    useEffect(() => {
        if (deletePrompt == true) {
            document.body.classList.add(documentOverflow.hidden);
        } else {
            document.body.classList.remove(documentOverflow.hidden);
        }
    }, [deletePrompt]);

    useEffect(() => {
        if (deleteEle == true) {
            props.setTarget(cardRef.current);
        }
    }, [deleteEle]);

    useEffect(() => {
        if (author != null) {
            setAuthorIcon(author.icon);
            setUserName(author.username);
            setAuthorId(author._id);
        }
    }, [author]);

    useEffect(() => {
        if (features != null) {
            setTitle(features?.['dish_name'] || 'Not yet set title');
            setDescription(features?.['description'] || `Not yet set post description...`);
            setImgSrc(features?.['backgroundImg'] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHdK1FeLAv2TPQPY_nHlhGF4V4GX7cvj6QRg&usqp=CAU');
        }
    }, [features]);

    return (
        <>
            <Paper
                ref={cardRef}
                className={cardStyles.root}
            >
                <CardHeader
                    className={cardStyles.blogHeader}
                    avatar={authorIcon == '' ?
                        (<Skeleton 
                            variant="circular"
                            onPointerUp={(e) => {
                                navigate(`/surfaceUI/AuthorPost/${author._id}`);
                            }}
                        >
                            <Avatar />
                        </ Skeleton>) :
                        (<Avatar 
                            src={authorIcon}
                            onPointerUp={(e) => {
                                navigate(`/surfaceUI/AuthorPost/${author._id}`);
                            }}
                        />)
                    }
                    title={userName == '' ? <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width={50} /> : userName}
                    subheader={
                       <FollowButton userId={user.id} followerId={authorId}/>
                    }
                />
                <Box 
                    className={cardStyles.content}
                    onPointerUp={(e) => {
                        e.stopPropagation();
                        if (isChildElement(e.target, operateBlock.current)) {
                            setDisplay(!display);
                        } else {
                            navigate(`/surfaceUI/Blog/${props.post._id}`);
                        }
                    }}
                >
                    <Box className={cardStyles.contentBlock}>
                        <Typography varient={'h3'} className={cardStyles.title}>
                            {title == ''? <Skeleton variant="text" width={210} sx={{ fontSize: '1.25rem' }} />: title }
                        </Typography>
                        
                        <Typography className={cardStyles.text}>
                            {description == ''? <Skeleton variant="text" width={500} sx={{ fontSize: '1rem' }} />: description}
                        </Typography>

                        <Box sx={{ display: 'flex' }}>
                        <Box ref={operateBlock} className={cardStyles.Icon} sx={{ position: 'relative', zIndex: '15' }}>
                            {
                                !display && <KeyboardArrowDown
                                    className={cardStyles.Icon}
                                />
                            }
                            {
                                display && <KeyboardArrowUp
                                    className={cardStyles.Icon}
                                />
                            }
                            {
                                display &&
                                <Paper className={cardStyles.promptBlock}>
                                    <Typography
                                        sx={{ color: '#cc4e00' }}
                                        onPointerUp={(e) => {
                                            setDeletePrompt(true)
                                        }}
                                    >
                                        Unmark
                                    </Typography>
                                </Paper>
                            }
                        </Box>
                        </Box>
                    </Box>

                    <Box className={cardStyles.blogBackgroundBlock}>
                            {
                                imgSrc != '' ?
                                    (<Box
                                        component="img"
                                        src={`${features?.['backgroundImg'] || imgSrc}`}
                                        className={cardStyles.blogImg}
                                    />) :
                                    (<Skeleton variant="rectangular" />)
                            }
                        </Box>
                </Box>
            </Paper>
            {
                deletePrompt &&
                <DeletePrompt
                    id={props.id}
                    deletePrompt={deletePrompt}
                    setDeletePrompt={setDeletePrompt}
                    setDeleteEle={setDeleteEle}
                    userId={user.id}
                />
            }
            </>
    )
};

export default BlogComponent