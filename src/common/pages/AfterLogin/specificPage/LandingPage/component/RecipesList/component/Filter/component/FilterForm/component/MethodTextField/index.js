/* import hook */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFilterState } from "../../../../../../../../../../../../store/filterreducer";
/* import component */
import { TextField, MenuItem, List, ListItem, Box, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material"
/* import obj / func */
import { FilterForm, filterStyle } from "../../style";
import Methods from "../../data/method";
import { item_repeated } from "../../function";

const MethodComponent = (props) => {
    const selectField = FilterForm();

    const [ methodList, setMethodList ] = useState([]);
    const [ deleteItem, setDeleteItem ] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setMethodList(methodList.filter((ele) => ele.props.id != deleteItem));
        props.setFilters(props.filters.filter((ele) => ele.props.name != deleteItem))
    }, [deleteItem])

    const handleClick = (e) => {
        const target = e.target.value;

        !item_repeated(methodList, target) && setMethodList([...methodList, 
            <ListItem 
                className={selectField.filterBlock} 
                key={e.target.value} 
                id={target}
            >
            <Typography>{e.target.value}</Typography> 
            <Cancel 
                onClick={() => {
                    setDeleteItem(target)
                }}
            />
            </ListItem>
        ]);

        {!item_repeated(methodList, target) && props.setFilters([...props.filters,
            <ListItem 
                sx={filterStyle} 
                key={e.target.value} 
                name={target}
            >   
            <Typography>{e.target.value}</Typography> 
            <Cancel onClick={() => {
                dispatch(removeFilterState(target)
                )}}
            />
            </ListItem>
        ])}
    }
    
    return(
        <Box className={selectField.select}>
            <TextField
                select
                label="Method"
                onChange={handleClick}
            >
                {
                    Methods.map((method) => (
                        <MenuItem 
                            key={method.method} 
                            value={method.method}
                        >
                            {method.method}
                        </MenuItem>
                    ))
                }
            </TextField>

            { 
                methodList[0] != null && <List className={selectField.filterList}>
                    {methodList}
                </List>
            }
        </Box>
    )
}

export default MethodComponent