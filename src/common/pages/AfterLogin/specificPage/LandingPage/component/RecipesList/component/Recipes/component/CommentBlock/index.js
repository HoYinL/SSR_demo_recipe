import React, {useState, useEffect, useRef} from "react";
import { Box, Button } from "@mui/material";
import { CommentBlockStyles } from "./style";
import InputEmoji from "react-input-emoji";
import { isChildElement } from "../../../../../../../../commonComponent/function";
import { postPostComment } from "../../../../../../../../../../../server/axios/api1";
import { useSelector, useDispatch } from "react-redux";
import { setPostedComment } from "../../../../../../../../../../store/postcommentreducer";

const CommentBlock = (props) => {
    const commentBlockStyles = CommentBlockStyles();

    const dispatch = useDispatch();

    const user = useSelector(state => state.token.token_payload);

    const commentBlock = useRef(null);
    const Block = useRef(null);

    const [text, setText] = useState("");

    useEffect(() => {
        Block.current.addEventListener('pointerup', (e) => {
            if(!isChildElement(e.target, commentBlock.current)){
                props.setDisplayCommentBlock('');
            }
        })
    }, []);

    return (
        <Box ref={Block} className={commentBlockStyles.root}>
            <Box ref={commentBlock} className={commentBlockStyles.commentBlock}>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    placeholder="Type comment"
                />
                <Box className={commentBlockStyles.dividingLine}/>
                <Button
                    className={commentBlockStyles.button}
                    onPointerUp={(e) => {
                        postPostComment(user.id, props.postId, text)
                            .then((res) => {
                                props.setDisplayCommentBlock('');
                                dispatch(setPostedComment(true));
                            });
                    }}
                >
                    Comment
                </Button>
            </Box>
        </Box>
    )
};

export default CommentBlock