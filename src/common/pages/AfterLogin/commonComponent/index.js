import React, { useEffect, useState, useRef } from "react";
import OperationComponent from "./component/OperationComponent";
import SocialInteractionComponent from "./component/SocialInteractionComponent";
import FooterComponent from "./component/Footer";
import { useDispatch } from "react-redux";
import { setPaddingBottom } from "../../../store/paddingb_reducer_afterLogin";
import { hideLeftColumn, hideRightColumn, pagesHideLeftRightColumns, isChildElement, getPropertyStyleValue, scrollLeftColumn } from "./function";
import { DocumentOverflow } from "../../CommonComponent/Appbar/style";

const LoginedCommonUIComponent = () => {
    const documentOverflow = DocumentOverflow();

    const dispatch = useDispatch();

    const ref = useRef(false);

    const [ paddingHeight, setPaddingHeight ] = useState('');
    const [ leftArrowDirection, setLeftArrowDirection ] = useState('right');
    const [ rightArrowDirection, setRightArrowDirection ] = useState('left');
    const [ scroll, setScroll ] = useState(null)

    /* function wrapper */
    const hideFuncBar = () => {
        hideLeftColumn();
        setTimeout(() => {setLeftArrowDirection('right')}, 250);
    }

    const hideFriendList = () => {
        hideRightColumn();
        setTimeout(() => {setRightArrowDirection('left')}, 250);
    }

    const hideBothColumns = () => {
        pagesHideLeftRightColumns();
        setTimeout(() => {
            setLeftArrowDirection('right');
            setRightArrowDirection('left')
        }, 250);
    }

    function closure_setRightArrowDirection(){
        const showLeftColumn = document.getElementById('showLeftColumn');
        const showRightColumn = document.getElementById('showRightColumn');
        const PageList = document.getElementById('PageList');
        const FuncBar = document.getElementById('FuncBar');
        const userState = document.getElementById('userState');
        const FriendList = document.getElementById('FriendList');
        const UserList = document.getElementById('UserList');

        return (e) => {
            // event handled by specific event Listener
            if(isChildElement(e.target, showLeftColumn) || isChildElement(e.target, showRightColumn)) return

            /* click left column */
            if(isChildElement(e.target, FuncBar)){
                if(!isChildElement(e.target, PageList) && !isChildElement(e.target, userState)){
                    hideFuncBar();
                    return
                }
                hideBothColumns();
                return
            }

            /* click right column */
            if(isChildElement(e.target, FriendList) && !isChildElement(e.target, UserList)){
                hideFriendList();
                return
            }

            /* click after scrolled */
            /* hide both columns */
            if(document.getElementById('rightArrowRight') && document.getElementById('leftArrowLeft')){
                hideBothColumns();
                return
            }
            /* hide one column*/
            if(document.getElementById('leftArrowLeft') && getPropertyStyleValue(showRightColumn, 'right') == '0px'){
                hideFuncBar();
                return
            }
            if(document.getElementById('rightArrowRight') && getPropertyStyleValue(showLeftColumn, 'left') == '0px'){
                hideFriendList();
                return
            }

            /* click and interrept scolling event */
            if(document.getElementById('leftArrowLeft') && document.getElementById('rightArrowLeft')){
                hideFriendList();
                return
            }
            if(document.getElementById('leftArrowRight') && document.getElementById('rightArrowRight')){
                hideFuncBar();
                return
            }

            hideBothColumns();
            return
        }
    }

    useEffect(() => {
        if(leftArrowDirection === 'left') setTimeout(() => document.body.classList.remove(documentOverflow.hidden), 500)
    }, [leftArrowDirection]);

    useEffect(() => {
        if(ref.current == false){
            ref.current = true
        } else {
            let setRightArrowDirection = closure_setRightArrowDirection();
            document.addEventListener('pointerup', setRightArrowDirection);
        }
    }, [scroll])

    useEffect(() => {
        if(typeof window != 'undefined'){
            let footerStyle = window.getComputedStyle(document.getElementById('footer'))

            setPaddingHeight(footerStyle.getPropertyValue('height'))
            
            window.addEventListener('load', () => {
                setPaddingHeight(footerStyle.getPropertyValue('height'))
            })

            window.addEventListener('resize', () => {
                setPaddingHeight(footerStyle.getPropertyValue('height'))
            })
        }
    }, [])

    useEffect(() => {
        if(ref.current != false){
            dispatch(setPaddingBottom(paddingHeight));
        }
    }, [paddingHeight])

    return (
        <>
            <OperationComponent 
                leftArrowDirection={leftArrowDirection} 
                setLeftArrowDirection={setLeftArrowDirection}
                setRightArrowDirection={setRightArrowDirection}
                hideFuncBar={hideFuncBar}
                hideFriendList={hideFriendList}
                hideBothColumns={hideBothColumns}
                setScroll={setScroll}
            />
            <SocialInteractionComponent 
                rightArrowDirection={rightArrowDirection}
                setLeftArrowDirection={setLeftArrowDirection}
                setRightArrowDirection={setRightArrowDirection}
                hideFuncBar={hideFuncBar}
                hideFriendList={hideFriendList}
                hideBothColumns={hideBothColumns}
                setScroll={setScroll}
            />
            <FooterComponent />
        </>
    )
}

export default LoginedCommonUIComponent