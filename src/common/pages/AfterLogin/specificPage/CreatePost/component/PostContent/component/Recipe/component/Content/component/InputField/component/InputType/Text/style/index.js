import { makeStyles } from "@material-ui/styles";

const InputTextStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '0 .5rem',
        "& .MuiOutlinedInput-input":{
            fontSize: '1.25rem',
            fontFamily: 'Times New Roman',      
            padding: '0rem',
            lineHeight: '1.75rem'
        },
        "& .MuiOutlinedInput-root":{
            padding: '0'
        },
        "& .MuiOutlinedInput-notchedOutline":{
            display: 'none'
        },
        "& .MuiSvgIcon-root":{
            height: '100%',
        },
        [theme.breakpoints.down("_360")]:{
            margin: '1rem .75rem',
        }
    }
}))

export { InputTextStyles }