import React from "react";
import { Box, TextField } from "@mui/material";
import { InsertDeleteIconStyles } from "../../../../../style";
import { search_Photo } from "../../../../../../../../../../../../../../../../../../../../../../server/axios/api1";

const UpslashInputComponent = (props) => {
    const insertDeleteIconStyle = InsertDeleteIconStyles();

    return(
        <Box className={insertDeleteIconStyle.text}> 
            <TextField
                className={insertDeleteIconStyle.text} 
                sx={{borderBottom: '1px solid grey'}}
                placeholder="Input search item..." 
                onKeyPress={(e) => {
                    if(e.key == "Enter"){
                        e.preventDefault();
                        props.setSearchItem(e.target.value);
                        search_Photo(e.target.value, 1).then((res) => {
                            props.setDisplayUpslashImg(res);
                            props.setDisplayOutput(true);
                            props.setTotalImg(res.total);
                            props.setTotalPages(res.total_pages);
                        })                         
                    }
                }}
            />
        </Box>
    )
};

export default UpslashInputComponent