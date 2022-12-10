/* import hook */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFilterState } from "../../../../../../../../../../../../../../store/filterreducer";
/* import module */
import axios from "axios"
/* import component */
import { TextField, MenuItem, List, ListItem, Box, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material"
/* import obj / func */
import { FilterForm, filterStyle } from "../../../../style";
import { item_repeated } from "../../../../function";

const CountriesComponent = (props) => {
    const selectField = FilterForm();

    const [ countries, setCountries ] = useState([]);
    const [ countryList, setCountryList ] = useState([]);
    const [ deleteCountry, setDeleteCountry ] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        (countryList)
        setCountryList(countryList.filter((ele) => ele.props.region != props.delete_region));
        props.setFilters(props.filters.filter((ele) => ele.props.region ? ele.props.region != props.delete_region : ele))
    }, [props.delete_region])

    useEffect(() => {
        setCountryList(countryList.filter((ele) => ele.props.id != deleteCountry));
        props.setFilters(props.filters.filter((ele) => ele.props.name != deleteCountry));
    },[deleteCountry])

    useEffect(() => {
        (async () => {
            await axios.get(`https://restcountries.com/v3.1/${ props.region == null? `all` : `region/${props.region}`}`, {}, {
                headers: {"Access-Control-Allow-Origin": "*"}
            })
            .then((res) => {
                return res.data
            })
            .then((res) => {
                setCountries(res.map((country) => 
                    <MenuItem 
                        key={country.name.common} 
                        value={country.name.common}
                    >
                        {country.name.common}
                    </MenuItem>
                ));
            })
        })()
    }, [props.region])

    const handleClick = (e) => {
        const target = e.target.value;

        !item_repeated(countryList, target) && setCountryList([...countryList, 
            <ListItem 
                className={selectField.filterBlock} 
                key={e.target.value} 
                id={target}
                region={props.region}
            >
            <Typography>{e.target.value}</Typography> 
            <Cancel 
                onClick={() => {
                    setDeleteCountry(target)
                }}
            />
            </ListItem>
        ]);

        {!item_repeated(countryList, target) && props.setFilters([...props.filters,
            <ListItem 
                sx={filterStyle} 
                key={e.target.value} 
                name={target}
                region={props.region}
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
                label="Countries"
                onChange={handleClick} 
            >
            {countries}
            </TextField>

            {
                countryList[0] != null && <List className={selectField.filterList}>
                    {countryList}
                </List>
            }
        </Box>
    )
}

export default CountriesComponent