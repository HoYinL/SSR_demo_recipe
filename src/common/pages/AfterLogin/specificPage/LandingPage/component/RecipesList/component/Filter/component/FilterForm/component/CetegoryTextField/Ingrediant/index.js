/* import hook */
import React,  { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFilterState } from "../../../../../../../../../../../../../store/filterreducer";
/* import component */
import { TextField, MenuItem, List, ListItem, Box, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material"
/* import obj / func */
import { FilterForm, filterStyle } from "../../../style";
import ingrediants from "../../../data/ingrediants";
import { item_repeated } from "../../../function";

const IngrediantComponent = (props) => {
    const selectField = FilterForm();

    const [ ingrediantList, setingrediantList ] = useState([]);
    const [ deleteIngrediant, setDeleteIngrediant ] = useState('');

    useEffect(() => {
        setingrediantList(ingrediantList.filter((ele) => ele.props.type != props.delete_category));
        props.setFilters(props.filters.filter((ele) => ele.props.type ? ele.props.type != props.delete_category : true))
    }, [props.delete_category])

    useEffect(() => {
        setingrediantList(ingrediantList.filter((ele) => ele.props.id != deleteIngrediant));
        props.setFilters(props.filters.filter((ele) => ele.props.name != deleteIngrediant))
    }, [deleteIngrediant])

    const dispatch = useDispatch();

    const handleClick = (e) => {
        const target = e.target.value

        !item_repeated(ingrediantList, target) && setingrediantList([...ingrediantList, 
            <ListItem 
                className={selectField.filterBlock} 
                key={e.target.value} 
                id={target} 
                type={props.type}
            >
            <Typography>{e.target.value}</Typography> 
            <Cancel 
                onClick={() => {
                    setDeleteIngrediant(target)
                }}
            />
            </ListItem>
        ]);

        {!item_repeated(ingrediantList, target) && props.setFilters([...props.filters, 
            <ListItem 
                sx={filterStyle} 
                key={e.target.value} 
                name={target} 
                type={props.type}
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
                label="Ingrediants"
                onChange={handleClick}
            >
                {
                    ingrediants.map((ingrediant) => {
                        if(props.type === "Pescatarian"){
                            return ingrediant.type ===  "Pescatarian" || ingrediant.type === "ovo-lacto" || ingrediant.type === "Vegan"?
                               (<MenuItem 
                                    value={ingrediant.ingrediants}
                                    key={ingrediant.ingrediants}
                                >
                                    {ingrediant.ingrediants}
                                </MenuItem>
                            ): null;
                        }

                        if(props.type === "Flexitarian"){
                            return (<MenuItem 
                                value={ingrediant.ingrediants}
                                key={ingrediant.ingrediants}
                            >
                                {ingrediant.ingrediants}
                            </MenuItem>
                            )
                        }

                        return ingrediant.type === props.type? 
                            (<MenuItem 
                                value={ingrediant.ingrediants}
                                key={ingrediant.ingrediants}
                            >
                                {ingrediant.ingrediants}
                            </MenuItem>): null
                    })
                }
            </TextField>

            {
                ingrediantList[0] != null && <List className={selectField.filterList}>
                    {ingrediantList}
                </List>
            }
        </Box>
    )
}

export default IngrediantComponent