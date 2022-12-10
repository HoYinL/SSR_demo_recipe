import React from "react";
import { TextField, Typography, InputAdornment, Button } from "@mui/material";
import { Search } from '@mui/icons-material';
import { WebTitle } from "../style";
import { useMediaQuery } from "react-responsive";

const searchBar = () => {
    const webTitle = WebTitle();

    const xs = useMediaQuery({
        query: "(max-width: 300px)"
    })

    const ns = useMediaQuery({
        query: "(min-width: 301px)"
    })

    return (
        <>        
        {
            xs &&  
            <TextField 
                placeholder="Search Recipes"
                className={webTitle.bar}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="enf">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            >
            </TextField>
        }
        
        { 
            ns &&
            <TextField
                className={webTitle.bar}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <Button className={webTitle.button} position="end">
                            <Typography sx={{fontSize: '10px', color: 'white'}}>Search</Typography>
                        </ Button>
                    ),
                }}
            >
            </TextField>
        }
        </>
    )
}

export default searchBar