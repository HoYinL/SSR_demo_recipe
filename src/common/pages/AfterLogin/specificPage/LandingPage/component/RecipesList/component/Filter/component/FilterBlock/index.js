import React from "react";
import { FilterBlock } from "./style";
import { Box, Typography, Button } from "@mui/material";
import { FilterAltOutlined } from "@mui/icons-material"

const FilterBlockComponent = (props) => {
    const filter = FilterBlock();

    return(
        <Box className={filter.root} onClick={props.function}>
            <Box className={filter.filterBlock}>
                <FilterAltOutlined />
                <Typography>Filter Recipes</Typography>
            </Box>
        </Box>
    )
}

export default FilterBlockComponent