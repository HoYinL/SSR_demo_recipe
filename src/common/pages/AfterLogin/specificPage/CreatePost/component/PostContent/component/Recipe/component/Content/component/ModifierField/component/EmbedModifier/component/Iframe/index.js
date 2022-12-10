import React, { useState, useEffect, useRef } from "react";
import { Container, Box } from "@mui/material";
import { Skeleton } from "@mui/material";
import { FacebookEmbed, InstagramEmbed, TwitterEmbed, YouTubeEmbed } from 'react-social-media-embed';
import { embedStyles } from "../../style";

const EmbedIframe = (props) => {
    const [socialMedia, setSocialMedia] = useState('');
    const [skeleton, setSkeletion] = useState(true);

    const useref = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.iframe.ly/embed.js";
        document.body.appendChild(script);

        return () => script.remove();
    }, [props.embedSite]);

    useEffect(() => {
        if (props.format === 'iframe') {
            const skeleton = setInterval(() => {
                if (useref.current === null) {
                    clearInterval(skeleton);
                } else {
                    const embed_iframe = useref.current.getElementsByTagName("iframe");
                    if (embed_iframe.length != 0) {
                        embed_iframe[0].addEventListener('load',() =>  setSkeletion(false));
                        clearInterval(skeleton);
                    }
                }
            }, 1);
        }
    }, [props.format])

    useEffect(() => {
        if (props.embedSite != '') {
            const url = props.embedSite.data.url;
            const website = url.match(/https:\/\/www.(.*?)\./) || url.match(/https:\/\/(.*?)\./);
            setSocialMedia(website[1]);
        }
    }, [props.embedSite]);

    return (
        <Container ref={useref} className={embedStyles.container}>
            {socialMedia === "twitter" && <TwitterEmbed className={embedStyles.twitter} url={props.embedSite.data.url} />}
            {socialMedia === "youtube" && <YouTubeEmbed className={embedStyles.youtube} url={props.embedSite.data.url} width={'100%'} />}
            {socialMedia === "facebook" && <Box className={embedStyles.facebookContainer}>
                {skeleton && <Skeleton className={embedStyles.facebookSkeleton} variant="rectangular" />}
                <FacebookEmbed url={props.embedSite.data.url} width={'100%'} />
            </Box>}
            {socialMedia === "instagram" && <InstagramEmbed url={props.embedSite.data.url} width={'100%'} />}
        </Container>
    )
}

export default EmbedIframe