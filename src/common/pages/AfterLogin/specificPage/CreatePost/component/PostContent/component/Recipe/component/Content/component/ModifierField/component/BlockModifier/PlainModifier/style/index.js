import { makeStyles } from "@material-ui/styles";

const InputTextStyles = makeStyles((theme) => ({
    root: {
        padding: '1rem',
        "& .MuiOutlinedInput-input":{
            fontSize: '1.75rem',
            fontFamily: 'Times New Roman',      
            padding: '0rem',
            lineHeight: '2rem'
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
    },
}));

const ListStylesObj = {
    font: {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        fontFamily: 'Times'
    }
};

const ulStylesObj = {
    textAlign: 'left', 
    fontFamily: 'Times', 
    textDecoration: 'underline',
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
};

const TextStylesObj = {
    font: {
        textAlign: 'initial', 
        fontFamily: 'Time', 
        fontSize: '1.25rem', 
        lineHeight: '1.5rem', 
        wordBreak: 'break-word',
        margin: '.5rem 1rem',
    }
};

const QuotesStylesObj = {
    root: {
        display: 'flex', 
        backgroundColor: '#ffe4c470',
        margin: '.5rem 1rem',
    },

    alignLine: {
        width: '3px', 
        backgroundColor: 'black', 
        margin: '0 1rem 0 0'
    },

    font: {
        maxWidth: '100%',
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        fontFamily: 'Times',
        wordBreak: 'break-word',
        textAlign: 'initial',
        fontStyle: 'italic',
        padding: '.25rem'
    }
};

export { 
    InputTextStyles,
    ListStylesObj, 
    ulStylesObj, 
    TextStylesObj, 
    QuotesStylesObj 
}