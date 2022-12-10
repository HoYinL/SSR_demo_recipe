/* import hook */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFilterState } from "../../../../../../../../../../../../../store/filterreducer";
/* import component */
import { TextField, MenuItem, List, ListItem, Box, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material"
/* import obj / func */
import { FilterForm, filterStyle } from "../../../style";
import category from "../../../data/category";
import { item_repeated } from "../../../function";

const CategoriesComponent = (props) => {
    const selectField = FilterForm();

    const [ categoryList, setCategoryList ] = useState([]);
    const [ deleteCategory, setdeleteCategory ] = useState(''); 

    const dispatch = useDispatch();

    useEffect(() => {
        setCategoryList(categoryList.filter((ele) => ele.props.id != deleteCategory));
        props.setFilters((props.filters).filter((ele) => ele.props.name != deleteCategory));
        props.setDeleteCategory(deleteCategory);
    }, [deleteCategory])

    useEffect(() => {
        categoryList.length == 0 && props.setDisplayIngrediant(false)
    }, [categoryList])

    const handleClick = (e) => {
        const target = e.target.value;
        
        !item_repeated(categoryList, target) && setCategoryList([...categoryList, 
            <ListItem 
                className={selectField.filterBlock} 
                id={target} 
                key={e.target.value}
            >
            <Typography>{e.target.value}</Typography> 
            <Cancel 
                onClick={() => {setdeleteCategory(target)}} 
            />
            </ListItem>
        ]);

        {props.function(e)}

        {!item_repeated(categoryList, target) &&  props.setFilters([...props.filters, 
            <ListItem 
                sx={filterStyle} 
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
    };

    return(
        <Box className={selectField.select}>
            <TextField
                select
                label="Category"
                onChange={handleClick}
            >
                {
                    category.map((category) => (
                        <MenuItem
                            key={category.category}
                            value={category.category}
                        >
                            {category.category}
                        </MenuItem>
                    ))
                }
            </TextField>

            { 
                categoryList[0] != null && <List className={selectField.filterList}>
                    {categoryList}
                </List>
            }
        </Box>
    )
}

export default CategoriesComponent