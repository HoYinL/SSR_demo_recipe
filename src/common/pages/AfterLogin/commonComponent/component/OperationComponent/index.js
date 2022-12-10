import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { KeyboardDoubleArrowRight, KeyboardDoubleArrowLeft } from "@mui/icons-material";
import PageList from "./component/PageList";
import UserInfo from "./component/UserInfo";
import UserState from "./component/UserState";
import { Main } from "./style";
import { showLeftColumn, scrollLeftColumn } from "../../function";

const OperationComponent = (props) => {
    const main = Main();

    const [ pointerMove, setPointerMove ] = useState(false);
    
    const userref = useRef(false);
    const ref = useRef();

    useEffect(() => {
        const closure_scrollFunc = (pointerMove) => { return () => scrollLeftColumn(pointerMove) };
        const closure_PointerMove = (setPointerMove) => { return () => setPointerMove(false) };

        if(userref.current == false){
            userref.current = true
        } else {
            const scrollRight = closure_scrollFunc(pointerMove);
            const PointerMove = closure_PointerMove(setPointerMove)

            if (ref.current && pointerMove != false && pointerMove != null) {
                ref.current.addEventListener("pointermove", scrollRight, { once: true });
                ref.current.addEventListener("touchmove", scrollRight, { once: true });
                document.addEventListener('pointerup', PointerMove, { once: true });
                document.addEventListener('touchend', PointerMove, { once: true });
            } 

            if (ref.current && pointerMove == false) {
                ref.current.removeEventListener("pointermove", scrollRight, { once: true });
                ref.current.removeEventListener("touchmove", scrollRight, { once: true });
                document.removeEventListener('pointerup', PointerMove , { once: true });
                document.removeEventListener('touchend', PointerMove , { once: true });

                document.getElementById('block')
                    .classList.replace(main.arrowBlockCoverDisplayNone, main.arrowBlockCoverDisplay)
                setTimeout(() => {setPointerMove(null)}, 50)
            }

            if(ref.current && pointerMove == null){
                showLeftColumn();
                setTimeout(() => {
                    document.getElementById('block')
                        .classList.replace(main.arrowBlockCoverDisplay, main.arrowBlockCoverDisplayNone)
                    props.setLeftArrowDirection('left');
                }, 250);

                props.setScroll(true)
            }
        }
      }, [pointerMove]);

    return (
        <Box id="FuncBlock" className={main.block}>
            <Box id="FuncBar" className={main.root}>
                <UserInfo />
                <PageList 
                    leftArrowDirection={props.leftArrowDirection} 
                    setLeftArrowDirection={props.setLeftArrowDirection}
                    setRightArrowDirection={props.setRightArrowDirection}
                />
                <UserState />
            </Box>

            <Box 
                id="showLeftColumn" 
                className={main.arrowBlock}
                onPointerUp={() => {
                    props.leftArrowDirection == 'right' && setPointerMove(false);
                    props.leftArrowDirection == 'left' && props.hideFuncBar();
                }}
                onPointerDown={(e) => {
                    props.leftArrowDirection == 'right' && setPointerMove(e.clientX);
                    if(props.leftArrowDirection == 'left'){
                        document.addEventListener('pointermove', props.hideFuncBar, {once: true})
                        document.addEventListener('touchmove', props.hideFuncBar, {once: true})
                    }
                }}
            >
                <Box 
                    id="block" 
                    className={`${main.arrowBlockCover} ${main.arrowBlockCoverDisplayNone}`}
                />
                {props.leftArrowDirection == 'right' && 
                    <KeyboardDoubleArrowRight
                        id="leftArrowRight"
                        ref={ref} 
                    />}
                {props.leftArrowDirection == 'left' && 
                    <KeyboardDoubleArrowLeft 
                        id="leftArrowLeft"
                    />}
            </Box>
        </Box>
    )
}

export default OperationComponent