import React, { useEffect, useState, useRef } from "react";
import {
    Box, List, ListItem, Typography, TextField, ListItemText,
    InputAdornment, ListItemAvatar, Avatar, Card
} from "@mui/material";
import {
    Search, MoreHorizOutlined, Image, MapsUgcOutlined,
    KeyboardDoubleArrowRight, KeyboardDoubleArrowLeft,
} from "@mui/icons-material";
import { FriendList } from "./style";
import { showRightColumn, scrollRightColumn } from "../../function";
import { sortUser, sortPost } from "../../../../../../server/axios/api1";
import UserBlock from "./component/UserBlock";
import PostBlock from "./component/PostBlock";
import { useSelector } from "react-redux";

const FriendListComponent = (props) => {
    const friendlist = FriendList();

    const [pointerMove, setPointerMove] = useState(false);
    const [popularUsers, setPopularUsers] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);

    const userref = useRef(false);
    const ref = useRef();

    const user = useSelector(state => state.token.token_payload);

    useEffect(() => {
        sortUser()
            .then(res => {
                setPopularUsers(res.user)
            });

        sortPost()
            .then(res => {
                setPopularPosts(res.post);
            });
    }, []);

    useEffect(() => {
        const closure_scrollFunc = (pointerMove) => { return () => scrollRightColumn(pointerMove) };
        const closure_PointerMove = (setPointerMove) => { return () => setPointerMove(false) };

        if (userref.current == false) {
            userref.current = true
        } else {
            const rightBlock = document.getElementById('rightBlock');

            const scrollLeft = closure_scrollFunc(pointerMove);
            const PointerMove = closure_PointerMove(setPointerMove)

            if (ref.current && pointerMove != false && pointerMove != null) {
                ref.current.addEventListener("pointermove", scrollLeft, { once: true });
                ref.current.addEventListener("touchmove", scrollLeft, { once: true });
                document.addEventListener('pointerup', PointerMove, { once: true });
                document.addEventListener('touchend', PointerMove, { once: true });
            }

            if (ref.current && pointerMove == false) {
                rightBlock.classList.replace(friendlist.arrowBlockCoverDisplayNone, friendlist.arrowBlockCoverDisplay)

                ref.current.removeEventListener("pointermove", scrollLeft, { once: true });
                ref.current.removeEventListener("touchmove", scrollLeft, { once: true });
                document.removeEventListener('pointerup', PointerMove, { once: true });
                document.removeEventListener('touchend', PointerMove, { once: true });

                setTimeout(() => { setPointerMove(null) }, 50)
            }

            if (ref.current && pointerMove == null) {
                showRightColumn();
                setTimeout(() => {
                    props.setRightArrowDirection('right');
                    rightBlock.classList.replace(friendlist.arrowBlockCoverDisplay, friendlist.arrowBlockCoverDisplayNone)
                }, 200);

                props.setScroll(true);
            }
        }
    }, [pointerMove]);

    return (
        <Box id="FriendListBlock" className={friendlist.block}>
            <Box id='FriendList' className={friendlist.root}>
                {/*<Box className={friendlist.box}>
                    <TextField
                        placeholder="Search friend"
                        className={friendlist.textField}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search sx={{ fontSize: '1.25rem' }} />
                                </InputAdornment>
                            ),
                        }}
                    >
                    </TextField>
                </Box>
                <Box sx={{ padding: '0 1rem', textAlign: 'end' }}>
                    <MoreHorizOutlined className={friendlist.MoreHorizOutlined} />
                </Box>*/}

                <Typography className={friendlist.friendText}>Popular Users</Typography>
                <Card id='UserList' className={friendlist.friendcard}>
                    <List>
                        {
                            popularUsers.length != 0 && popularUsers.map((popularUser) =>
                                <UserBlock
                                    popularUser={popularUser}
                                    user={user}
                                />
                            )
                        }
                    </List>
                </Card>

                <Typography className={friendlist.friendText}>Hottest Posts</Typography>
                <Card className={friendlist.groupcard}>
                    <List>
                        {
                            popularPosts.length != 0 && popularPosts.map((popularPost) => 
                                <PostBlock 
                                    popularPost={popularPost}
                                />
                            )
                        }
                    </List>
                </Card>
            </Box>
            <Box id="showRightColumn" className={friendlist.arrowBlock}>
                <Box id="rightBlock" className={`${friendlist.arrowBlockCover} ${friendlist.arrowBlockCoverDisplayNone}`} />
                {props.rightArrowDirection == 'right' &&
                    <KeyboardDoubleArrowRight
                        id='rightArrowRight'
                        onPointerUp={() => { props.hideFriendList() }}
                        onPointerDown={() => {
                            document.addEventListener('pointermove', props.hideFriendList, { once: true })
                            document.addEventListener('touchmove', props.hideFriendList, { once: true })
                        }}
                    />
                }
                {props.rightArrowDirection == 'left' &&
                    <KeyboardDoubleArrowLeft
                        id='rightArrowLeft'
                        ref={ref}
                        onPointerUp={(e) => { setPointerMove(false); }}
                        onPointerDown={(e) => { setPointerMove(e.clientX); }}
                    />}
            </Box>
        </Box>
    )
}

export default FriendListComponent