import React from "react";
import { removeFilterState } from "../../../../../store/filterreducer";
import { useDispatch } from "react-redux";
import { TagList } from "../../CreatePost/component/PostFeature/component/TagForm/style";
import { ListItem, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material";

const TagListItem = (props) => {
    const tagListStyle = TagList();

    const dispatch = useDispatch();

    return(
        <ListItem key={props.tag} id={props.tag} className={tagListStyle.listItem}>
            <Typography>{props.tag}</Typography>
            <Cancel onPointerUp={() => {
                dispatch(removeFilterState(props.tag));
            }}/>
        </ListItem>
    )
};

export default TagListItem