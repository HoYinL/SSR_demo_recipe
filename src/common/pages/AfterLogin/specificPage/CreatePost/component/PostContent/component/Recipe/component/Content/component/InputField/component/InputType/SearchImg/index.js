import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultCaption } from "../../../../../../../../../../../../../../../store/defaultcaptionreducer";
import { Box, TextField } from "@mui/material";
import { search_Photo } from "../../../../../../../../../../../../../../../../server/axios/api1";
import DisplayImgBlock from "./component/displayImg";
import { SearchImgStyles } from "./style";

const SearchImg = (props) => {
    const searchImgStyles = SearchImgStyles();

    const dispatch = useDispatch();
    const defaultCaption = useSelector(state => state.defaultCaption.defaultCaption);

    const [ searchItem, setSearchItem ] = useState('');
    const [ displayImg, setDisplayImg ] = useState(false);
    const [ selectedImg, setSelectedImg ] = useState(null);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ totalImages, setTotalImages ] = useState(0);

    useEffect(() => {
        if(selectedImg != null){
            dispatch(setDefaultCaption(
                `&#128247 by <span style="font-weight: bold">${selectedImg.user.name}</span> on <a style="color: grey" href="${selectedImg.links.html}" target="_blank">Unplash</a>`
            ));
        }
    }, [selectedImg]);

    return (<>
        {
            displayImg == false && <TextField
                className={searchImgStyles.root} 
                placeholder="Type keyword of searcing target and Press Enter"
                onChange={(e) => setSearchItem(e.target.value)}
                onKeyPress={(e) => {
                    if(e.key == "Enter"){
                        e.preventDefault();
                        search_Photo(searchItem, 1).then((res) => {
                            setDisplayImg(res.results);
                            setTotalPages(res.total_pages);
                            setTotalImages(res.total);
                        });
                    }
                }}
            />
        }
        {
            displayImg != false && <DisplayImgBlock
                setDisplayImg={setDisplayImg} 
                displayImg={displayImg} 
                totalPages={totalPages}
                totalImages={totalImages}
                setModifierType={props.setModifierType}
                setNewFieldContent={props.setNewFieldContent}
                setType={props.setType}
                setSelectedImg={setSelectedImg}
                searchItem={searchItem}
            />
        }
    </>)
};

export default SearchImg;