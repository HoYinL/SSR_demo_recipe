import React, { useRef, useEffect, useState } from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import { CardStyles } from "../../style";
import { HighlightOff } from "@mui/icons-material";
import { isChildElement } from "../../function";
import { deletePublishedPost } from "../../../../../../../../../server/axios/PublishPost";
import { deleteSavedPost } from "../../../../../../../../../server/axios/SavedPost";
import { useSelector } from "react-redux";

const DeletePromptComponent = (props) => {
    const cardStyles = CardStyles();

    const deletePrompt = useRef(null);

    const user = useSelector(state => state.token.token_payload);

    const [deletePost, setDeletePost] = useState(false);

    useEffect(() => {
        if(deletePost == true){
            window.location.pathname.includes('SavedPost') &&
                deleteSavedPost(user.id, props.id)
                    .then((res) => {
                        props.setDeleteEle(true);
                    })
            window.location.pathname.includes('PublishedPost') &&
                deletePublishedPost(user.id, props.id)
                    .then((res) => {
                        props.setDeleteEle(true);
                    })
        }
    }, [deletePost]);

    useEffect(() => {
        const closure_pointerDownHandler = () => {
            return (e) => {
                e.stopPropagation();
                if (!isChildElement(e.target, deletePrompt.current)) {
                    props.setDeletePrompt(false);
                }
            }
        };

        const pointerDownHandler = closure_pointerDownHandler();

        document.addEventListener('pointerup', pointerDownHandler);

        return () => {
            document.removeEventListener('pointerup', pointerDownHandler);
        }
    }, []);

    return(
        <Box className={cardStyles.deletePrompt}>
            <Card ref={deletePrompt} className={cardStyles.deletePromptBlock}>
                <HighlightOff 
                    sx={{fontSize: '2rem'}}
                    onPointerUp={() => {
                        props.setDeletePrompt(false);
                    }}
                />
                <Box className={cardStyles.promptContent}>
                    <Typography className={`${cardStyles.title} ${cardStyles.PromptBlockTitle}`}>Delete story</Typography>
                    <Typography className={`${cardStyles.PromptBlockText}`}>Are you sure you want to delete this story?</Typography>
                    <Box className={cardStyles.button}>
                        <Button
                            sx={{ background: '#b00000 !important', border: '1px solid #ff7200 !important' }}
                            onPointerUp={() => {
                                setDeletePost(true)
                            }}
                        >
                            <Typography sx={{ color: 'white !important' }}>Delete</Typography>
                        </Button>
                        <Button
                            className={cardStyles.cancelButton}
                            onPointerUp={() => {
                                props.setDeletePrompt(false);
                            }}
                        >
                            <Typography>Cancel</Typography>
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default DeletePromptComponent