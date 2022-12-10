import React, { useEffect, useState, useRef } from "react";
import { Container } from "@mui/material";
import { Recipes } from "./style";
import BlogFormat from "./component/Blog";
import CardFormat from "./component/Card";
import DisplayWhole from "./component/DisplayWhole";
import { isChildElement } from "../../../../../../commonComponent/function";
import CommentBlock from "./component/CommentBlock";
import { useSelector } from "react-redux";
import { getBlockPost } from "../../../../../../../../../server/axios/api1";
import { DocumentOverflow } from "../../../../../../../CommonComponent/Appbar/style";

const RecipesComponent = (props) => {
    const useref = useRef(null);
    const wholeDisplayedRecipe = useRef(null);

    const documentOverflow = DocumentOverflow();

    const recipes = Recipes();

    const user = useSelector(state => state.token.token_payload);
    const filter = useSelector(state => state.filter.filter);

    const [displayAll, setDisplayAll] = useState(null);
    const [displayCommentBlock, setDisplayCommentBlock] = useState('');
    const [deleteEle, setDeleteEle] = useState(null);
    const [blockedPost, setBlockedPost] = useState(null);
    const [filterContent, setFilterContent] = useState([]);

    useEffect(() => {
        if (useref.current == null) {
            useref.current = true;
        } else {
            const recipeDisplayNone = (e) => {
                !isChildElement(e.target, wholeDisplayedRecipe.current) && setDisplayAll(null)
            };

            if (displayAll != null) {
                document.body.classList.add(documentOverflow.hidden);
                setTimeout(() => document.addEventListener('pointerup', recipeDisplayNone), 250)
            }
            else {
                document.body.classList.remove(documentOverflow.hidden);
            }

            return () => {
                document.removeEventListener('pointerup', recipeDisplayNone);
            }
        }
    }, [displayAll]);
    
    useEffect(() => {
        if(deleteEle != null){
            const postIndex = props.posts.indexOf(deleteEle);

            const clone_posts = [...props.posts];
            clone_posts.splice(postIndex, 1);
            props.setPosts([...clone_posts]);
        }
    }, [deleteEle]);

    useEffect(() => {
        if(user != null){
            getBlockPost(user.id)
            .then((res) => {
                setBlockedPost(res.blockedPostList);
            })
        }
    }, [user]);

    useEffect(() => {
        const filterItems = [];
        filter.length != 0 && filter.map((tag) => 
            filterItems.push(tag)
        );

        setFilterContent([...filterItems]);
    }, [filter]);

    return (
        <>
            {
                props.format == 'post' &&
                <Container className={recipes.container}>
                    {
                        props.posts != null && 
                            props.posts.map((post) =>
                            blockedPost instanceof Array && blockedPost.includes(post._id)?
                            (<></>):
                            (<CardFormat
                                setDisplayAll={setDisplayAll}
                                setDisplayCommentBlock={setDisplayCommentBlock}
                                postId={post._id}
                                post={post}
                                key={post._id}
                                markedPostList={props.markedPostList}
                                setDeleteEle={setDeleteEle}
                                filterContent={filterContent}
                            />)
                        )
                    }
                </Container>
            }

            {
                displayAll != null && props.format == 'post' &&
                <DisplayWhole
                    wholeDisplayedRecipe={wholeDisplayedRecipe}
                    displayAll={displayAll}
                    setDisplayAll={setDisplayAll}
                />
            }

            {
                props.format == 'blog' &&
                <Container sx={{ padding: '1rem 0' }}>
                    {
                            props.posts != null &&
                            props.posts.map((post) =>
                                blockedPost instanceof Array && blockedPost.includes(post._id)?
                                (<></>):
                                (<BlogFormat
                                    key={post._id}
                                    post={post}
                                    markedPostList={props.markedPostList}
                                    setDeleteEle={setDeleteEle}
                                    blockedPost={blockedPost}
                                    filterContent={filterContent}
                                />)
                            )
                    }
                </Container>
            }

            {
                displayCommentBlock != '' &&
                <CommentBlock
                    setDisplayCommentBlock={setDisplayCommentBlock}
                    postId={displayCommentBlock}
                />
            }
        </>
    )
}

export default RecipesComponent