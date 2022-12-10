import React from "react";
import { Box } from "@mui/material";
import TextComponent from "./component/PlainText";
import TitleComponent from "./component/Title";

const TextFormatComponent = (props) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap'}}>
            <TextComponent
                setModifierType={props.setModifierType}
                setType={props.setType}
            />
            <TitleComponent 
                setModifierType={props.setModifierType}
                setType={props.setType}
            />
        </Box>
    )
};

export default TextFormatComponent