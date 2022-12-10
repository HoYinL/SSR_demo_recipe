import React, {useEffect, useState, useRef} from "react";
import { Paper, Box, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CardStyles } from "./style";
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { getPublishedPostFeatures } from "../../../../../../../server/axios/PublishPost";
import { getSavedPostFeatures } from "../../../../../../../server/axios/SavedPost";
import { isChildElement } from "./function";
import DeletePrompt from "./component/DeletePrompt";
import {v4 as uuid} from 'uuid';
import { DocumentOverflow } from "../../../../../CommonComponent/Appbar/style";

const BlogComponent = (props) => {
    const cardRef = useRef(null);
    const operateBlock = useRef(null);

    const cardStyles = CardStyles();
    const documentOverflow = DocumentOverflow();

    const navigate = useNavigate();

    const user = useSelector(state => state.token.token_payload);

    const [features, setFeatures] = useState(null);
    const [time, setTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [display, setDisplay] = useState(false);
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [deleteEle, setDeleteEle] = useState(null);
    const [navigateUrl, setNavigateUrl] = useState('');
    const [navigatePostUrl, setNavigatePostUrl] = useState('');

    useEffect(() => {
        window.location.pathname.includes('SavedPost') &&
        getSavedPostFeatures(props.id)
            .then((res) => {
                setFeatures(res.feature.feature);
                setTime(res.feature.createAt.split('T')[0])
            });

        window.location.pathname.includes('PublishedPost') &&
            getPublishedPostFeatures(props.id)
                .then((res) => {
                    setFeatures(res.feature.feature);
                    setTime(res.feature.createAt.split('T')[0])
                });    
    }, [props.id]);

    useEffect(() => {
        cardRef.current.addEventListener('pointerup', () => {
            if (isChildElement(e.target, operateBlock.current)) {
                setDisplay(!display);
            } else {
                window.location.pathname.includes('SavedPost') &&
                    navigate(`/surfaceUI/${user.id}/CreatePost/${props.id}/`);
                window.location.pathname.includes('PublishedPost') &&
                    navigate(`/surfaceUI/Blog/${props.id}`);
            }
        })
    }, []);

    useEffect(() => {
        if(deletePrompt == true){
            document.body.classList.add(documentOverflow.hidden);
        } else {
            document.body.classList.remove(documentOverflow.remove);
        }
    }, [deletePrompt]);

    useEffect(() => {
        if(deleteEle == true){
            props.setTarget(props.id);
        }
    }, [deleteEle]);

    useEffect(() => {
        if(features != null){
            setTitle(features?.['dish_name'] || 'Not yet set title');
            setDescription(features?.['description'] || `Not yet set post description...`);
            setImgSrc(features?.['backgroundImg'] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHdK1FeLAv2TPQPY_nHlhGF4V4GX7cvj6QRg&usqp=CAU');
        }
    }, [features]);

    useEffect(() => {
        if(user != null){
            if(window.location.pathname.includes('SavedPost')){
                setNavigateUrl(`/surfaceUI/CreatePost/${user.id}/${props.id}/`);
                setNavigatePostUrl(`/surfaceUI/CreatePost/${user.id}/${props.id}/`);
            }
            if(window.location.pathname.includes('PublishedPost')){
                setNavigateUrl(`/surfaceUI/Blog/${props.id}`);
                setNavigatePostUrl(`/surfaceUI/EditPublishedPost/${user.id}/${props.id}`);
            }
        }
    }, [user])

    return (
        <>
            <Paper
                key={uuid()} 
                ref={cardRef}
                className={cardStyles.root}
                onPointerUp={(e) => {
                    e.stopPropagation();
                    if (isChildElement(e.target, operateBlock.current)) {
                        setDisplay(!display);
                    } else {
                        navigate(navigateUrl);
                    }
                }}
            >
                <Box className={cardStyles.content}>
                    
                    {
                        title == '' ?
                            (<Skeleton variant="text" width={210} sx={{ fontSize: '1.25rem' }}/>) :
                            (<Typography varient={'h3'} className={cardStyles.title}>
                                {title}
                            </Typography>) 
                    }
                    
                    <Box>
                        {
                            description == '' ?
                                (<Skeleton variant="text" width={500} sx={{ fontSize: '1rem' }} />) :
                                (<Typography className={cardStyles.text}>{description}</Typography>)
                        }
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        {
                            time == '' ?
                                (<Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />) :
                                (<Typography className={cardStyles.text}>{`Last modified at: ${time}`}</Typography>)
                        }

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
                                        sx={{ color: '#717171' }}
                                        onPointerUp={() => {
                                            navigate(navigatePostUrl);
                                            //navigate(navigateUrl);
                                        }}
                                    >
                                        Edit
                                    </Typography>
                                    <Typography
                                        sx={{ color: '#cc4e00' }}
                                        onPointerUp={(e) => {
                                            setDeletePrompt(true)
                                        }}
                                    >
                                        Delete
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
            </Paper>
            {
                deletePrompt && 
                    <DeletePrompt 
                        id={props.id} 
                        deletePrompt={deletePrompt}
                        setDeletePrompt={setDeletePrompt}
                        setDeleteEle={setDeleteEle}
                    />
            }
        </>
    )
};

export default BlogComponent