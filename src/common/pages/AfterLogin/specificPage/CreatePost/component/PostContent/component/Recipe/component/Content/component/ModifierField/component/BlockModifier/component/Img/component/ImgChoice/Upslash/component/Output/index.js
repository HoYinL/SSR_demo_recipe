import React, { useState, useEffect } from "react";
import { List, Box, Typography } from "@mui/material";
import { SearchImgStyles } from './style';
import { search_Photo } from "../../../../../../../../../../../../../../../../../../../../../../server/axios/api1";
import { compareHeight } from "../../function";

const UpslashImgOutput = (props) => {
    const searchImgStyles = SearchImgStyles();

    const [ graspImgIndex, setGraspImgIndex ] = useState(1);
    const [ sortArray, setSortArray ] = useState(null);

    useEffect(() => {
        props.setDisplayLine(false);
    }, []);

    useEffect(() => {
        if(props.displayImg != null){
            const clone_array = [...props.displayImg.results];
            const sort_array = clone_array.sort(compareHeight);
            setSortArray(sort_array);
        }
    }, [props.displayImg]);

    useEffect(() => {
        if(graspImgIndex > 1 && graspImgIndex <= props.totalPages){
            graspImgIndex >= 1 && graspImgIndex <= props.totalPages &&
                search_Photo(props.searchItem, graspImgIndex).then((res) => {
                    props.setDisplayUpslashImg(res);
                })
        }
    }, [graspImgIndex]);

    return(<>{
            <Box sx={{minWidth: '100%', maxWidth: '900px', margin: 'auto', userSelect: 'none', padding: '0 1rem'}}>
                <Box sx={{minWidth: '100%', borderBottom: '1px solid grey', display: 'flex', justifyContent: 'space-between'}}>
                    {
                        <Typography
                                sx={graspImgIndex > 1? {display: 'block', cursor: 'pointer', color: 'grey !important'}: {display: 'block', cursor: 'pointer', opacity: '0'}}
                                onPointerDown={() => setGraspImgIndex(index => --index)}
                            >
                                Previous
                        </Typography>
                    }

                    {
                        <Typography sx={{color: 'grey !important'}}>{props.totalImages} results</Typography>
                    }

                    { 
                        <Typography
                            sx={graspImgIndex < props.totalPages? {display: 'block', cursor: 'pointer', color: 'grey !important'}: {display: 'block', cursor: 'pointer', opacity: '0'}}
                            onPointerDown={() => setGraspImgIndex(index => ++index)}
                        >
                            Next
                        </Typography>
                    }
                </Box>

                <List
                    sx={{minWidth: '100%', minHeight: '100px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
                >
                    {
                        sortArray != null && sortArray.map((displayImg) =>
                            sortArray.indexOf(displayImg) < 9 && <Box 
                                key={displayImg.urls.full}
                                onPointerUp={(e) => {
                                    props.setDisplayUpslash(false);
                                    props.setSelectedImg(displayImg.urls.small);
                                    props.setDisplayLine(true);
                                    const caption = `&#128247; Photo by <a target="_blank" href="${displayImg.user.links.self}">${displayImg.user.name}</a> on <a target="_blank" href="${displayImg.user.links.self}">Upslash</a>`;
                                    props.setDefaultCaption(caption);

                                    setTimeout(() => {
                                        props.setIsUpslash(false);
                                    }, 1000);
                                }}

                                sx={{
                                    margin: '5px 2.5px',
                                    maxWidth: '250px', 
                                    maxHeight: '350px',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    "&:hover":{
                                        "&::before":{
                                            display: 'flex'
                                        },
                                    },
                                    "&::before":{
                                        content: `"${displayImg.user.name}"`,
                                        display: 'none',
                                        alignItems: 'end',
                                        fontSize: '.85rem',
                                        color: 'rgba(255,255,255,.85)',
                                        boxSizing: 'border-box',
                                        textIndent: '.5rem',
                                        lineHeight: '1.25rem',
                                        fontFamily: 'arial',
                                        backgroundColor: '#3d3d3da3',
                                        width: '100%',
                                        height: '100%',
                                        border: '2px solid orange',
                                        boxSizing: 'border-box',
                                        position: 'absolute',
                                        top: '0',
                                        left: '0'
                                    }
                                }} 
                            >
                                <Box
                                    component='img'
                                    onError={e => {
                                        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/800px-No-Image-Placeholder.svg.png';
                                        e.target.parentElement.classList.add(searchImgStyles.avoidClicks);
                                    }}
                                    sx={{
                                        width: '100%', 
                                        height: '100%',
                                    }}
                                    key={displayImg.urls.raw} 
                                    src={displayImg.urls.small}
                                />
                            </Box>
                        )
                    }
                </List>
            </Box>
        }</>
    )
};

export default UpslashImgOutput