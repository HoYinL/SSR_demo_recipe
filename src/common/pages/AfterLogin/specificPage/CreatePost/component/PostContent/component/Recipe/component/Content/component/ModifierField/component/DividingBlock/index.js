import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Brightness1 } from "@mui/icons-material";
import { renderToStaticMarkup } from "react-dom/server"
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { addBlogContent } from "../../../../../../../../../../../../../../store/blogcontentreducer";

const DividingBlock = (props) => {
    const autoSaveBlock = useRef(null);

    const save = useSelector(state => state.save.save);

    const dispatch = useDispatch();

    useEffect(() => {
        if (save === true) {
            dispatch(addBlogContent(renderToStaticMarkup(
                <Box type="dividingBlock" key={uuid()} style={{ height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey !important' }}>
                    <Brightness1 style={{ width: '2rem', fontSize: '.5rem' }} />
                    <Brightness1 style={{ width: '2rem', fontSize: '.5rem' }} />
                    <Brightness1 style={{ width: '2rem', fontSize: '.5rem' }} />
                </Box>
            )
            ))
        }
    }, [save]);

    return (
        <Box key={Date.now()} style={{ height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey !important' }}>
            <Brightness1 style={{ width: '2rem', fontSize: '.5rem' }} />
            <Brightness1 style={{ width: '2rem', fontSize: '.5rem' }} />
            <Brightness1 style={{ width: '2rem', fontSize: '.5rem' }} />
        </Box>
    )
}

export default DividingBlock