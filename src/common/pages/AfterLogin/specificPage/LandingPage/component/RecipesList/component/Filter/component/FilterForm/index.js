import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Paper, Button, Card, Typography, Box } from "@mui/material";
import { FilterForm } from "./style";
import Category from "./component/CetegoryTextField";
import Meal from "./component/MealTextField";
import Method from "./component/MethodTextField";
import Region from "./component/RegionTextField";
import { addFilterState, updateFilter} from "../../../../../../../../../../store/filterreducer";

const FilterFormComponent = (props) => {
    const filterform = FilterForm();

    const [ filters, setFilters ] = useState([]);
    const dispatch = useDispatch();

    return (
        <Paper className={filterform.root}>
            <Card className={filterform.form}>
                <Typography>Filter</Typography>

                <Box sx={{height: '80%', width: '100%', overflowY: 'scroll'}}>
                    <Category setFilters={setFilters} filters={filters}/>
                    <Meal setFilters={setFilters} filters={filters}/>
                    <Method setFilters={setFilters} filters={filters}/>
                    <Region setFilters={setFilters} filters={filters}/>
                </Box>

                <Box className={filterform.buttonBox}>
                    <Button onClick={props.function}>Cancel</Button>
                    <Button onClick={() => {
                        props.function();
                        //(filter.props.name)
                        filters.map(filter => dispatch(updateFilter(filter.props.name)))
                        //dispatch(addFilterState(filters))
                    }}>
                        Submit
                    </Button>
                </Box>
            </Card>
        </Paper>
    )
}

export default FilterFormComponent