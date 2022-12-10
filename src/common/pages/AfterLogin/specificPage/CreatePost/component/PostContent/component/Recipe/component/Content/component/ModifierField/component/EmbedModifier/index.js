import React, { useState, useEffect, useRef } from "react";
import { Box, Card, Typography } from "@mui/material";
import EmbedIframe from "./component/Iframe";
import {
    EmbedModifierStyles,
    container,
    content,
    embedImg,
    embedTitle,
    embedDescription,
    embedLink
} from "./style";
import { Book, Web } from '@mui/icons-material';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
import { addBlogContent } from "../../../../../../../../../../../../../../store/blogcontentreducer";
import { embedWebPage } from "../../../../../../../../../../../../../../../server/axios/api1";

const EmbedModifier = (props) => {
    const [format, setFormat] = useState('block');
    const [displayBlock, setDisplayBlock] = useState(null);
    const [alternative, setAlternative] = useState(true);
    const [embedSite, setEmbedSite] = useState('');

    const embedRef = useRef(null);

    const embedModifierStyles = EmbedModifierStyles();

    const save = useSelector(state => state.save.save);

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.saveContent != undefined) {
            embedWebPage(props.saveContent.props.src).then((res) => {
                setEmbedSite(res);
                setFormat(props.saveContent.props.format);
            });
        } else {
            setEmbedSite(props.embedSite);
        }
    }, [props.saveContent]);

    useEffect(() => {
        if (embedSite != '' && embedSite.data.html?.match(/^<script/)) {
            setAlternative(false);
        }
        if (embedSite != '' && format === 'block') {
            setDisplayBlock(
                <a
                    format={`${format}`}
                    href={`${embedSite.data.url}`}
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                >
                    <Card style={container}>
                        <Box style={content}>
                            <Typography style={embedTitle}>{embedSite.data.meta.title}</Typography>
                            <Typography style={embedDescription}>{embedSite.data.meta.description}</Typography>
                            <Typography style={embedLink}>{embedSite.data.url.match(/https:\/\/(.*?).com/)[0]}</Typography>
                        </Box>
                        <Box style={{ ...embedImg, backgroundImage: `url('${embedSite.data.links.thumbnail?.[0].href || embedSite.data.links.icon[0]?.href}')` }} />
                    </Card>
                </a>
            )
        }
        if (embedSite != '' && format === 'iframe') {
            setDisplayBlock(<EmbedIframe format={format} html={embedSite.data.html} embedSite={embedSite} embedRef={embedRef}/>)
        }
    }, [embedSite, format]);

    useEffect(() => {
        if (save === true) {
            dispatch(addBlogContent(renderToStaticMarkup(
                <Box key={uuid()} type="embed" src={embedSite.data.url} format={format}></Box>)
            ));
        }
    }, [save]);

    return (
        <Box className={embedModifierStyles.root}>
            {
                <Box ref={embedRef}>
                    {
                        embedSite != '' && alternative &&
                        <Box className={embedModifierStyles.formatChoice}>
                            <Book onPointerUp={() => setFormat('block')} />;
                            <Box sx={{ width: '1px', height: '70%', backgroundColor: 'white' }} />;
                            <Web onPointerUp={() => setFormat('iframe')} />;
                        </Box>
                    }

                    {embedSite != '' && format === 'block' && displayBlock}

                    {embedSite != '' && format === 'iframe' && displayBlock}
                </Box>
            }
        </Box>
    )
};

export default EmbedModifier