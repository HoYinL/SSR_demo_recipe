/* import hook */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFilterState } from "../../../../../../../../../../../../../../store/filterreducer";
/* import component */
import { TextField, MenuItem, List, ListItem, Box, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material"
/* import obj / func */
import { FilterForm, filterStyle } from "../../../../style";
import regions from "../../../../data/regions";
import { item_repeated } from "../../../../function";

const RegionsComponent = (props) => {
    const selectField =  FilterForm();

    const [ regionList, setRegionList ] = useState([]);
    const [ deleteRegion, setdeleteRegion ] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setRegionList(regionList.filter((ele) => ele.props.id != deleteRegion));
        props.setFilters(props.filters.filter((ele) => ele.props.name != deleteRegion));
        props.setDeleteRegion(deleteRegion);
    },[deleteRegion])

    useEffect(() => {
        regionList.length == 0 && props.setDisplayCountries(false)
    }, [regionList])

    const handleClick = (e) => {
        const target = e.target.value;

        !item_repeated(regionList, target) && setRegionList([...regionList, 
            <ListItem 
                className={selectField.filterBlock} 
                key={e.target.value} 
                id={target}
            >
            <Typography>{e.target.value}</Typography> 
            <Cancel 
                onClick={() => {
                    setdeleteRegion(target)
                }}
            />
            </ListItem>
        ]);

        {props.function(e.target.value)}

        { !item_repeated(regionList, target) && props.setFilters([...props.filters,
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
        ]) }
    }

    return(
        <Box className={selectField.select}>
        <TextField
            select
            label="Regions"
            onChange={handleClick} 
        >
         {regions.map((region) => ( 
                <MenuItem 
                    key={region} 
                    value={region}
                >
                    {region}
                </MenuItem>
          ))}
        </TextField>
        { regionList[0] != null && <List className={selectField.filterList}>
            {regionList}
        </List>}
        </Box>
    )
}

export default RegionsComponent