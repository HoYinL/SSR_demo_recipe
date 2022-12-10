import React, { useState, useEffect, useRef } from "react";
import { Box, List, ListItem, Checkbox, ListItemText, ListItemButton, Typography, TextField, Button } from "@mui/material";
import { ReportBlockStyles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { setReportedPost } from "../../../../../../../../../../store/reportedpostreducer";
import { blockPost } from "../../../../../../../../../../../server/axios/api1";
import { isChildElement } from "../../../../../../../../commonComponent/function";

const ReportBlockComponent = (props) => {
    const dispatch = useDispatch();

    const reportBlockStyles = ReportBlockStyles();

    const Block = useRef(null);
    const ReportBlock = useRef(null);

    const user = useSelector(state => state.token.token_payload);

    const [reasons, setReasons] = useState([
        "It is annoying",
        "It is humiliating",
        "It is scam",
        "hate speech",
        "It is sexually explicit"
    ]);
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        Block.current.addEventListener('pointerup', (e) => {
            if(!isChildElement(e.target, ReportBlock.current)){
                props.setReport(false);
            }
        })
    }, []);

    return (
        <Box ref={Block} className={reportBlockStyles.root}>
            <Box ref={ReportBlock} className={reportBlockStyles.reportBlock}>
                <Typography>Report Reasons: </Typography>
                <List>
                    {
                        reasons.map((reason) => {
                            const labelId = `checkbox-list-label-${reason}`;

                            return (
                                <ListItem key={reason}>
                                    <ListItemButton
                                        role={undefined}
                                        onPointerUp={() => {
                                            if(checked.includes(reason)){
                                                const index = checked.indexOf(reason);
                                                const clone_checked = [...checked];
                                                clone_checked.splice(index, 1);
                                                setChecked([...clone_checked]);
                                            } else {
                                                setChecked([...checked, reason]);
                                            }
                                        }}
                                        dense
                                    >
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(reason) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                        <ListItemText id={labelId} primary={reason} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <TextField 
                    placeholder={"Other reasons..."}
                    multiline
                />
                <Button
                    className={reportBlockStyles.button}
                    onPointerUp={(e) => { 
                        dispatch(setReportedPost(true));
                        props.setDeleteEle(props.post);
                        blockPost(user.id, props.postId);
                        props.setReport(false);
                    }}
                >
                    Report
                </Button>
            </Box>
        </Box>
    )
};

export default ReportBlockComponent