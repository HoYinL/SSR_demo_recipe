import React, { useState, useEffect, useRef } from "react";
import CreatePostFeatures from "../../../../../CreatePost/component/PostFeature";
import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PostFeatureStyles from "./style";
import { isChildElement } from "../../../../../../commonComponent/function";
import { setSaveBlogContent } from "../../../../../../../../store/savecontentreducer";
import { saveNewBlog } from "../../../../../../../../../server/axios/CreatePost";

const PostFeaturesComponent = (props) => {
    const dispatch = useDispatch();

    const postFeatureBlock = useRef(null);
    const postFeatureConatiner = useRef(null);
    const button = useRef(null);

    const postFeatureStyles = PostFeatureStyles();

    const saveContent = useSelector(state => state.saveContent.saveContent);
    const user = useSelector(state => state.token.token_payload);

    const [postData, setPostData] = useState(null);
    const [saveState, setSaveState] = useState('');

    useEffect(() => {
        if (saveContent == true) {
            setSaveState('Saved');
            setTimeout(() => { dispatch(setSaveBlogContent(false)) }, 1500)
        } else if (saveContent == false) {
            setSaveState('Save');
        } else {
            setSaveState('Saving..');
        }
    }, [saveContent]);

    useEffect(() => {
        postFeatureConatiner.current.addEventListener('pointerup', (e) => {
            if(!isChildElement(e.target, postFeatureBlock.current)){
                props.setCreatePost(false);
            }
        });
    }, []);

    return(
        <Box ref={postFeatureConatiner} className={postFeatureStyles.root}>
            <Box ref={postFeatureBlock} className={postFeatureStyles.featureBlock}>
                <CreatePostFeatures
                    setPostData={setPostData}
                />
                <Button
                    ref={button}
                    className={postFeatureStyles.button}
                    onPointerDown={(e) => {
                        const saveUrl = `/surfaceUI/CreatePost/${user.id}`;
                        dispatch(setSaveBlogContent(null));
                        saveNewBlog(saveUrl, [], postData)
                            .then((res) => {
                                dispatch(setSaveBlogContent(true));
                                props.setCreatePost(false);
                            })
                    }}
                >
                    {saveState}
                </Button>
            </Box>
        </Box>
    )
}

export default PostFeaturesComponent