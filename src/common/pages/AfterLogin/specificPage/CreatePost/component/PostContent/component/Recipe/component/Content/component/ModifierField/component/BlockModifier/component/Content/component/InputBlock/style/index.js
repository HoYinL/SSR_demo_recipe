import { makeStyles } from "@material-ui/core";

const FlexInputTextStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        "& .MuiOutlinedInput-input":{
            fontSize: '1.25rem',
            fontFamily: 'Times New Roman',      
            lineHeight: '1.5rem',
            padding: '.25rem 1rem'
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
    },

    inputQuotes: {
        fontStyle: 'italic',
    },

    authorName: {
        width: ''
    },
}));

const PlainInputTextStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '.25rem 0',
        "& .MuiOutlinedInput-input":{
            fontSize: '1.25rem',
            fontFamily: 'Times New Roman',      
            padding: '0 .25rem',
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
    },

    inputQuotes: {
        fontStyle: 'italic',
        padding: '.25rem 0'
    },

    authorName: {
        width: ''
    }
}));

const IconTextStyles = makeStyles((theme) => ({
    root:{
        color: '#969696',
        cursor: 'pointer',
        "&:hover":{
            color: 'orange'
        }
    }
}));


const InputContentStyles = {
    modifier: {
        padding: '.25rem',
        display:"flex", 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '.5rem', 
        top: '0',
        right: '0',
        margin: 'auto', 
        opacity: '.85', 
        position: "absolute", 
        width: 'auto', 
        height: 'auto',
    }
};

export {  FlexInputTextStyles, PlainInputTextStyles, InputContentStyles, IconTextStyles }