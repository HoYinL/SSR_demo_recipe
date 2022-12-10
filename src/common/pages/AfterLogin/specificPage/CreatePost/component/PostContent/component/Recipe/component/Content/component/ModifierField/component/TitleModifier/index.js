import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlogContent } from "../../../../../../../../../../../../../../store/blogcontentreducer";
import TextStyleModifier from "../StyleModifier/TextStyleModifier";
import { getTextElement } from "../../function";

const TitleModifierComponent = (props) => {

    const [title, setTitle] = useState('');
    const [type, setType] = useState('h1');

    const save = useSelector(state => state.save.save);

    const dispatch = useDispatch();

    const titleRef = useRef(null);

    useEffect(() => {
        if (save === true && titleRef.current.childNodes[0].innerHTML != '') {
            dispatch(addBlogContent(titleRef.current.childNodes[0].outerHTML));
        }
    }, [save]);

    useEffect(() => {
        if(props.saveContent != undefined){
            setTitle(getTextElement(props.saveContent).children);
        }
    }, [props.saveContent])

    return (
        <TextStyleModifier
            text={title}
            textRef={titleRef}
            type={type}
            setType={setType}
        />
    )
}

export default TitleModifierComponent