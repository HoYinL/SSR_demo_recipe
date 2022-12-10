import React, { useState, useEffect } from "react";
import { TextField, Box, Card, Typography } from "@mui/material";
import { embedWebPage } from "../../../../../../../../../../../../../../../../server/axios/api1";
import { InputTextStyles } from "./style";
import HTMLparser from 'html-react-parser';
import EmbedContent from "./component/EmbedContent";

const EmbedComponent = (props) => {
    const inputTextStyles = InputTextStyles();

    const [ url, setUrl ] = useState('');
    const [ embedSite, setEmbedSite ] = useState('');

    return (<>
    {
        embedSite == '' && <TextField 
            className={inputTextStyles.root}
            placeholder="Paste the link of the site (e.g. twitter) and press Enter"
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => {
                if(e.key == "Enter"){
                    e.preventDefault();
                    embedWebPage(url).then((res) => {
                        (res);
                        if(res.data.status != 417){
                            setEmbedSite(res);
                            props.setNewFieldContent(res);
                            props.setModifierType('embed');
                            setTimeout(() => {
                                props.setType('text');
                            }, 0);
                        } else {
                            e.target.value = "";
                            e.target.placeholder = "Can't embed the url link, Please try again";
                        }
                    })
                }
            }}
        />
    }
    </>)
}

export default EmbedComponent 