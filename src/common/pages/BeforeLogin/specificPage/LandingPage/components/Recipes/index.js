import React, { useEffect, useState, useRef } from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import { AccessAlarm, Star, StarBorder, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, } from '@mui/icons-material';
import { Recipes } from "./style";
import { getRecipes } from "../../../../../../../server/axios/api1";
import { isChildElement, scrollreveal, fun } from "./function";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { getPropertyStyleValue } from "../../../../../AfterLogin/specificPage/CreatePost/component/PostContent/component/Recipe/component/Content/component/ModifierField/component/BlockModifier/FlexModifier/function";

const RecipesComponent = (props) => {
    const recipes = Recipes();

    const navigate = useNavigate();

    const [savedRecipes, setSavedRecipes] = useState(null);
    const [containerWidth, setConatinerWidth] = useState(null);
    const [recipeWidth, setRecipeWidth] = useState(null);
    const [recipeLength, setRecipeLength] = useState(null);
    const [emptyBlockLength, setEmptyBlockLength] = useState(0);
    const [emptyBlockWidth, setEmptyBlockWidth] = useState(0);
    const [targetIndex, setTargetIndex] = useState(null);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [scroll, setScroll] = useState(null);
    const [startingPoint, setStartingPoint] = useState(null);
    const [containerElement, setContainerElement] = useState(null);
    const [isMobile, setIsMobile] = useState(null);
    const [size, setSize] = useState(null);
    const [targetID, setTargetID] = useState(null);
    const [latestTime, setLatestTime] = useState(null);
    const [scrollX, setScrollX] = useState(false);
    const [latestPoint, setLatestPoint] = useState(null);

    const recipe_list_container = useRef(null);
    const recipe_root = useRef(null);
    const arrowLeft = useRef(null);
    const arrowRight = useRef(null);
    const recipe_container = useRef(null);
    const userref = useRef(null);

    const detectTarget = () => {
        const scrollLeft = recipe_list_container.current.scrollLeft + recipe_list_container.current.clientWidth / 2;
        containerElement.map((element) => {
            if (
                Math.floor(scrollLeft) >= element.offsetLeft &&
                Math.floor(scrollLeft) <= element.offsetLeft + element.clientWidth
            ) {
                setTargetIndex(containerElement.indexOf(element));
                setTargetID(element.id)
            }
        })
    };

    const fun1 = fun();

    useEffect(() => {
        typeof window != "undefined" && setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
        recipe_list_container.current.addEventListener('touchmove', fun1);

        getRecipes().then((res) => {setSavedRecipes(res)});

        const container_width = getPropertyStyleValue(recipe_list_container.current, 'width');
        setConatinerWidth(container_width);

        const resizeHandler = () => {
            const container_width = getPropertyStyleValue(recipe_list_container.current, 'width');
            setConatinerWidth(container_width);
            setSize(window.innerWidth);
        };

        window.addEventListener('resize', resizeHandler);

        const watcher = new IntersectionObserver(onEnterView);

        watcher.observe(recipe_root.current);

        function onEnterView(entries, observer) {
            for (let entry of entries) {
                if (entry.isIntersecting) {
                    scrollreveal();
                    observer.unobserve(recipe_root.current);
                }
            }
        }

        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, []);

    useEffect(() => {
        if (size != null) {
            const container_width = getPropertyStyleValue(recipe_list_container.current, 'width')
            const recipe_length = Math.floor(container_width / 200) >= 8 ? 7 : Math.floor(container_width / 200);
            setRecipeWidth(Math.floor(container_width / recipe_length));
        }
    }, [size]);

    useEffect(() => {
        if (containerWidth != null) {
            const recipe_length = Math.floor(containerWidth / 200);
            if (recipe_length >= 8) {
                setRecipeLength(7);
                return
            }

            setRecipeWidth(Math.floor(Math.abs(containerWidth / recipeLength)))
            const display_recipe_length = ((recipe_length - 1) % 2) == 0 ? recipe_length - 2 : recipe_length - 1;
            setRecipeLength(display_recipe_length);
        }
    }, [containerWidth])

    useEffect(() => {
        if (recipeLength != null) {
            setEmptyBlockLength(Math.floor(Math.abs(recipeLength / 2)));
            setRecipeWidth(Math.floor(Math.abs(containerWidth / recipeLength)));
        }
    }, [recipeLength]);

    // style the positon of recipe list after initial rendering 
    // 1. scrollLeft > scrollWidth === empty recipe width*empty recipe no. 
    useEffect(() => {
        if (emptyBlockLength != 0 && recipeWidth != null && containerElement != null) {
            const empty_block_width = emptyBlockLength * recipeWidth;

            setEmptyBlockWidth(emptyBlockLength * recipeWidth);

            recipe_list_container.current.scrollTo(empty_block_width, 0);

            const scroll = setInterval(() => {
                if (
                    recipe_list_container.current != null &&
                    Math.ceil(recipe_list_container.current.scrollLeft) == Math.ceil(empty_block_width) ||
                    recipe_list_container.current != null &&
                    Math.floor(recipe_list_container.current.scrollLeft) == Math.ceil(empty_block_width)
                ) {
                    clearInterval(scroll);
                    containerElement.map((element) => {
                        if (
                            recipe_list_container.current.scrollLeft + recipe_list_container.current.clientWidth / 2 >= element.offsetLeft &&
                            recipe_list_container.current.scrollLeft + recipe_list_container.current.clientWidth / 2 >= element.offsetLeft + element.clientWidth
                        ) {
                            let target_id = element?.id;
                            let target_index = Number(element?.dataset.index);

                            setTargetID(target_id);
                            setTargetIndex(target_index);
                        }
                    })
                }
            })
        }
    }, [emptyBlockLength, recipeWidth, containerElement]);

    //fixed the position of target element during resizing 
    useEffect(() => {
        if (userref.current === null) {
            userref.current = true;
        } else if (targetID != null && targetIndex < containerElement.length - emptyBlockLength) {
            const empty_block_width = emptyBlockLength == 0 ? 0 : emptyBlockWidth;

            setTargetIndex(Number(document.getElementById(targetID).dataset.index) + emptyBlockLength);
            recipe_list_container.current.scrollTo({
                left: document.getElementById(targetID).offsetLeft - empty_block_width,
                behavior: 'auto'
            })
        }
    }, [recipeWidth, containerElement]);

    useEffect(() => {
        if (savedRecipes != null && props.revealContributer == true) {
            const containerBox = [];

            for (let index = 0; index < recipe_list_container.current.children.length; index++) {
                if (
                    recipe_list_container.current.children[index] != arrowLeft.current &&
                    recipe_list_container.current.children[index] != arrowRight.current
                ) {
                    containerBox.push(recipe_list_container.current.children[index])
                }
            }
            setContainerElement([...containerBox]);

            setTimeout(() => props.setRevealRecipes(true), 0)
        }
    }, [emptyBlockLength, savedRecipes, props.revealContributer]);

    useEffect(() => {
        if (targetIndex != null && containerElement != null) {
            containerElement.map((element) => {
                if (containerElement.indexOf(element) != targetIndex && element.className != 'empty') {
                    element.children[0] && (element.children[0].style.transform = 'translateY(0) scale(1)');
                }
            })

            detectTarget();
        }
    }, [targetIndex, containerElement]);

    useEffect(() => {
        if (
            targetIndex != null &&
            containerElement != null &&
            recipeWidth != null &&
            recipe_list_container.current != null
        ) {
            if (targetIndex < containerElement.length - emptyBlockLength) {
                if (recipeLength >= 5 && targetIndex - 2 >= 0) {
                    containerElement[targetIndex - 2].children[0] && (containerElement[targetIndex - 2].children[0].style.transform = 'translateY(-3%) scale(1)');
                }
                if (targetIndex - 1 >= 0) {
                    containerElement[targetIndex - 1].children[0] && (containerElement[targetIndex - 1].children[0].style.transform = (recipeLength < 5 ? 'translateY(-3%) scale(1.05, 1)' : 'translateY(-10%) scale(1.05, 1)'));
                };

                containerElement[targetIndex] && (containerElement[targetIndex].style.transform = 'translateY(0%) scale(1)');
                containerElement[targetIndex].children[0] && (containerElement[targetIndex].children[0].style.transform = 'translateY(-20%) scale(1.1, 1)');

                if (targetIndex + 1 < containerElement.length) {
                    containerElement[targetIndex + 1].children[0] && (containerElement[targetIndex + 1].children[0].style.transform = (recipeLength < 5 ? 'translateY(-3%) scale(1.05, 1)' : 'translateY(-10%) scale(1.05, 1)'));
                }
                if (recipeLength >= 5 && targetIndex + 2 < containerElement.length) {
                    containerElement[targetIndex + 2].children[0] && (containerElement[targetIndex + 2].children[0].style.transform = 'translateY(-3%) scale(1)');
                }
            }

            recipe_list_container.current.addEventListener('pointerdown', () => {
                recipe_list_container.current.addEventListener('scroll', detectTarget)
                recipe_list_container.current.addEventListener('pointerup', () =>
                    setTimeout(() => recipe_list_container.current.removeEventListener('scroll', detectTarget), 1000)
                )
            })
        }
    }, [targetIndex, recipeWidth, containerElement]);

    // Touch/PointerMove scroll event
    useEffect(() => {
        if (userref.current == null) {
            userref.current = true;
        } else if (latestPoint != null && scroll != null) {
            const Y = Math.abs(latestPoint[1] - scroll[1]);
            const X = Math.abs(latestPoint[0] - scroll[0]);
            const scrollX = (latestPoint[0] - scroll[0]);
            const scrollY = (latestPoint[1] - scroll[1]);

            if (X > Y) {
                setScrollX(true);
                recipe_list_container.current.scrollBy(scrollX, 0);
            }
            if (X < Y) {
                setScrollX(false);
                window.scrollBy(0, scrollY);
            }

            setLatestPoint([scroll[0], scroll[1]]);
            setLatestTime(Date.now());
        }
    }, [scroll]);

    // Scroll to specific target 
    useEffect(() => {
        if (scrollDirection != null && scrollDirection != '') {
            const rightScrollLength = recipe_list_container.current.scrollLeft + recipe_list_container.current.clientWidth + 10;
            const leftScrollLength = recipe_list_container.current.scrollLeft - 10;

            let rightTarget;
            let leftTarget;
            let scrollLeft;
            const containerBox1 = [];

            for (let index = 0; index < recipe_list_container.current.children.length; index++) {
                if (
                    recipe_list_container.current.children[index] != arrowLeft.current &&
                    recipe_list_container.current.children[index] != arrowRight.current
                ) {
                    const target = recipe_list_container.current.children[index];
                    if (
                        target.offsetLeft < rightScrollLength && 
                        target.offsetLeft + target.clientWidth > rightScrollLength
                    ) {
                        rightTarget = target;
                    }
                    if (
                        target.offsetLeft < leftScrollLength && 
                        target.offsetLeft + target.clientWidth > leftScrollLength
                    ) {
                        leftTarget = target;
                    }
                }
            }

            setTimeout(() => setScrollDirection(''), 10);
            if (
                (rightTarget == undefined && scrollDirection == "right") || 
                (leftTarget == undefined && scrollDirection == "left")
            ) {
                return
            };

            scrollLeft = scrollDirection == 'left' ?
                leftTarget?.offsetLeft :
                rightTarget?.offsetLeft + rightTarget?.clientWidth - recipe_list_container.current.clientWidth


            setTimeout(() => {
                recipe_list_container.current.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }, 50);
        }
    }, [scrollDirection, containerElement]);

    // EventHandlers of recipe_list_container
    const pointerDownHandler = (e) => {
        if (
            !isChildElement(e.target, arrowLeft.current) &&
            !isChildElement(e.target, arrowRight.current)
        ) {
            setScroll([e.clientX, e.clientY]);
            setStartingPoint([e.clientX, e.clientY]);
            setLatestPoint([e.clientX, e.clientY]);
        }
    };

    const pointerUpHandler = (e) => {
        const cancelTime = Date.now();

        if (
            !isChildElement(e.target, arrowLeft.current) &&
            !isChildElement(e.target, arrowRight.current)
        ) {
            if (scrollX) {
                const scroll1 = e.clientX < startingPoint[0] ? 'right' : 'left';

                if (
                    (Math.abs(e.clientX - startingPoint[0]) < recipeWidth)
                ) {
                    console.log('hihih')
                    setScrollDirection(scroll1);
                } else if ((Math.abs(e.clientX - startingPoint[0]) > recipeWidth)) {
                    if (cancelTime - latestTime > 10) {
                        setScrollDirection(scroll1);
                    } else {
                        const scrollLength = -(scroll[0] - startingPoint[0]) * 15;
                        const totalScrollLength = recipe_list_container.current.scrollLeft + scrollLength < 0 ? 0 : recipe_list_container.current.scrollLeft + scrollLength;

                        containerElement.map((element) => {
                            if (totalScrollLength >= element.offsetLeft && totalScrollLength <= element.offsetLeft + element.clientWidth)
                                recipe_list_container.current.scrollTo({
                                    left: element.offsetLeft,
                                    behavior: 'smooth'
                                })
                        })
                        return
                    }
                }
            } else if (cancelTime - latestTime < 150) {
                const scrollUp = startingPoint[1] - scroll[1] > 0;
                let scrollYLength = (scroll[1] - startingPoint[1]) * 15;
                let scrolledLength = 0;

                const scroll_event = setInterval(() => {
                    const scroll_length = Math.abs(Math.ceil(scrollYLength / 75));
                    const scrollY = scrollUp ? scroll_length : -scroll_length;

                    window.scrollBy(0, scrollY);
                    scrollYLength = Math.abs(scrollYLength) - scroll_length;
                    scrolledLength += scroll_length;

                    if (scrolledLength > scrollYLength) {
                        window.scrollBy(0, scrollUp ? -1 : 1);
                        clearInterval(scroll_event);
                    }
                }, 10)

                window.addEventListener('pointerdown', () => {
                    clearInterval(scroll_event)
                }, { once: true })
            }
        }
    }

    const pointerMoveHandler = (e) => {
        if (
            !isMobile &&
            scroll != null &&
            !isChildElement(e.target, arrowLeft.current) &&
            !isChildElement(e.target, arrowRight.current) &&
            !setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
        ) {
            setScroll([e.clientX, e.clientY]);

            window.addEventListener('pointerup', (e) => {
                const scroll_Right = e.clientX < startingPoint[0];
                const direction = scroll_Right ? 'right' : 'left';

                setScrollDirection(direction);
                setScroll(null);
            }, { once: true })
        }
    };

    const touchMoveHandler = (e) => {
        setScroll([e.touches[0].clientX, e.touches[0].clientY])
    }

    return (
        <Box
            ref={recipe_root}
            className={recipes.root}
        >
            <Typography className={recipes.title}>Most Popular Recipes</Typography>
            <br />
            <Typography className={recipes.subtitle}>
                We have thousands of recipes from verious regions, these are what people like the most
            </Typography>
            <Box
                className={recipes.container}
                ref={recipe_container}
            >
                <Box
                    className={recipes.block}
                    ref={recipe_list_container}
                    onPointerDown={pointerDownHandler}
                    onTouchMove={touchMoveHandler}
                    onPointerUp={pointerUpHandler}
                    onPointerMove={pointerMoveHandler}
                >
                    <KeyboardDoubleArrowLeft
                        ref={arrowLeft}
                        className={`${recipes.arrow} ${recipes.leftArrow}`}
                        onPointerUp={() => {
                            setScrollDirection('left');
                        }}
                    />

                    {
                        emptyBlockLength != 0 &&
                        Array(emptyBlockLength).fill(0).map((ele) =>
                            <Box
                                key={uuid()}
                                //className={`${recipes.box}`}
                                style={{ opacity: '0 !important', position: 'relative', minWidth: `${recipeWidth}px`, height: '100%' }}
                            >
                                <Box />
                            </Box>
                        )
                    }

                    {
                        savedRecipes != null && savedRecipes.map((recipe) =>
                            <Box
                                className={`${recipes.boxParent} ${recipes.boxes}`}
                                sx={{ minWidth: `${recipeWidth}px !important`, position: 'relative', zIndex: '10' }}
                                id={recipe._id}
                                key={recipe._id}
                                data-index={savedRecipes.indexOf(recipe)}
                            >
                                <Box className={recipes.box} sx={{ backgroundImage: `url('${recipe.backgroundImage}') !important` }}>
                                    <Card className={recipes.card}>
                                        <Typography className={recipes.cardDish}>{recipe.name}</Typography>
                                        <Typography className={recipes.cardText}>
                                            <AccessAlarm className={recipes.cardAlarm} /> Prep: {recipe.prepTime} mins
                                        </Typography>
                                        <Typography className={recipes.cardText}>
                                            <AccessAlarm className={recipes.cardAlarm} /> Cook: {recipe.cookTime} mins
                                        </Typography>
                                        <Typography sx={{ margin: '5px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {
                                                Array(recipe.stars).fill(0).map((star) =>
                                                    <Star key={uuid()} className={recipes.cardStar} />)
                                            }

                                            {
                                                recipe.stars < 5 && Array(5 - recipe.stars).fill(0).map((outlinedStar) =>
                                                    <StarBorder key={uuid()} className={recipes.cardStar} />
                                                )
                                            }

                                        </Typography>
                                    </Card>
                                </Box>
                            </Box>
                        )
                    }

                    {
                        emptyBlockLength != 0 && Array(emptyBlockLength).fill(0).map((ele) =>
                            <Box
                                key={uuid()}
                                //className={`${recipes.box}`}
                                style={{ opacity: '0 !important', position: 'relative', minWidth: `${recipeWidth}px`, height: '100%' }}
                            >
                                <Box />
                            </Box>
                        )
                    }

                    <KeyboardDoubleArrowRight
                        className={`${recipes.arrow} ${recipes.rightArrow}`}
                        ref={arrowRight}
                        onPointerUp={() => {
                            setScrollDirection('right');
                        }}
                    />
                </Box>
            </Box>

            <Button
                className={recipes.button}
                onPointerUp={(e) => {
                    navigate('/login')
                }}
            >
                <Typography className={recipes.buttonText}>
                    View all recipes
                </Typography>
            </Button>
        </Box>
    )
}

export default RecipesComponent