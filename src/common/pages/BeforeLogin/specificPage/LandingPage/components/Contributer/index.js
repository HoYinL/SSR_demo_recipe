import React, { useEffect, useState, useRef } from "react";
import { Box, Card, Typography } from "@mui/material";
import { ContributerStyle } from "./style";
import { revealContributers, revealTitle, size, chunk, isChildElement } from "./function";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { getContributer } from "../../../../../../../server/axios/api1";
import { detect } from 'detect-browser'

const ContributerComponent = (props) => {
    const browser = detect();

    const contributerStyle = ContributerStyle();

    const [ browserName, setBrowserName ] = useState(null);
    // states for handling contributers data (initialization + restructure during resizing)
    const [ contributers, setContributers ] = useState(null);
    const [ listGridColumn, setListGridColumn ] = useState(null);
    const [ contributerList, setContributerList ] = useState(null);
    const [ firstList, setFirstList ] = useState(null);
    const [ restList, setRestList ] = useState(null);
    // states for handling scroll reveal event 
    const [ contributerListIndex, setContributerListIndex ] = useState(0);
    const [ revealed_state, setRevealedState ] = useState({});
    // case 1: click left/right arrow
    const [ scrollDirection, setScrollDirection ] = useState(null);
    // case 2: touch/pointermove left/right
    const [ touchScroll, setTouchScroll ] = useState(null);
    const [ touchDirection, setTouchDirection ] = useState(null);
    // case 3: resizing window
    const [ windowSize, setWindowSize ] = useState(null);
    const [ fixedContributerID, setFixedContributerID] = useState(null)
    //others
    const [ clicked_state, setClickedState ] = useState(null);
    const [ display, setDisplay ] = useState(true)

    const [ touchTime, setTouchTime ] = useState(0);
    const [ scrollY, setScrollY ] = useState(false);
    const [ startingPoint, setStartingPoint ] = useState(null);
    
    const userref = useRef(false); 
    const contributer_list_container = useRef(null);
    const contributer_firstList = useRef(null);
    const scrollTime = useRef(0);

    /* initial setup */
    useEffect(() => {
        // access data of contributers' info
        getContributer().then(res => setContributers(res));
        setBrowserName(browser.name);

        contributer_list_container.current.addEventListener('touchmove', (e) => {e.preventDefault();});
    }, []);


    /* 
        1. divide contributers to several array list  
        2. render array element as contributer lists of constructor_container

        cases of occuring restructing event:
            1. initial render of component
            2. resize window.innerWidth 
    */
    useEffect(() => {
        if(userref.current == false) userref.current = true
        else if(contributers != null){
            // determine which contributer box is revealed
            const reveal_state = {};
            const clicked_state = {};
            contributers.map((ele) => { reveal_state[ele._id] = false });
            contributers.map((ele) => { clicked_state[ele._id] = false });
            setRevealedState(reveal_state)
            setClickedState(clicked_state)

            // case 1
            size(setListGridColumn);

            // case 2
            window.addEventListener('resize', () => { 
                size(setListGridColumn); 
                setWindowSize(window.innerWidth) 
            })

            setTimeout(() => 
                contributer_list_container.current.addEventListener('pointerdown', (e) => {
                    contributers.map((contributer) => {
                        const contributer_lists = contributer_list_container.current.children;
                    
                        if(!isChildElement(e.target, document.getElementById(contributer._id)) && clicked_state[contributer._id] === true){
                            document.getElementById(contributer._id).classList.replace(contributerStyle.zoomScale, contributerStyle.scale);
                            clicked_state[contributer._id] = false;
                            setFixedContributerID(contributer_lists[contributerListIndex].children[0].id)
                        }
                    })
                })
            , 1000)
        }
    }, [contributers])
    /* initial setup */

    useEffect(() => {
        if(userref.current == false) userref.current = true
        else if (listGridColumn != null){
            // divide the content of the contributers[] to corresponding no. of chunk
            const contributer = [...contributers];
            setContributerList(chunk(contributer, listGridColumn));
        }
    }, [listGridColumn]);

    // splice out the 1.initial display block and 2.scrolled n displayed block
    useEffect(() => {
        if(userref.current == false) userref.current = true
        else if(contributerList != null){
            setFirstList(...contributerList.slice(0, 1));
            setRestList([...contributerList.slice(1, contributerList.length)]);
        }
    }, [contributerList]);

    // add scrollReveal.js effect to initial dislay block
    useEffect(() => {
        if(userref.current == false) userref.current = true
        else if(firstList != null && restList != null && scrollTime.current == 0 && props.revealInfo == true){
            firstList.map((ele) => { revealed_state[ele._id] = true });
            revealTitle();
            revealContributers();
            setTimeout(() => setDisplay(false), 10);
            setTimeout(() => props.setRevealContributer(true))
            scrollTime.current = 1;
        }
    }, [firstList, restList, props.revealInfo]);

    /* scroll contributer_container event */
    // once listIndex is modified > trigger scroll contributer_container event
    useEffect(() => {
        if(userref.current == false) userref.current = true
        else if(restList != null){
            contributerListIndex < 0 && setContributerListIndex(0);
            contributerListIndex > restList.length && setContributerListIndex(restList.length);
        }
    }, [contributerListIndex, restList]);

    useEffect(() => {
        if(userref.current == false) userref.current = true
        else if(touchDirection != null){ 
            switch(touchDirection){
                case 'right':
                    setScrollDirection('right');
                    setContributerListIndex(value => value + 1);
                    break;
                case 'left':
                    setScrollDirection('left');
                    setContributerListIndex(value => value - 1);
                    break;
            }

            setTimeout(() => setTouchDirection(null), 500)
        }
    }, [touchDirection])

    // case 3: fixed the origin of specific contributer box while resizing window 
    useEffect(() => {
        if(windowSize != null && firstList != null && restList != null){
            //unexpected case of scrollReveal 
            if(contributer_firstList.current.children[0].style.opacity == '0'){
                restList[0].map((ele) => revealed_state[ele._id] = false)
            }
            firstList.map((ele) => {revealed_state[ele._id] == false && revealContributers()})

            const scrollContributerContainer = () => {
                contributerList.map((contributer_list) => {
                    contributer_list.map((contributer) => {
                        contributer._id == fixedContributerID && 
                        setTimeout(() => {
                            const index = contributerList.indexOf(contributer_list);
                            
                            setContributerListIndex(index);
                            contributer_list_container.current.scrollTo(
                                contributer_list_container.current.children[index].offsetLeft, 0);
                        }, 0)
                    })
                })
            }
            // detect browser guarantee able to get the element
            switch(browserName){
                case 'chrome':
                    setTimeout(() => scrollContributerContainer() , 0);
                    break;
                default:
                    scrollContributerContainer();
                    break;
            }           
        }
    }, [windowSize, firstList, restList])

    // effect when a list reveal the first time 
    // for case 1, 2, 3
    useEffect(() => {
        if(userref.current == false) userref.current = true
        else if(contributerListIndex != null && contributerListIndex > 0 && contributerListIndex < contributerList.length){
            const contributer_boxes = contributer_list_container.current.children[contributerListIndex].children;
            
            for(let index = 0; index < contributer_boxes.length; index++){
                const contributer = contributer_boxes[index];
                if(revealed_state[contributer.id] == false){
                    contributer.classList.replace(contributerStyle.showProperty, contributerStyle.hideProperty);
                        
                    setTimeout(() => {
                        contributer.style.transition = 'opacity .5s, bottom .5s, transform .25s';
                        contributer.classList.replace(contributerStyle.hideProperty, contributerStyle.showProperty);
                        revealed_state[contributer.id] = true;
                    }, (index + 1) * 250)
                }
            }
        }
    }, [contributerListIndex]);

    // scroll n px 
    // for case 1, 2
    useEffect(() => {
        if(scrollDirection != null && contributerListIndex >= 0 && contributerListIndex < contributerList.length){
            const contributer_lists = contributer_list_container.current.children;

            setTimeout(() => {
                const target = contributer_lists[contributerListIndex];
                contributer_list_container.current.scrollTo({
                    left: target.offsetLeft,
                    behavior: 'smooth'
                });
                setScrollDirection(null);
                setFixedContributerID(target.children[0].id);
            }, 150)
        }
    }, [scrollDirection]);


    /* fixed the position of clicked box */
    useEffect(() => {
        if(userref.current == false) userref.current = true
        else if(fixedContributerID != null){
            contributers.map((contributer) => {
                if(clicked_state[contributer._id] == true && contributer._id != fixedContributerID){ 
                    document.getElementById(contributer._id).classList.replace(contributerStyle.zoomScale, contributerStyle.scale);
                    clicked_state[contributer._id] = false;
                }
            })
        }
    }, [fixedContributerID]);

    useEffect(() => {
        console.log(contributers);
    }, [contributers])

    return(
        <Box className={contributerStyle.root} id="contributer_root">
            {display && <Box className={contributerStyle.cover}/>}
            <Typography className={contributerStyle.title} id="contributer_block_title">Our Top Contributers</Typography>
            <br />
            <Typography className={contributerStyle.subtitle} id="contributer_block_subtitle">
                These are people contribute the most on sharing numerous popular masterpieces on our platform
            </Typography>
            <Box className={contributerStyle.conatiner}>
                <FontAwesomeIcon 
                    onPointerUp={()=> {
                        setScrollDirection('left');
                        setContributerListIndex(value => value - 1);
                        setFixedContributerID(null)
                    }} 
                    className={contributerStyle.leftArrow} icon={faCircleChevronLeft} 
                />

                <Box
                    ref={contributer_list_container} 
                    id="contributer_list_container" 
                    className={contributerStyle.contributer_list_container}
                    onPointerDown={(e) => {
                        setTouchScroll([e.clientX, e.clientY]);
                        setStartingPoint(e.clientX);
                    }}
                    onPointerUp={(e) => {
                        setTouchScroll(null);

                        const PointerUpTime = Date.now();

                        if(scrollY){
                            if((PointerUpTime - touchTime) < 50){
                                const scrollDistance = (e.clientY - touchScroll[1]) * -20;
                                const scrollLength = Math.ceil(scrollDistance/200);

                                let remain = Math.abs(scrollDistance);

                                const scroll = setInterval(() => {
                                    window.scrollBy(0, scrollLength)
                                    remain -= scrollLength;

                                    if(remain < 0) clearInterval(scroll)
                                    else window.addEventListener('pointerdown', (e) => clearInterval(scroll), {once: true})
                                }, 0)
                            }
                        } else {
                            if(e.clientX - startingPoint > 0){
                                setScrollDirection('left');
                                setContributerListIndex(value => value - 1);
                                setFixedContributerID(null)
                            } else {
                                setScrollDirection('right');
                                setContributerListIndex(value => value + 1);
                                setFixedContributerID(null) 
                            }
                        }
                    }}
                    onTouchMove={(e) => {
                        const touchMoveTime = Date.now();
                        setTouchTime(touchMoveTime);
    
                        const scrolledLengthY = Math.floor(e.touches[0].clientY - touchScroll[1]);
    
                        const scrollX = Math.abs(e.touches[0].clientX - touchScroll[0]);
                        const scrollY = Math.abs(e.touches[0].clientY - touchScroll[1]);
    
                        if(scrollY > scrollX) {
                            setScrollY(true);
                            window.scrollBy(0, -scrolledLengthY);
                        } else {
                            setScrollY(false);
                        }
                        // manually touchmove n scroll up/down
    
                        setTouchScroll([e.touches[0].clientX, e.touches[0].clientY])
                    }}
                >
                    {<Box className={contributerStyle.info} ref={contributer_firstList} id="contributer_firstList">
                        {firstList && firstList.map((ele) => 
                            <Box 
                                className={`${contributerStyle.showProperty} ${contributerStyle.scale}`}
                                id={`${ele._id}`} 
                                sx={{height: '22rem', position: 'relative', transition: 'bottom 0s, opacity 0s'}}
                                key={ele._id}
                                onClick={() => {
                                    setFixedContributerID(`${ele._id}`);
                                    document.getElementById(ele._id).classList.add(contributerStyle.zoomScale);
                                    clicked_state[`${ele._id}`] = true;
                                }}
                                onPointerOver={() => {
                                    document.getElementById(ele._id).classList.add(contributerStyle.scale)
                                    document.getElementById(ele._id).style.transition = 'transform .25s';
                                    document.getElementById(ele._id).classList.replace(contributerStyle.scale, contributerStyle.zoomScale);
                                }}
                                onPointerLeave={() => 
                                    clicked_state[`${ele._id}`] == false && 
                                        document.getElementById(ele._id).classList.replace(contributerStyle.zoomScale, contributerStyle.scale)
                                }
                            >
                            <Box 
                                sx={{backgroundImage: `url(${firstList[firstList.indexOf(ele)].backgroundImage})`}}
                                className={contributerStyle.box}
                                onMouseOver={(e) => e.target.style.transitionDelay = '0s'}
                            >
                            <Card className={contributerStyle.card}>
                                <Typography sx={{fontWeight: 'bold'}}>{`${firstList[firstList.indexOf(ele)].name}`}</Typography>
                                <Typography>{`${firstList[firstList.indexOf(ele)].follower} followers`}</Typography>
                            </Card>
                            </Box>
                        </Box>
                        )}
                    </Box>}

                    { restList && restList.map((ele) => 
                        <Box key={`list${restList.indexOf(ele)}`} className={contributerStyle.info}>
                        { restList[restList.indexOf(ele)].map((element) => 
                            <Box 
                                key={`listEle${restList[restList.indexOf(ele)].indexOf(element)}`}
                                className={`${contributerStyle.showProperty} ${contributerStyle.scale}`}
                                id={`${element._id}`} 
                                sx={{height: '22rem', position: 'relative', transition: 'bottom 0s, opacity 0s'}}
                                onClick={() => {
                                    setFixedContributerID(`${element._id}`)
                                    document.getElementById(`${element._id}`).classList.add(contributerStyle.zoomScale);
                                    clicked_state[`${element._id}`] = true
                                }}
                                onPointerOver={() => {
                                    document.getElementById(`${element._id}`).style.transition = 'opacity 0s, bottom 0s, transform .25s';
                                    document.getElementById(`${element._id}`).classList.replace(contributerStyle.scale, contributerStyle.zoomScale)
                                }}
                                onPointerLeave={() => 
                                    clicked_state[`${element._id}`] == false && 
                                        document.getElementById(`${element._id}`).classList.replace(contributerStyle.zoomScale, contributerStyle.scale)
                                }
                            >
                            <Box 
                                sx={{backgroundImage: `url(${element.backgroundImage})`}}
                                className={`${contributerStyle.box}`}
                                onMouseOver={(e) => e.target.style.transitionDelay = '0s'}
                            >
                                <Card className={contributerStyle.card}>
                                    <Typography sx={{fontWeight: 'bold'}}>{`${element.name}`}</Typography>
                                    <Typography>{`${element.follower} followers`}</Typography>
                                </Card>
                            </Box>
                            </Box>
                        )}
                        </Box>
                    )}
                </Box>

                <FontAwesomeIcon 
                    onPointerUp={()=> {
                        setScrollDirection('right');
                        setContributerListIndex(value => value + 1);
                        setFixedContributerID(null)
                    }} 
                    className={contributerStyle.rightArrow} icon={faCircleChevronRight} />
            </Box>
        </Box>
    )
}

export default ContributerComponent