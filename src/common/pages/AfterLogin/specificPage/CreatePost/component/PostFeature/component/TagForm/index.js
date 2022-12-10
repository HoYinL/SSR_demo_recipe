import React, { useEffect, useState } from "react";
import { ListItem, TextField, Typography, List } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { FormStyle } from "../../style";
import { TagList } from "./style";
import FilterForm from "../../../../../LandingPage/component/RecipesList/component/Filter/component/FilterForm";
import { useSelector } from "react-redux";
import TagListItem from "../../../../../component/TagListItem";

const TagFormComponent = (props) => {
    const formStyle = FormStyle();
    const tagListStyle = TagList();

    const [ tagList, setTagList ] = useState([]);
    const [ deleteTag, setDeleteTag ] = useState('');
    const [ selectTag, setSelectTag ] = useState(false);

    const filter = useSelector(state => state.filter.filter);

    const handleOnClick = () => {
        setSelectTag(!selectTag)
    }

    useEffect(() => {
        setTagList(tagList.filter((ele) => ele.props.id != deleteTag))
        props.setTagList(props.tagList.filter((ele) => ele != deleteTag))
    }, [deleteTag]);

    useEffect(() => {
        const assignTagList = [];
        filter.length != 0 && props.setTagList(filter.map((tag) => tag))

        filter.length != 0 && filter.map((tag) => assignTagList.push(<TagListItem tag={tag}/>)
        );

        setTagList([...assignTagList]);
    }, [filter]);

    useEffect(() => {
        const newTagList = props.savedTagList.map((tag) => <TagListItem tag={tag}/>)

        setTagList([...tagList, ...newTagList])
    }, [props.savedTagList])

    return (
        <>
            <Typography>Tag:</Typography>
            <TextField 
                placeholder="Select Tags..."
                disabled
                variant="filled"
                className={`${formStyle.textfield} ${tagListStyle.tag}`}
                onPointerUp={() => {
                    setSelectTag(true);
                }}
            />
            {
                selectTag && <FilterForm function={handleOnClick}/>
            }

            {
                tagList.length != 0 && <List className={tagListStyle.list}>{tagList}</List> 
            }
        </>
    )
}

export default TagFormComponent