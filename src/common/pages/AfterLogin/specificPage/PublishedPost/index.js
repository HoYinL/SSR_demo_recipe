import React, { useState, useRef, useEffect} from "react";
import { SavedPostStyle } from "../SavedPost/style";
import { useSelector } from "react-redux";
import BlogCard from "../SavedPost/component/BlogCard";
import DeletedPrompt from "../SavedPost/component/DeletedPrompt";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import { getPublishedBlog } from "../../../../../server/axios/PublishPost";
import { initialHideLeftRightColumns } from "../../commonComponent/function";
import { DocumentOverflow } from "../../../CommonComponent/Appbar/style";

const PublishedPostsComponent = () => {
    const publishedPostContainer = useRef(null);

    const publishedPostStyle = SavedPostStyle();
    const documentOverflow = DocumentOverflow();

    const paddingBottom = useSelector(state => state.paddingBottom.paddingBottom);
    const user = useSelector(state => state.token.token_payload);

    const [postList, setPostList] = useState([]);
    const [target, setTarget] = useState(null);
    const [times, setTimes] = useState(1);
    const [loadedAll, setLoadedAll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState(false);
    const [noEditingPost, setNoEditingPost] = useState(false);

    useEffect(() => {
        initialHideLeftRightColumns()
        //document.body.classList.remove(documentOverflow.hidden);
    }, []);

    useEffect(() => {
        if (user != null) {
            getPublishedBlog(user.id, times)
                .then((res) => {
                    setLoading(false);
                    res.posts.length != 0 && setPostList([...postList, ...res.posts]);
                    res.posts.length == 10 && setLoadedAll(true);
                    res.posts.length == 0 && times == 1 && setNoEditingPost(true);
                })
        }
    }, [user, times]);

    useEffect(() => {
        if (target != null) {
            const eleIndex = postList.indexOf(target);
            const clone_list = [...postList];
            clone_list.splice(eleIndex, 1);
            setPostList([...clone_list]);
            setDisplay(true)

            setTimeout(() => setTarget(null));
        }
    }, [target]);

    
    useEffect(() => {
        if(display == true){
            setTimeout(() => {
                setDisplay(false);
            }, 750);
        }
    }, [display]);

    useEffect(() => {
        const closure_scrollHandler = () => {
            return (e) => {
                if (window.scrollY + window.innerHeight + 2 >= document.body.scrollHeight) {
                    setTimes(times => times + 1);
                    setLoading(true);
                }
            }
        };
        const scrollHandler = closure_scrollHandler();

        if(loadedAll == false){
            document.addEventListener('scroll', scrollHandler);
        } else {
            document.removeEventListener('scroll', scrollHandler);
        }

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [loadedAll]);

    return (
        <Box
            sx={{ padding: `6rem 0 ${paddingBottom} !important` }} className={publishedPostStyle.root}
        >
            <Box className={publishedPostStyle.savedPostContainer}>
                <Typography className={publishedPostStyle.editText}>Published Post</Typography>
                {
                    noEditingPost && <Typography className={publishedPostStyle.noEditText}>No published post</Typography>
                }
                <Container ref={publishedPostContainer} sx={{ padding: '1rem 0 5rem' }}>
                    {
                        postList.map((postID) =>
                            <BlogCard
                                key={postID}
                                setTarget={setTarget}
                                id={postID}
                            />)
                    }
                    {
                        loading && <h2 className={publishedPostStyle.loader}>Loading Posts <CircularProgress color="inherit" /></h2>
                    }
                    {
                        !loading && <Box className={publishedPostStyle.loader} />
                    }
                </Container>
            </Box>
            {
                display && <DeletedPrompt />
            }
        </Box>
    )
}

export default PublishedPostsComponent