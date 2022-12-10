import React, { useState, useEffect } from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, IconButton } from "@mui/material";
import ReportBlock from "../../ReportBlock";
import { Report, IndeterminateCheckBox } from '@mui/icons-material';
import { OperationStyles } from "./style";
import { blockPost } from "../../../../../../../../../../../../server/axios/api1";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBlockedPost } from "../../../../../../../../../../../store/blockedpostreducer";

const OperationComponent = (props) => {
    const operationStyles = OperationStyles();

    const dispatch = useDispatch();

    const [report, setReport] = useState(false);

    const user = useSelector(state => state.token.token_payload);

    return (
        <>
            <Box className={operationStyles.root} >
                <List>
                    <ListItem
                        secondaryAction={
                            <IconButton aria-label="comment">
                                <IndeterminateCheckBox />
                            </IconButton>
                        }
                    >
                        <ListItemButton
                            role={undefined}
                            onPointerUp={() => {
                                blockPost(user.id, props.postId)
                                    .then((res) => {
                                        props.setDeleteEle(props.post);
                                        dispatch(setBlockedPost(true));
                                    })
                            }}
                            dense
                        >
                            <ListItemText>Block Post</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        secondaryAction={
                            <IconButton aria-label="comment">
                                <Report />
                            </IconButton>
                        }
                    >
                        <ListItemButton
                            role={undefined}
                            onPointerUp={() => {
                                setReport(true)
                            }}
                            dense
                        >
                            <ListItemText>Report Post</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            {
                report &&
                <ReportBlock
                    setDeleteEle={props.setDeleteEle}
                    post={props.post}
                    postId={props.postId}
                    setReport={setReport}
                />
            }
        </>
    )
};

export default OperationComponent