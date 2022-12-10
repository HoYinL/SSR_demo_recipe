import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { ListStyles } from "../../style";
import { useSelector } from "react-redux";

const DeleteComponent = (props) => {
    const listStyles = ListStyles();

    const [display, setDisplay] = useState(false);

    const save = useSelector(state => state.save.save);

    const clear = useRef(null);

    useEffect(() => {
        clear.current.parentNode.addEventListener('pointerenter', () => {
            setDisplay(true);
        });
        clear.current.parentNode.addEventListener('pointerleave', () => {
            setDisplay(false);
        })
    }, []);


    return (
        <>
            {
                save === false && <Box ref={clear}>
                    {
                        display && <Clear
                            className={`${listStyles.add} ${listStyles.absolute}`}
                            onPointerUp={(e) => {
                                props.setDeleteEle(clear.current.parentNode)
                            }}
                        />
                    }
                </Box>
            }
        </>
    )
};

export default DeleteComponent