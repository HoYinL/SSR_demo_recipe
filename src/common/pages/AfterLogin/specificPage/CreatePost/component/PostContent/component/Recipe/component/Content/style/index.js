import { makeStyles } from "@material-ui/core";

const ContentStyles = makeStyles((theme) => ({
    textfield: {
        width: '100%',
        margin: '0 0 0 48px',
        padding: '0 .5rem',
        "& .MuiOutlinedInput-input":{
            fontSize: '2rem',
            fontFamily: 'Times New Roman',      
            padding: '0',
        },
        "& .MuiOutlinedInput-notchedOutline":{
            display: 'none'
        }
    },

    titleFieldOnchange: {
        width: '80%',
        margin: '0 auto',
        "& .MuiOutlinedInput-input":{
            fontSize: '2rem',
            fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',      
            padding: '0',
            fontWeight: 'bold',
        },
        "& .MuiOutlinedInput-notchedOutline":{
            display: 'none'
        }
    },

    clear: {
        Width: '1.5em', 
        height: '100%',
        fontSize: '1.5rem', 
        color: '#7b7b7b', 
        cursor: 'pointer'
    }
}));

const titleStyle = {
    margin: '0 1rem',
    textAlign: 'start', 
    fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif', 
    fontSize: '2rem'
}

export { ContentStyles, titleStyle }