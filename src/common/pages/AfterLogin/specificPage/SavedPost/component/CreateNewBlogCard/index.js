import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateNewBlogCardComponent = (props) => {
    const navigate = useNavigate();

    const user = useSelector(state => state.token.token_payload);

    return(
        <Paper 
            onPointerUp={() => {
                //props.id == undefined? 
                    navigate(`/surfaceUI/CreatePost/${user.id}/`)
                    //:navigate(`/surfaceUI/CreatePost/${user.id}/${props.id}/`);
            }}
            sx={{cursor: 'pointer', margin: '0 2rem', padding: '1rem', borderBottom: '1px solid black', borderRadius: '0', boxShadow: 'none'}}>
            <Typography sx={{fontSize: '1.25rem', fontWeight: '700'}}>New Post</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{fontSize: '1rem'}}>Create your own new post/blog...</Typography>
                <Box style={{font: 'normal normal normal 28px/1 FontAwesome'}} className={'fa fa-pencil-square-o'}/>
            </Box>
        </Paper>
    )
};

export default CreateNewBlogCardComponent