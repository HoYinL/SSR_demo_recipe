import React, { useState, useEffect } from "react";
import { Box, Card, Typography } from "@mui/material";


const EmbedContent = (props) => {
    const [ newHtml, setNewHtml ] = useState('');

    useEffect(() => {
        if(props.embedSite != ''){
            const new_html = props.embedSite.data.html.replace('class="', 'className="');
            setNewHtml(new_html);        
        }
    }, [props.embedSite]);

    return(<>
        {props.embedSite != '' && <Card 
            onPointerDown={() => window.open(`${props.embedSite.data.url}`, '_blank')}
            style={{cursor: 'pointer', borderRadius: '0', width: '90%', maxWidth: '750px', minHeight: '150px', display: 'flex', margin: '1rem auto'}}>
        <Box style={{width: '100%', padding: '1.25rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'start'}}>
            <Typography>{props.embedSite.data.meta.title}</Typography>
            <Typography style={{fontSize: '.85rem', maxHeight: '3.75rem', overflow: 'hidden', textOverflow: 'ellipsis',  "WebkitLineClamp": '2', display: "-webkit-box", 'WebkitBoxOrient': 'vertical' }}>{props.embedSite.data.meta.description}</Typography>
            <Typography style={{fontSize: '.85rem', color: 'grey !important'}}>{props.embedSite.data.url.match(/https:\/\/(.*?).com/)[0]}</Typography>
        </Box>
        <Box style={{
            minWidth: '200px',
            backgroundImage: `url('${props.embedSite.data.links.thumbnail[0].href}')`,
            backgroundSize: '100% 100%',
            border: '1px solid #a29d9dc9'
        }}></Box>
        </Card>
        }
        </>
    )
};

export default EmbedContent