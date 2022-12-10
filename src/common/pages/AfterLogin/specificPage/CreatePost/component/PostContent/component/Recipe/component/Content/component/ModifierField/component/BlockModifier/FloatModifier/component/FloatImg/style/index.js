import { makeStyles } from "@material-ui/styles";

const FloatImgStyle = makeStyles((theme) => ({
    root: {
        cursor: 'pointer', 
        border: '1px dashed white', 
        height: '25px', 
        width: '50px', 
        margin: '0 .5rem',
        "&:hover": {
            "& .MuiBox-root":{
                border: '1px dashed orange',
                borderTop: 'none',
            },
            border: '1px dashed orange'
        }, 
    },

    floatBlock: {
        border: '1px dashed white', 
        borderTop: 'none', 
        height: '12.5px', 
        width: '25px'
    }
}));

export { FloatImgStyle }