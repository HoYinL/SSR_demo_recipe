import React, { useRef, useEffect } from "react";
import InsertContentIcon from "../component/Content";
import { Box } from "@mui/material";
import {
    InputTextStyles,
    ListStylesObj,
    ulStylesObj,
    TextStylesObj,
    QuotesStylesObj
} from "./style";
import { PlainInputTextStyles } from "../component/Content/component/InputBlock/style";
import { getPropertyStyleValue } from "../../../../../../../../../../../../../commonComponent/function";
import parse from 'html-react-parser';
import { useDispatch, useSelector } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
import { addBlogContent } from "../../../../../../../../../../../../../../../store/blogcontentreducer";

const PlainBlockModifier = (props) => {
    const textContent = useRef(null);

    const inputTextStyles = InputTextStyles();
    const plainInputTextStyles = PlainInputTextStyles();

    const save = useSelector(state => state.save.save);

    const dispatch = useDispatch();

    useEffect(() => {
        if (save === true) {
            dispatch(addBlogContent(renderToStaticMarkup(
                <Box
                    type="plainBlock"
                    style={{
                        width: `${getPropertyStyleValue(textContent.current, 'width')}px`,
                        maxWidth: '100%',
                        margin: '1rem 0'
                    }}
                >
                    {parse(textContent.current.childNodes[0].outerHTML)}
                </Box>
            )))
        }
    }, [save]);

    return (
        <Box>
            <InsertContentIcon
                className={inputTextStyles.root}
                ListStylesObj={ListStylesObj}
                ulStylesObj={ulStylesObj}
                TextStylesObj={TextStylesObj}
                QuotesStylesObj={QuotesStylesObj}
                InputTextStyles={plainInputTextStyles}
                textContent={textContent}
                saveTextContent={props.saveContent?.props.children}
            />
        </Box>

    )
}

export default PlainBlockModifier