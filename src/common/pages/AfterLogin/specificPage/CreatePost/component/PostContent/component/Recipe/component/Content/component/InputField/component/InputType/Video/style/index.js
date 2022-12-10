import { makeStyles } from "@material-ui/styles";

const InputTextStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '0 .5rem',
        "& .MuiOutlinedInput-input":{
            fontSize: '1.25rem',
            fontFamily: 'revert',      
            padding: '0rem',
            lineHeight: '2rem'
        },
        "& .MuiOutlinedInput-root":{
            paddingLeft: '0',
            paddingRight: '0'
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