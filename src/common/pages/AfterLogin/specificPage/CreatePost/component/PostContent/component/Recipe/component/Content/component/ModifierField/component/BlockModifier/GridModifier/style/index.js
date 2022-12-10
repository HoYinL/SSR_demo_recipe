import { makeStyles } from "@material-ui/styles";

const GridBlockStyles = makeStyles((theme) => ({
    root: {
        padding: '.5rem', 
        width: '100%', 
        height: '100%',
        border: '2px dashed orange',
        display: 'grid',
        gridGap: '1.25rem',
        justifyContent: 'center'
    },

    addBlock: {
        padding: '1rem', 
        border: '2px dashed orange', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        cursor: 'pointer',
        "& .MuiSvgIcon-root":{
            color: 'grey'
        }
    },

    icon: {
        fontSize: '.75rem',
        display: 'flex',
        width: '2rem',
        height: '2rem',
        lineHeight: '2rem',
        padding: '0',
        margin: '0 .5rem 0 0',
        "&::before":{
            margin: 'auto',
        }
    },

    tick: {
        position: 'absolute',
        bottom: '.5rem',
        right: '0',
    },

    widthModifier: {
        display: 'flex', 
        flexDirection: 'column', 
        padding: '.5rem 1rem', 
        gap: '.5rem',
        backgroundColor: '#d3d3d3',
        borderRadius: '8px',
        margin: '1.5rem auto',
        width: 'fit-content',
        position: 'relative',
        "&::before":{
            content: "''",
            width: '0',
            height: '0',
            borderLeft: '.5rem solid transparent',
            borderRight: '.5rem solid transparent',
            borderTop: '.5rem solid #d3d3d3',
            display: 'inline-block',
            position: 'absolute',
            bottom: '-.5rem',
            left: '50%',
            transform: 'translateX(-50%)'
        }
    },

    slider: {
        "&::-webkit-appearance": 'none',
        height: '15px',
        borderRadius: '5px',  
        background: '#d3d3d3',
        outline: 'none',
        opacity: '0.7',
        '&::-webkit-transition': '.2s',
        transition: 'opacity .2s',
    },

    input: {
        display: 'flex', 
        margin: 'auto',
    }
}));

const gridBox = {
    padding: '.5rem 1rem', 
    width: '100%', 
    height: '100%',
    display: 'grid',
    gridGap: '1rem',
    justifyContent: 'center',
}

const GridInputStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        "& .MuiFormControl-root":{
            width: '100%',
        },
        "& .MuiOutlinedInput-input":{
            fontSize: '1rem',
            fontFamily: 'Times New Roman',      
            lineHeight: '1.25rem',
            padding: '.25rem 0'
        },
        "& .MuiOutlinedInput-root":{
            padding: '0'
        },
        "& .MuiOutlinedInput-notchedOutline":{
            display: 'none'
        },
    },
}));

const ListStylesObj = {
    font: {
        fontSize: '1rem',
        lineHeight: '1.25rem',
        fontFamily: 'Times'
    }
};

const ulStylesObj = {
    textAlign: 'left', 
    fontFamily: 'Times', 
    textDecoration: 'underline',
    fontSize: '1rem',
    lineHeight: '1.25rem',
};

const TextStylesObj = {
    font: {
        textAlign: 'initial', 
        fontFamily: 'Time', 
        fontSize: '1rem', 
        lineHeight: '1.25rem', 
        wordBreak: 'break-word',
        margin: '.5rem 0',
    }
};

const QuotesStylesObj = {
    root: {
        display: 'flex', 
        backgroundColor: '#ffe4c470',
        margin: '0 0 .5rem 0',
    },

    alignLine: {
        width: '3px', 
        backgroundColor: 'black', 
        margin: '0 1rem 0 0'
    },

    font: {
        maxWidth: '100%',
        fontSize: '1rem',
        lineHeight: '1.25rem',
        fontFamily: 'Times',
        wordBreak: 'break-word',
        textAlign: 'initial',
        fontStyle: 'italic',
        padding: '.25rem'
    }
};

export { 
    GridBlockStyles, 
    gridBox, 
    GridInputStyles,
    ListStylesObj, 
    ulStylesObj, 
    TextStylesObj, 
    QuotesStylesObj 
}