import React from "react";
import { Box } from "@mui/material";
import List from "./component/List";
import PlainText from "./component/PlainText";
import Quote from "./component/Quote";

const TypeComponent = (props) => {
    return(
        <Box sx={{display: 'flex', top: '0'}}>
            <List 
                setType={props.setType}
                setTransform={props.setTransform}
                setAddEle={props.setAddEle}   
                target={props.target}         
            />
            <PlainText 
                setType={props.setType} 
                setTransform={props.setTransform}
                setAddEle={props.setAddEle}   
                target={props.target}                  
            />
            {
                (props.display === undefined || props.display === true) && <Quote 
                    setType={props.setType}
                    setTransform={props.setTransform} 
                    setAddEle={props.setAddEle}  
                    target={props.target}                   
                />
            }
        </Box>
    )
};

export default TypeComponent;