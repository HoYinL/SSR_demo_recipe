import { makeStyles } from "@material-ui/styles";

const TextStylesObj2 = {
    font: {
        textAlign: 'initial', 
        fontFamily: 'Time', 
        fontSize: '1rem', 
        lineHeight: '1.25rem', 
        wordBreak: 'break-word',
    }
};



const FloatBoxStyle = makeStyles((theme) => ({
    floatSetter: {
        display: 'flex', 
        backgroundColor: '#3a3a3a', 
        justifyContent: 'center', 
        borderRadius: '.5rem', 
        padding: '.5rem 0', 
        width: '175px',
        margin: '.5rem auto',
        position: 'relative',
        transform: 'translateY(-10px)',
        "&::before":{
            content: "''",
            width: '0',
            height: '0',
            borderLeft: '.5rem solid transparent',
            borderRight: '.5rem solid transparent',
            borderTop: '.5rem solid #3a3a3a',
            display: 'inline-block',
            position: 'absolute',
            bottom: '-.5rem',
            left: '50%',
            transform: 'translateX(-50%)'
        }
    },

    floatBlock: {
        border: '2px dashed orange', 
        position: 'revert', 
        maxWidth: '100% !important'
    },

    floatImgBlock: {
        position: 'relative', 
        zIndex: '20', 
        padding: '.5rem', 
        border: '2px dashed orange', 
        borderTop: 'none', 
        maxWidth: '100% !important',
    },

    floatTextBlock: {
        display: 'flex', 
        width: 'auto', 
        margin: '1rem'
    }
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
        margin: '1rem'
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

const InputTextStyles = makeStyles((theme) => ({
    root: {
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
}))

export { 
    InputTextStyles,
    TextStylesObj2, 
    FloatBoxStyle,
    ListStylesObj, 
    ulStylesObj, 
    TextStylesObj, 
    QuotesStylesObj  
}