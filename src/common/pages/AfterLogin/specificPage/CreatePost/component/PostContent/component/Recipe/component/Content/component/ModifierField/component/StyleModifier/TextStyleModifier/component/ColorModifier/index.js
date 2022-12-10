import React, {useState, useEffect} from "react";
import { ColorLens } from "@mui/icons-material";
import Picker from "./component/Picker";

const ColorModifier = (props) => {
    const [ displayColorModifier, setDisplayColorModifier ] = useState(false);

    useEffect(() => {
        if(displayColorModifier === true){
            props.setContent(
                <Picker 
                    selectedRange={props.selectedRange}
                />
            )
            props.setTranslateY(-310 + props.line_height * props.selectedLine - props.line_height)
        }
    }, [displayColorModifier]);

    return(<>
        <ColorLens 
            onPointerDown={(e) => {
                setDisplayColorModifier(true);
            }}
        />
    </>)
}

export default ColorModifier
