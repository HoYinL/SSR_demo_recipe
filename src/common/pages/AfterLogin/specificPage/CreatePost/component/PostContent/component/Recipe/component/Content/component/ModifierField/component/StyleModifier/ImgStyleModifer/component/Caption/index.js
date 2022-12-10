import React, { useState } from "react";
import { TextField } from "@mui/material";

const CaptionComponent = (props) => {

    const [ caption, setContent ] = useState('');
    const [ enterCaption, setEnterCaption ] = useState(false);

    return (
        <>
            {
                enterCaption == false && 
                    <TextField 
                        placeholder="Type caption of image(optional)" 
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                        value={caption}
                        onKeyPress={(e) => {
                            if(e.key == 'Enter'){
                                setEnterCaption(true);
                                props.setCaption(caption)
                            }
                        }}
                    />
            }
        </>
    )
}

export default CaptionComponent