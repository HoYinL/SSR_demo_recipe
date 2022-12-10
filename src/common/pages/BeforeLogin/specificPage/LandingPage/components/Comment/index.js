import React, { useEffect, useState, useRef } from "react";
import { Box, Card, Typography, Button, Avatar, CardHeader } from "@mui/material";
import { ArrowBackIosNew,  ArrowForwardIos, MoreHoriz, CancelOutlined } from '@mui/icons-material';
import { Comment } from "./style";
import { chunk } from "./function";
import { getComment } from "../../../../../../../server/axios/api1";
import { v4 as uuid } from "uuid";
import { DocumentOverflow } from "../../../../../CommonComponent/Appbar/style";

const CommentComponent = () => {
    const addToRefs = (el) => {
        if (el && !listOfCard.current.includes(el)) {
            listOfCard.current.push(el);
        } else {
            listOfCard.current.pop();
        }
    };

    const addCommentRefs = (el) => {
        if (el && !listOfComment.current.includes(el)) {
            listOfComment.current.push(el);
        } else {
            listOfComment.current.pop();
        }
    }

    const comment = Comment();
    const comment2 = Comment();
    const documentOverflow = DocumentOverflow();

    const [ commentList, setCommentList ] = useState(null);
    const [ commentInfoWidth, setCommentInfoWidth ] = useState(null);
    const [ displayList, setDistplayList ] = useState(null);
    const [ index, setIndex ] = useState(0);
    const [ displayState, setDisplayState ] = useState(null);
    const [ displayButton, setButtonCover ] = useState(true);
    const [ displayWholeComment, setDisplayWholeComment ] = useState(false);
    const [ commentIndex, setCommentIndex ] = useState(null);
    const [ no, setNo ] = useState(0);

    const comment_info = useRef(null);
    const comment_title = useRef(null);
    const comment_button = useRef(null);
    const comment_subtitle = useRef(null);
    const commentPage = useRef(null);
    const commentBlock = useRef(null);
    const left_button = useRef(null);
    const right_button = useRef(null);
    const listOfCard = useRef([]);
    const listOfComment = useRef([]);
    const userref = useRef(null);

    useEffect(() => {
        if(userref.current == null){
            userref.current = true;
        } else {
            if(displayWholeComment == true){
                document.body.classList.add(documentOverflow.hidden);
            } else {
                document.body.classList.add(documentOverflow.hidden);
                setTimeout(() =>{
                    displayList[index].map((comment) => {
                        const cardIndex = displayList[index].indexOf(comment);
    
                        if(listOfComment.current[cardIndex].clientHeight > listOfComment.current[cardIndex].parentElement.clientHeight){
                            listOfComment.current[cardIndex].getElementsByClassName(comment2.dots)[0].classList.replace(comment2.displayNone, comment2.displayBlock)
                        } 
                    })
                }, 0)
            }
        }
    }, [displayWholeComment]);

    useEffect(() => {
        getComment().then((res) => setCommentList(res));
        setCommentInfoWidth(comment_info.current.clientWidth);

        const resizeHandler = () => {
            setCommentInfoWidth(comment_info.current.clientWidth);
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, []);

    useEffect(() => {
        if(commentInfoWidth != null && commentList != null && no == 0){
            const comment_copy = [...commentList];
            const size = (Math.floor(commentInfoWidth/275) == 0? 1 : Math.floor(commentInfoWidth/275));
            setDistplayList(chunk(comment_copy, size));

            const display = {};
            
            commentList != null && commentList.map((comment) => {
                display[comment._id] = false
            })
            setDisplayState(display);
            setNo(1);
        }
    }, [commentInfoWidth, commentList]);

    useEffect(() => {
        if(displayList != null){
            if(index < 0) { setIndex(0) }
            else if (index >= displayList.length){ setIndex(index - 1)}
            else {
                displayList[index].map((comment) => {
                    if(displayState[comment._id] == false){
                        const cardIndex = displayList[index].indexOf(comment);
                    
                        listOfCard.current[cardIndex].classList.add(comment2.hide);
                        listOfCard.current[cardIndex].classList.remove(comment2.show);
                        
                    }
                });

                const watcher = new IntersectionObserver(onEnterView);

                watcher.observe(comment_info.current);
                
                function onEnterView(entries, observer) {
                    for (let entry of entries) {
                        if (entry.isIntersecting) {
                            displayList[index].map((comment) => {
                                const cardIndex = displayList[index].indexOf(comment);
                
                                if(listOfComment.current[cardIndex].clientHeight > listOfComment.current[cardIndex].parentElement.clientHeight){
                                    listOfComment.current[cardIndex].getElementsByClassName(comment2.dots)[0].classList.replace(comment2.displayNone, comment2.displayBlock)
                                } 

                                if(displayState[comment._id] == false){
                                    listOfCard.current[cardIndex].classList.add(comment2.hide);
                                    listOfCard.current[cardIndex].classList.remove(comment2.show);
                
                                    setTimeout(() => {
                                        listOfCard.current[cardIndex].classList.remove(comment2.hide);
                                        listOfCard.current[cardIndex].classList.add(comment2.show);
                                    }, (displayList[index].indexOf(comment) + 1) * 350);

                                    displayState[comment._id] = true;
                                }
                            })

                            observer.unobserve(comment_info.current)

                            setTimeout(() => {
                                setButtonCover(false);
                                left_button.current.style.opacity = '1';
                                right_button.current.style.opacity = '1';
                                left_button.current.style.left = '0';
                                right_button.current.style.right = '0';
                            }, displayList[0].length * 350);
                        }
                    }
                };
            }      
        }
    }, [index, displayList]);

    return (
        <Box className={comment.root}>
            <Typography className={comment.title} ref={comment_title}>
                What do they say about us
            </Typography>
            <br />
            <Typography className={`${comment.title} ${comment.subtitle}`} ref={comment_subtitle} id="comment_subtitle">
                Lots of comments about us, here's what they said
            </Typography>
            <Box className={comment.container}>
            <Box className={comment.info} ref={comment_info}>
                {
                    displayList && 
                    index >= 0 && 
                    index < displayList.length &&
                    displayList[index].map((comment_) => 
                        <Card key={uuid()} ref={addToRefs} className={comment.card}>
                            <CardHeader 
                                avatar={<Avatar src={comment_.img} alt="name"/>} 
                                subheader={comment_.name} 
                                className={comment.cardHeader} 
                            />
                            <Box sx={{height: '100%', overflowY: 'hidden', position: 'relative'}}>
                                <Box ref={addCommentRefs} className={comment.comment}>
                                    <Typography>
                                        {comment_.comment}  
                                    </Typography>
                                    { 
                                        <MoreHoriz 
                                            onPointerUp={() => {
                                                setDisplayWholeComment(true);
                                                setCommentIndex(displayList[index].indexOf(comment_))
                                            }}
                                            className={`${comment.dots} ${comment.displayNone}`}
                                        />
                                    }
                                </Box>
                            </Box>
                            {
                                displayWholeComment && 
                                <>
                                    <Box 
                                        ref={commentPage}
                                        className={comment.commentBlock} 
                                        onPointerDown={() => {setDisplayWholeComment(false);}}
                                    />
                                    <Card ref={commentBlock} className={comment.wholeCommentBlock}>
                                        <CancelOutlined 
                                            className={comment.cancelButton} 
                                            onPointerDown={() => setDisplayWholeComment(false)}
                                        />
                                        <CardHeader 
                                            avatar={<Avatar src={`${displayList[index][commentIndex].img}`} alt="name"/>} 
                                            subheader={`${displayList[index][commentIndex].name}`} 
                                            className={comment.cardHeader2} 
                                        />
                                        <Box className={comment.commentContent}>
                                            {displayList[index][commentIndex].comment}
                                        </Box>
                                    </Card>
                                </>
                            }
                        </Card>
                    )
                }
            </Box>
            </Box>
            <Box ref={comment_button} id="comment_button" sx={{position: 'relative'}}>
                {displayButton && <Box className={comment.buttonCover}/>}
                <Button 
                    ref={left_button}
                    onPointerUp={() => {
                        if(index == 0) return
                        setIndex(value => value - 1)
                    }} 
                    className={`${comment.button} ${comment.left}`}
                ><ArrowBackIosNew sx={{color: 'white', fontSize: '18px'}}/></Button>
                <Button 
                    ref={right_button}
                    onPointerUp={() => {
                        if(index >= displayList.length - 1) return
                        setIndex(value => value + 1);
                    }}
                    className={`${comment.button} ${comment.right}`}
                ><ArrowForwardIos sx={{color: 'white', fontSize: '18px'}}/></Button>
            </Box>
        </Box>
    )
}

export default CommentComponent