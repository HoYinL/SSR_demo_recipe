import React, {useState, useEffect} from "react";
import { Link } from "@mui/icons-material";
import LinkSetter from "./component/LinkSetter";

const LinkModifier = (props) => {
    const [ linkField, setLinkField ] = useState(false);

    useEffect(() => {
        if(linkField === true){
            props.setContent(
                <LinkSetter 
                    setContent={props.setContent}
                    setDisplayModifier={props.setDisplayModifier}
                    selectedRange={props.selectedRange}
                />
            )
        }
    }, [linkField]);

    return(<>
        <Link 
            onPointerDown={(e) => {
                setLinkField(true)
            }}
            sx={{borderLeft: '1px solid white', padding: '0 0 0 1rem', boxSizing: 'content-box'}}
        />
    </>)
}

export default LinkModifier