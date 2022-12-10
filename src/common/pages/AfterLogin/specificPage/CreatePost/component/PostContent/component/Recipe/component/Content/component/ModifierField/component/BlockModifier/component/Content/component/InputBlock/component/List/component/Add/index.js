import React, {useState, useRef, useEffect} from "react";
import { Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ListStyles } from "../../style";
import { useSelector } from "react-redux";

const AddComponent = (props) => {
    const listStyles = ListStyles();

    const [display, setDisplay] = useState(false);

    const save = useSelector(state => state.save.save);

    const add = useRef(null);

    useEffect(() => {
        add.current.parentNode.addEventListener('pointerenter', () => {
            setDisplay(true);
        });
        add.current.parentNode.addEventListener('pointerleave', () => {
            setDisplay(false);
        })
    }, []);

    return (
        <>
            {
                save === false && <Box ref={add}>
                    {
                        display && <Add
                            className={listStyles.add}
                            onPointerUp={(e) => {
                                props.setAddEle(add.current.parentNode)
                            }}
                        />
                    }
                </Box>
            }
        </>
    )
};

export default AddComponent