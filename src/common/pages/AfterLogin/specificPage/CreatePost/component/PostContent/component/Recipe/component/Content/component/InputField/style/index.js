import { makeStyles } from "@material-ui/core";

const InputFieldStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: '1',
        display: 'flex',
        padding: '0',
        flexWrap: 'wrap',
        //width: 'auto',
        [theme.breakpoints.up('_500')]:{
            flexWrap: 'nowrap'
        }
    },

    textfield: {
        width: '80%',
        margin: '.8rem auto',
        "& .MuiOutlinedInput-input":{
            fontSize: '4rem',
            fontFamily: 'Times New Roman',      
            padding: '0',
        },
        "& .MuiOutlinedInput-notchedOutline":{
            display: 'none'
        }
    },

    clear: {
        width: '1.5em', 
        height: '100%',
        fontSize: '1.5rem', 
        color: '#c3c3c3', 
        cursor: 'pointer'
    }
}))

export { InputFieldStyles }