import React, {useEffect, useState, useRef} from "react";
import Type from "../../../Type";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const AddDeleteComponent = (props) => {
    const [changed, setChanged] = useState(false);
    const [target, setTarget] = useState(null);

    const insertTarget = useRef(null);

    const save = useSelector(state => state.save.save);

    useEffect(() => {
        setTimeout(() => setTarget(insertTarget.current.parentNode))
    }, []);

    return(
        <Box ref={insertTarget}>
            {save === false && props.parent != "gridItem" && <Type
                setType={props.setType}
                setTransform={props.setTransform}
                target={target}
                setAddEle={props.setAddEle}
                setChanged={setChanged}
            />}
        </Box>
    )
};

export default AddDeleteComponent