import React from "react";
import { InsertTypeIconStyles, InsertIconStyle } from "../../../style";
import { TextFields } from "@mui/icons-material";
import { Box } from "@mui/material";

const TextTypeComponent = (props) => {
    const insertTypeIconStyles = InsertTypeIconStyles();
    const insertIconStyles = InsertIconStyle();
    const [ transform, setTransform ] = useState(false);

    return(
    <Box sx={{position: 'relative', display: 'flex', margin: '1rem 0'}}>
        <TextFields
            className={ `${insertTypeIconStyles.cross} ${insertIconStyles.root}` }
            onPointerDown={() => {
                setTransform(!transform);
            }}
        />

        {
        transform && 
            <Type 
                setType={props.setType}
                setTransform={props.setTransform}
                display={props.display}
            />
        }
</Box>)
};

export default TextTypeComponent;