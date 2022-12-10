/* import hook */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFilterState } from "../../../../../../../../../../../../store/filterreducer";
/* import component */
import { TextField, MenuItem, List, ListItem, Box, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material"
/* import obj / func */
import { FilterForm, filterStyle } from "../../style";
import meals from "../../data/meal"
import { item_repeated } from "../../function";

const MealComponent = (props) => {
    const selectField =  FilterForm();

    const [ mealList, setMeal ] = useState([]);
    const [ deleteItem, setDeleteItem ] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setMeal(mealList.filter((ele) => ele.props.id != deleteItem));
        props.setFilters(props.filters.filter((ele) => ele.props.name != deleteItem))
    }, [deleteItem])

    const handleClick = (e) => {
        const target = e.target.value;

        !item_repeated(mealList, target) && setMeal([...mealList, 
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

        {!item_repeated(mealList, target) && props.setFilters([...props.filters,
            <ListItem 
                sx={filterStyle} 
                key={e.target.value} 
                name={target}
            >   
            <Typography>{e.target.value}</Typography> 
            <Cancel 
                onClick={() => {
                    dispatch(removeFilterState(target))
                }}
            />
            </ListItem>
        ])}
    }
    
    return(
        <Box className={selectField.select}>
            <TextField
                select
                label="Meal"
                onChange={handleClick} 
            >
                {meals.map((meal) => ( 
                    <MenuItem 
                        key={meal.meal} 
                        value={meal.meal}
                    >
                        {meal.meal}
                    </MenuItem>
                ))}
            </TextField>

            { 
                mealList[0] != null && <List className={selectField.filterList}>
                    {mealList}
                </List>
            }
        </Box>
    )
}

export default MealComponent