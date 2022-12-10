import React, { useState, useEffect } from "react";
import { Box, Button, CardHeader, Skeleton, Avatar } from "@mui/material";
import InputEmoji from "react-input-emoji";
import { useSelector, useDispatch } from "react-redux";
import { postPostComment } from "../../../../../../../server/axios/api1";
import { CommentBlockStyles } from "../../../LandingPage/component/RecipesList/component/Recipes/component/CommentBlock/style";
import { InBlogCommentBlockStyles } from "../Comment/style";
import { setPostedComment } from "../../../../../../store/postcommentreducer";

const CommentBlockComponent = () => {
    const commentBlockStyles = CommentBlockStyles();
    const inBlogCommentBlockStyles = InBlogCommentBlockStyles();

    const dispatch = useDispatch();

    const [userName, setUserName] = useState('');
    const [authorIcon, setAuthorIcon] = useState('');
    const [text, setText] = useState("");

    const user = useSelector(state => state.token.token_payload);

    useEffect(() => {
        if(user != null){
            setUserName(user.username);
            setAuthorIcon(localStorage.getItem('icon'));
        }
    }, [user]);

    return(
        <Box className={inBlogCommentBlockStyles.commentBlock}>
            <CardHeader
                sx={{ width: '80%', padding: '0 1rem' }}
                avatar={authorIcon == '' ?
                    (<Skeleton variant="circular">
                        <Avatar />
                    </ Skeleton>) :
                    (<Avatar src={authorIcon} />)
                }
                title={userName == '' ? <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} width={50} /> : userName}
            />
            <InputEmoji
                value={text}
                onChange={setText}
                cleanOnEnter
                placeholder="Type comment"
            />
            <Button
                className={commentBlockStyles.button}
                onPointerUp={(e) => {
                    postPostComment(user.id, props.postId, text)
                        .then((res) => {
                            setText('');
                            dispatch(setPostedComment(true));
                        });
                }}
            >
                Comment
            </Button>
        </Box>
    )
}

export default CommentBlockComponent