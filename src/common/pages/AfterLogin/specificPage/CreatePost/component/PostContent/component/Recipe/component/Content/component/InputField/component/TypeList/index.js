import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import InsertDeleteIcon from "./component/InsertDeleteIcon";
import InputTypeList from "./component/InputTypeList";
import { TypeListStyle } from "./style";

const TypeListComponent = (props) => {
    const typeListStyle = TypeListStyle();
    const [ displayToolList, setDisplayToolList ] = useState(false);
    const [ displayClear, setDisplayClear ] = useState(true);
    const [ transform, setTransform ] = useState(false);
    const [ displaySubtleType, setDisplaySubtleType ] = useState(false);

    return (
        <Box className={typeListStyle.root} title="add element">
            <Box className={typeListStyle.list}>
                <InsertDeleteIcon
                    dataIndex={props.dataIndex}
                    displayToolList={displayToolList}
                    setDisplayToolList={setDisplayToolList} 
                    setTransform={setTransform}
                    transform={transform}
                    setDisplaySubtleType={setDisplaySubtleType}
                />
                <InputTypeList
                    dataIndex={props.dataIndex}
                    setType={props.setType}
                    displayToolList={displayToolList}
                    setDisplayToolList={setDisplayToolList} 
                    setDisplayClear={setDisplayClear}
                    setTransform={setTransform}
                    setDisplaySubtleType={setDisplaySubtleType}
                    displaySubtleType={displaySubtleType}
                />
            </Box>
        </Box>
    )
}

export default TypeListComponent