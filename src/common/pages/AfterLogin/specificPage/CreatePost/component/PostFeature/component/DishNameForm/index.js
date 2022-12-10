import React, { useEffect, useState } from "react";
import { TextField, Typography, Box } from "@mui/material";
import { FormStyle } from "../../style";

const DishNameFormComponent = (props) => {
    const formStyle = FormStyle();

    return(
        <Box>
            <Typography>Dish Name:</Typography>
                <TextField 
                    onChange={(e) =>{
                        props.setDishName(e.target.value)
                    }}
                    defaultValue={props.savedDishName}
                    key={props.savedDishName}
                    placeholder="Input Dish Name..."
                    variant="filled"
                    className={formStyle.textfield}
            />
        </Box>
    )
}

export default DishNameFormComponent