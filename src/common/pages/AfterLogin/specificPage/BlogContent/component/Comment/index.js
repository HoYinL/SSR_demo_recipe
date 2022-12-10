import React, { useState, useEffect } from "react";
import { getCommentContent } from "../../../../../../../server/axios/api1";
import { Paper, CardHeader, Skeleton, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CommentComponent = (props) => {
    const navigate = useNavigate();
    
    const [commentContent, setCommentContent] = useState(null);
    const [userName, setUserName] = useState('');
    const [authorIcon, setAuthorIcon] = useState('');
    const [comment, setComment] = useState('');
    const [authorId, setAuthorId] = useState('');

    useEffect(() => {
        getCommentContent(window.location.pathname, props.comment)
            .then((res) => {
                if(res.comment != null){
                    setCommentContent(res.comment);
                }
            });
    }, [props.comment]);

    useEffect(() => {
        if (commentContent != null) {
            setUserName(commentContent.commenter.username);
            setAuthorIcon(commentContent.commenter.icon);
            setAuthorId(commentContent.commenter._id)
            setComment(commentContent.comment)
        }
    }, [commentContent]);

    return (
        <>
            {
                commentContent != null &&
                <Paper sx={{ padding: '0 0 1rem 0', boxShadow: 'none', borderBottom: '1px solid #80808069', borderRadius: '0' }}>
                    <CardHeader
                        sx={{ width: '80%' }}
                        avatar={authorIcon == '' ?
                            (<Skeleton 
                            variant="circular"
                            onPointerUp={() => navigate(`/surfaceUI/AuthorPost/${authorId}`)}
                            >
                                <Avatar />
                            </ Skeleton>) :
                            (<Avatar 
                                src={authorIcon} 
                                onPointerUp={() => navigate(`/surfaceUI/AuthorPost/${authorId}`)}
                            />)
                        }
                        title={userName == '' ? <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width={50} /> : userName}
                    />
                    <Typography sx={{padding: '0 1rem', lineBreak: 'anywhere'}}>
                        {
                            comment == '' ? <Skeleton variant="text" sx={{ fontSize: '1', margin: 'auto' }} width={350} /> : comment
                        }
                    </Typography>
                </Paper>
            }
        </>
    )
};

export default CommentComponent