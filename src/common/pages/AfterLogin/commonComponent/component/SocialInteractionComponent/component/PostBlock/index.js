import React, { useState, useEffect } from "react";
import { ListItem, Avatar, Skeleton, ListItemText, ListItemAvatar, ListItemButton } from "@mui/material";
import { FriendList } from "../../style";
import { useNavigate } from "react-router-dom";

const PostBlockComponent = (props) => {
    const friendlist = FriendList();

    const navigate = useNavigate();

    const [postIcon, setPostIcon] = useState('');
    const [dishName, setDishName] = useState('');
    const [postId, setPostId] = useState('');

    useEffect(() => {
        if (props.popularPost != null) {
            setPostIcon(props.popularPost.feature?.backgroundImg || '');
            setDishName(props.popularPost.feature?.dish_name || '');
            setPostId(props.popularPost._id);
        }
    }, [props.popularPost]);

    return (
        <ListItemButton sx={{padding: '0'}}>
        <ListItem
            className={friendlist.listitem_group}
            onPointerUp={() => navigate(`/surfaceUI/Blog/${postId}`)}
        >
                <ListItemAvatar>
                    <Avatar src={postIcon} />
                </ListItemAvatar>
                <ListItemText
                    className={friendlist.title}
                >
                    {dishName == '' ? <Skeleton varient="text" width={50} /> : dishName}
                </ListItemText>
        </ListItem>
        </ListItemButton>
    )
};

export default PostBlockComponent