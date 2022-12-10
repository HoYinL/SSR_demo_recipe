import { makeStyles } from "@material-ui/core";

const InsertTypeIconStyles = makeStyles((theme) => ({
    text: {
        display: 'flex',
        "& .MuiFormControl-root":{
            width: '100%',
        },
        "& .MuiOutlinedInput-input":{
            fontSize: '1.25rem',
            fontFamily: 'Times New Roman',      
            padding: '.25rem',
            lineHeight: '1.75rem'
        },
        "& .MuiOutlinedInput-root":{
            padding: '0'
        },
        "& .MuiOutlinedInput-notchedOutline":{
            display: 'none'
        },
    },

    add: {
        display: 'flex',
        width: '2rem',
        position: 'relative',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#B7B7B7', 
        fontSize: '2rem',
        transform: 'rotate(-45deg)',
        transition: 'transform .25s',
        border: '1px solid #B7B7B7',
        borderRadius: '50%',
        padding: '2.5px',
        margin: '0 .5rem'
    },

    cross: {
        display: 'flex',
        padding: '2.5px',
        position: 'relative',
        cursor: 'pointer',
        fontSize: '2rem',
        color: '#5B5B5B',
        transform: 'rotate(0deg)',
        transition: 'transform .25s',
        border: '1px solid #5B5B5B',
        borderRadius: '50%',
        margin: '0 .5rem 0 1rem'
    },

    type: {
        height: '2rem',
        lineHeight: '2rem',
        width: '2rem',
        fontSize: '.75rem',
        color: '#5B5B5B',
        margin: '0 .5rem .5rem 0',
        border: '1px solid #5B5B5B',
        borderRadius: '50%',
        cursor: 'pointer',
        "&:hover":{
            border: '1px solid orange',
            color: 'orange',
        }
    }
}));

const InsertIconStyle = makeStyles((theme) => ({
    root: {
        padding: '5px',
        "&:hover":{
            color: 'orange',
            border: '1px solid orange'
        },
        "&::before":{ margin: 'auto'}
    }
}));

export { InsertTypeIconStyles, InsertIconStyle }