import React, { useState, useEffect } from "react";
import { TextField, Box } from "@mui/material";
import { extract } from 'oembed-parser';
import { InputTextStyles } from "./style";

const InputVideoComponent = (props) => {
    const inputTextStyles = InputTextStyles();

    const [ url, setUrl ] = useState('');
    const [ embedVideo, setEmbedVideo ] = useState('');
    const [ displayVideo, setDisplayVideo ] = useState(false);

    useEffect(() => {
        if(embedVideo != '') {
            setDisplayVideo(true);
            props.setModifierType('video');
            props.setNewFieldContent(<iframe type='video' src={embedVideo} frameBorder="0" style={{width: '100%', height: '50vw', maxHeight: '400px'}} />);
        }
    }, [embedVideo]);

    return (<>
    {
        displayVideo == false && <TextField 
            className={inputTextStyles.root}
            placeholder="Paste a YouTube, Vimeo, or other video link, and press Enter"
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => {
                if(e.key == "Enter"){
                    e.preventDefault();
                    extract(url).then((oembed) => {
                        if(oembed.type == 'video'){
                            (oembed);
                            setEmbedVideo({...oembed, link: url});
                        }
                    }).catch((err) => {
                        console.trace(err)
                    })
                }
            }}
        />
    }
    </>)
}

export default InputVideoComponent