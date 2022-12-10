import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import PostFeature from "./component/PostFeature";
import PostContent from "./component/PostContent";
import { CreatePostPage } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { initialColumnsDisplayNone } from "../../commonComponent/function";
import { useMediaQuery } from "react-responsive";
import { setPublish } from "../../../../store/publishreducer";
import { useNavigate } from "react-router-dom";
import { setSave } from "../../../../store/savereducer";
import { deleteSavedPost } from "../../../../../server/axios/SavedPost";
import {
    saveNewBlog,
    saveExistingBlog,
    getSavedBlogContent,
} from "../../../../../server/axios/CreatePost";
import {
    publishNewBlog,
} from "../../../../../server/axios/PublishPost";
import {
    editPublishedBlog,
    getPublishedBlogContent,
    deletePublishedBlogContent
} from "../../../../../server/axios/EditPublishedPost";
import { usePrompt } from "./component/Prompt";
import { clearBlogContent } from "../../../../store/blogcontentreducer";
import { addBlogContent } from "../../../../store/blogcontentreducer";
import { setSaveBlogContent } from "../../../../store/savecontentreducer";
import { removeAllFilter } from "../../../../store/filterreducer";
import { FormStyle } from "./component/PostFeature/style";
import { DocumentOverflow } from "../../../CommonComponent/Appbar/style";

const CreatePostComponent = () => {
    const useref = useRef(false);

    const createPostPage = CreatePostPage();
    const formStyle = FormStyle();
    const documentOverflow = DocumentOverflow();

    const paddingBottom = useSelector(state => state.paddingBottom.paddingBottom);
    const blogContent = useSelector(state => state.blogContent.blogContent);
    const user = useSelector(state => state.token.token_payload);
    const publishBlog = useSelector(state => state.publishBlog.publishBlog);
    const save = useSelector(state => state.save.save);

    const [postData, setPostData] = useState({});
    const [saveContent, setSaveContent] = useState(null);
    const [saveFeature, setSaveFeature] = useState(null);
    const [active, setActive] = useState(false);
    const [blogId, setBlogId] = useState('');
    const [pathname, setPathname] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const s = useMediaQuery({
        query: "(min-width: 500px)"
    });

    const fun = () => {
        dispatch(clearBlogContent([]));
        dispatch(setSave(true));
        setTimeout(() => dispatch(setSave(false)), 500);
    };

    usePrompt('Save BlogContent Before Leaving?', active, fun);

    useEffect(() => {
        if(typeof window != "undefined"){
            setPathname(window.location.pathname)
        }

        document.body.classList.remove(documentOverflow.hidden);
        scrollTo(0, 0);
        document.addEventListener('readystatechange', initialColumnsDisplayNone);
        dispatch(setPublish(true));
    }, []);

    useEffect(() => {
        if (save == true) {
            pathname == `/surfaceUI/${user.id}/CreatePost/` && dispatch(addBlogContent(''));
        }
    }, [save]);

    useEffect(() => {
        if (useref.current == false) {
            useref.current = true;
        } else if (save == true && blogContent.length != 0 && publishBlog == false) {
            if (pathname.includes('CreatePost')) {
                (pathname === `/surfaceUI/CreatePost/${user.id}/` ?
                    saveNewBlog(pathname, blogContent, postData)
                        .then((res) => {
                            dispatch(setSaveBlogContent(true));
                            dispatch(removeAllFilter());
                        })
                    :
                    saveExistingBlog(pathname, blogContent, postData)
                        .then((res) => {
                            dispatch(setSaveBlogContent(true));
                            dispatch(removeAllFilter());
                        })
                )
            }

            // case of esit Published Post
            if (pathname.includes('EditPublishedPost')) {
                deletePublishedBlogContent(pathname)
                    .then((res) => {
                        return editPublishedBlog(pathname, blogContent, postData)
                    })
                    .then(() => {
                        dispatch(setSave(false));
                        navigate(`/surfaceUI/${user.id}/LandingPage`);
                        dispatch(removeAllFilter());
                    })
            }
        } else if (save == true && blogContent.length != 0 && publishBlog == true) {
            publishNewBlog(user.id, blogContent, postData)
                .then((res) => {
                    dispatch(setSave(false));
                    navigate(`/surfaceUI/${user.id}/LandingPage`);
                    dispatch(removeAllFilter());

                    // if current content is saved in model 
                    return pathname != `/surfaceUI/CreatePost/${user.id}/` && deleteSavedPost(user.id, blogId);
                });
        }
    }, [blogContent, pathname]);

    useEffect(() => {
        if (publishBlog == true) {
            setActive(false);
            dispatch(setSave(true));
        }
    }, [publishBlog])

    useEffect(() => {
        const autoSave = () => {
            return async (event) => {
                dispatch(clearBlogContent([]));
                dispatch(setSave(true));

                for (let i = 0; i < 250; i++) {
                    ('i');
                }

                if (!navigator.onLine) {
                    // save in indexedDB
                    event.preventDefault();
                    event.returnValue = "";
                    return "";
                }
            }
        };

        const unloadCallback = autoSave();

        window.addEventListener("beforeunload", unloadCallback);

        return () => {
            window.removeEventListener("beforeunload", unloadCallback);
        };
    }, []);

    useEffect(() => {
        if (user != null && pathname != '') {
            (pathname.includes('CreatePost'));
            pathname.includes('CreatePost') &&
                getSavedBlogContent(pathname)
                    .then((res) => {
                        setBlogId(res.post?._id || '');
                        setSaveContent(res.post || null);
                        setSaveFeature(res.post?.feature || null);
                    });
            pathname.includes('EditPublishedPost') &&
                getPublishedBlogContent(pathname)
                    .then((res) => {
                        setBlogId(res.post._id)
                        setSaveContent(res.post);
                        setSaveFeature(res.post.feature);
                    });
        }
    }, [user, pathname]);

    useEffect(() => {
        setTimeout(() => {
            setActive(true)
        }, 5000)
    }, []);

    return (
        <Box sx={{ padding: `4rem 0 ${paddingBottom} !important` }} className={createPostPage.root} >
            <Box className={formStyle.backgroundImg}>
                <PostFeature saveFeature={saveFeature} postData={postData} setPostData={setPostData} />
            </Box>
            <PostContent saveContent={saveContent} />
        </Box>
    )
}

export default CreatePostComponent