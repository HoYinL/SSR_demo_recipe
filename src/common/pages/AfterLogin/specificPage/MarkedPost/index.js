import React, { useState, useRef, useEffect} from "react";
import { SavedPostStyle } from "../SavedPost/style";
import { useSelector } from "react-redux";
import BlogCard from "./component/BlogCard";
import DeletedPrompt from "../SavedPost/component/DeletedPrompt";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import { initialHideLeftRightColumns } from "../../commonComponent/function";
import { getMarkedPost } from "../../../../../server/axios/MarkPost";
import { DocumentOverflow } from "../../../CommonComponent/Appbar/style";

const MarkedPostComponent = () => {
    const markedPostContainer = useRef(null);

    const markedPostStyle = SavedPostStyle();
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
            getMarkedPost(user.id, times)
                .then((res) => {
                    (res);
                    setLoading(false);
                    res.postList.length != 0 && setPostList([...postList, ...res.postList]);
                    res.postList.length != 10 && setLoadedAll(true);
                    res.postList.length == 0 && times == 1 && setNoEditingPost(true);
                })
        }
    }, [times, user]);

    useEffect(() => {
        if (target != null) {
            const list = markedPostContainer.current.children;

            let eleIndex;

            for (let index = 0; index < list.length; index++) {
                list[index] === target && (eleIndex = index);
            };

            if(eleIndex == 0){
                const clone_list = [...postList];
                clone_list.pop();
                setPostList([...clone_list]);
                setDisplay(true);
            } else {
                const clone_list = [...postList];
                clone_list.splice(eleIndex + 1, 1);
                setPostList([...clone_list]);
                setDisplay(true);
            }

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
            sx={{ padding: `6rem 0 ${paddingBottom} !important` }} className={markedPostStyle.root}
        >
            <Box className={markedPostStyle.savedPostContainer}>
                <Typography className={markedPostStyle.editText}>Marked Post</Typography>
                {
                    noEditingPost && <Typography className={markedPostStyle.noEditText}>No marked post</Typography>
                }
                <Container ref={markedPostContainer} sx={{ padding: '1rem 0 5rem' }}>
                    {
                        postList.map((post) =>
                            <BlogCard
                                key={post._id}
                                setTarget={setTarget}
                                id={post._id}
                                post={post}
                            />)
                    }
                    {
                        loading && <h2 className={markedPostStyle.loader}>Loading Posts <CircularProgress color="inherit" /></h2>
                    }
                    {
                        !loading && <Box className={markedPostStyle.loader} />
                    }
                </Container>
            </Box>
            {
                display && <DeletedPrompt />
            }
        </Box>
    )
};

export default MarkedPostComponent