import React, { useEffect } from "react";
import { TextField, Typography } from "@mui/material";
import { FormStyle } from "../../style";

const DescriptionFormComponent = (props) => {
    const formStyle = FormStyle();

    return (
        <>
            <Typography>Description:</Typography>
            <TextField 
                defaultValue={props.savedDescription}
                placeholder="Input Description..."
                variant="filled"
                multiline
                rows={3}
                className={formStyle.textfield}
                onChange={(e) => {
                    props.setDescription(e.target.value)
                }}
            />
        </>
    )
}

export default DescriptionFormComponent