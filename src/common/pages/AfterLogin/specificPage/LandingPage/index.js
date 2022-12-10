import React, { useEffect, useState, useRef } from "react";
import { LandingPage } from "./style";
import { Box } from "@mui/material";
import ApplicationNavigation from "./component/ApplicationNavigation";
import CreateShortPost from "./component/CreateShortPost";
import RecipesList from "./component/RecipesList";
import { useSelector, useDispatch } from "react-redux";
import { initialColumnDisplayNone, initialColumnsDisplay, initialHideLeftRightColumns, showLeftColumn } from "../../commonComponent/function";
import { getPost } from "../../../../../server/axios/api1";
import { setPublish } from "../../../../store/publishreducer";
import { DocumentOverflow } from "../../../CommonComponent/Appbar/style";

const LandingPageComponent = () => {
    const landingpage = LandingPage();
    const documentOverflow = DocumentOverflow();
    
    const dispatch = useDispatch();

    const paddingBottom = useSelector(state => state.paddingBottom.paddingBottom);

    const [showColumn, setShowColumn] = useState(true);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [times, setTimes] = useState(1);
    const [loadedAll, setLoadedAll] = useState(false);

    const useref = useRef(false);

    useEffect(() => {
        if (typeof window != 'undefined') {
            window.scrollTo(0, 0);
            if (window.innerWidth < 1100) {
                initialColumnDisplayNone();
                setShowColumn(false);
            } else {
                initialColumnsDisplay();
                setShowColumn(true);
            }

            document.body.classList.remove(documentOverflow.hidden);
            window.addEventListener('resize', () => {
                window.innerWidth < 1100 ? initialHideLeftRightColumns() : initialColumnsDisplay();
            })
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        getPost(window.location.pathname, times).then((res) => {
            setLoading(false);
            res.length != 0 && setPosts([...posts, ...res]);
            res.length != 10 && setLoadedAll(true);
        })
        dispatch(setPublish(false));
    }, [times]);

    useEffect(() => {
        const closure_scrollHandler = () => {
            return (e) => {
                if (window.scrollY + window.innerHeight + 2 >= document.body.scrollHeight) {
                    setTimes(times => times + 1);
                }
            }
        };
        const scrollHandler = closure_scrollHandler();

        if (loadedAll == false) {
            document.addEventListener('scroll', scrollHandler);
        } else {
            document.removeEventListener('scroll', scrollHandler);
        }

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [loadedAll]);

    useEffect(() => {
        if (useref.current == false) {
            useref.current = true
        } else {
            showLeftColumn == true ? initialColumnsDisplay() : initialHideLeftRightColumns()
        }
    }, [showColumn]);

    return (
        <Box
            sx={{ padding: `6rem 0 ${paddingBottom} !important` }} className={landingpage.root}
        >
            <ApplicationNavigation />
            <CreateShortPost />
            <RecipesList
                loading={loading}
                posts={posts}
                setPosts={setPosts}
            />
        </Box>
    )
}

export default LandingPageComponent