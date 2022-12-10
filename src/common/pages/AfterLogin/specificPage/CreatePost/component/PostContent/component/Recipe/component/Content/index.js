import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import Modifier from "./component/ModifierField";
import { clearBlogContent } from "../../../../../../../../../../store/blogcontentreducer";
import { InsertTypeIconStyles, InsertIconStyle } from "./component/ModifierField/component/BlockModifier/component/style";
import { deletePublishedBlogContent } from "../../../../../../../../../../../server/axios/EditPublishedPost";
import { useSelector } from "react-redux";
import { DocumentOverflow } from "../../../../../../../../../CommonComponent/Appbar/style";

const ContentComponent = (props) => {
    const documentOverflow = DocumentOverflow();

    const dispatch = useDispatch();

    const contentContainer = useRef(null);

    const user = useSelector(state => state.token.token_payload);
    
    const insertTypeIconStyle = InsertTypeIconStyles();
    const insertIconStyle = InsertIconStyle();

    const [ ModifierType, setModifierType ] = useState('title');
    const [ newFieldContent, setNewFieldContent ] = useState(null);
    const [ modifierList, setModifierList ] = useState([]);
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        if(ModifierType != ''){
            setTimeout(() => setModifierType(''), 0);
        }
    }, [ModifierType]);

    return(
        <Box sx={{position: 'revert'}}>
            <Box 
                title="reset content"
                className={`fa fa-trash ${insertTypeIconStyle.cross} ${insertIconStyle.root}`}
                style={{width: '3rem', margin: '0 1rem 0 auto', zIndex: '10', top: '1rem', right: '1rem'}}
                onPointerUp={(e) => {
                    setModifierList([]);
                    dispatch(clearBlogContent([]));
                    pathname.includes('CreatePost') && pathname != `/surfaceUI/${user.id}/CreatePost/` && deleteSavedContent(pathname);
                    pathname.includes('EditPublishedPost') &&  deletePublishedBlogContent(pathname);
                    setTimeout(() => setModifierType('title'), 150);
                }}
            />

            <Box id="content_container" ref={contentContainer} sx={{width: '100%', minHeight: '940px', padding: '1rem 2rem 5rem'}}>
                {
                    <Modifier 
                        type={ModifierType} 
                        setType={setModifierType}
                        setModifierType={setModifierType}
                        newFieldContent={newFieldContent} 
                        modifierList={modifierList}
                        setModifierList={setModifierList}
                        autoSavedContent={props.autoSavedContent}
                        setNewFieldContent={setNewFieldContent}
                    />
                }
            </Box>
        </Box>
    )
}

export default ContentComponent