import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Container, List, Box, Card } from "@mui/material";
import { Post } from "./style";
import Filter from "./component/Filter";
import Recipes from "./component/Recipes";
import { getPropertyStyleValue } from "../../../../commonComponent/function";
import { CircularProgress } from "@mui/material";
import { SavedPostStyle } from "../../../SavedPost/style";
import { getMarkedPostId } from "../../../../../../../server/axios/MarkPost";
import TagListItem from "../../../component/TagListItem";

const RecipeContainer = (props) => {
    const useref = useRef(null);
    const container = useRef(null);
    const savedPostStyle = SavedPostStyle();

    const post = Post();

    const [format, setFormat] = useState('post');
    const [minHeight, setMinHeight] = useState({});
    const [markedPostList, setMarkedPostList] = useState('');

    const filter = useSelector(state => state.filter.filter);
    const user = useSelector(state => state.token.token_payload);

    useEffect(() => {
        if(useref.current == null){
            useref.current = true;
        } else {
            container.current != null && setMinHeight({minHeight: `${getPropertyStyleValue(container.current, 'height')}px`})
        }
    }, [format]);

    useEffect(() => {
        if(user != null){
            getMarkedPostId(user.id)
            .then((res) => {
                (res);
                setMarkedPostList(res.postList);
            });
        }
    }, [user]);

    return( 
        <>
            <Box className={post.formContainer}>
                <Card sx={{ width: '10px', transform: 'translateY(-1px) translateX(-0.5px)', boxShadow: '0px 2px 1px -4px rgb(141 140 140 / 40%), 0px 0 0 0px rgb(0 0 0 / 0%), 0px 0px 0px 0px rgb(0 0 0 / 75%)' }} />
                <Card
                    onPointerDown={() => setFormat('post')}
                    className={`${post.formCard} ${format == 'post' ? post.formCardClicked : post.formCardNotClicked}`}
                >
                    Post
                </Card>
                <Card
                    onPointerDown={() => setFormat('blog')}
                    className={`${post.formCard} ${format == 'blog' ? post.formCardClicked : post.formCardNotClicked}`}
                >
                    Blog
                </Card>
                <Card sx={{ width: '10px', transform: 'translateY(-1px) translateX(.5px)', boxShadow: '0px 0px 0px 0px rgb(0 0 0 / 0%), -0.5px 1px 0px 0px rgb(0 0 0 / 4%), 0px 0px 0px 0px rgb(0 0 0 / 0%)' }} />
            </Box>
            <Container ref={container} sx={minHeight} className={post.root}>
                <Filter />
                {
                    <List className={post.filterList}>
                        {
                            filter.length != 0 && filter.map((filter) => <TagListItem tag={filter}/>)
                        }
                    </List>
                }
                <Recipes
                    markedPostList={markedPostList}
                    format={format}
                    posts={props.posts}
                    className={post.container}
                    setPosts={props.setPosts}
                />
                {
                    props.loading ? <h2 className={savedPostStyle.loader}>Loading Posts <CircularProgress color="inherit" /></h2> : <Box className={savedPostStyle.loader} />
                }
            </Container>
        </>
    )
}

export default React.memo(RecipeContainer)