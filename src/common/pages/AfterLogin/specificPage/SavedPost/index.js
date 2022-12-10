import React, {useEffect, useState, useRef} from "react";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { SavedPostStyle } from "./style";
import CreateNewBlogCard from "./component/CreateNewBlogCard";
import BlogCard from "./component/BlogCard";
import { getSavedPost } from "../../../../../server/axios/SavedPost";
import { initialHideLeftRightColumns } from "../../commonComponent/function";
import DeletedPrompt from "./component/DeletedPrompt";
import { DocumentOverflow } from "../../../CommonComponent/Appbar/style";

const savedPostComponent = () => {
    const savedPostContainer = useRef(null);

    const savedPostStyle = SavedPostStyle();
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
        if (user != null) {
            getSavedPost(user.id, times)
                .then((res) => {
                    setLoading(false);
                    res.posts.length != 0 && setPostList([...postList, ...res.posts]);
                    res.posts.length != 10 && setLoadedAll(true);
                    res.posts.length == 0 && times == 1 && setNoEditingPost(true);
                })
        }
    }, [user, times]);

    useEffect(() => {
        initialHideLeftRightColumns()
        //document.body.classList.remove(documentOverflow.hidden);
    }, []);

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
    }, [display])

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
        <>
        <Box
            sx={{ padding: `6rem 0 ${paddingBottom} !important` }} className={savedPostStyle.root}
        >
            <Box className={savedPostStyle.savedPostContainer}>
                <CreateNewBlogCard />
                <Typography className={savedPostStyle.editText}>Editing Posts</Typography>
                {
                    noEditingPost && <Typography className={savedPostStyle.noEditText}>No edtiting Post</Typography>
                }
                <Container ref={savedPostContainer} sx={{padding: '1rem 0 5rem'}}>
                {
                    postList.map((postID) => 
                        <BlogCard 
                            key={postID} 
                            setTarget={setTarget} 
                            id={postID} 
                        />)
                }
                {
                    loading && <h2 className={savedPostStyle.loader}>Loading Posts <CircularProgress color="inherit"/></h2>
                }
                {
                    !loading && <Box className={savedPostStyle.loader} />
                }
                </Container>
            </Box>
                {
                    display && <DeletedPrompt />
                }
        </Box>
        </>
    )
};

export default savedPostComponent