import { makeStyles } from "@material-ui/styles";

const ModifierStyles = makeStyles((theme) => ({
    root: {
        width: '100%', 
        minHeight: '200px', 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        border: '1.5px dashed orange',
        position: 'revert',
        padding: '0 .5rem',
    },

    wrappedImgBlock: {
        minWidth: '100% !important',
        height: 'auto', 
        display: 'flex',
        padding: '1rem',
        position: 'relative'
    },

    resizingImgField: {
        maxWidth: 'auto', 
        minWidth: '0 !important', 
        display: 'flex',
        padding: '1rem',
    },

    nonWrappedImgBlock: {
        maxWidth: '200px', 
        minWidth: '200px', 
        display: 'flex',
        padding: '1rem 0',
        position: 'relative'
    },

    imgParent: {
        width: '100%', 
        height: '100%', 
        display: 'flex',
        position: 'relative',
    },

    imgComponent: {
        width: '100%', 
        height: 'auto',
        margin: 'auto',
        maxHeight: '500px'
    },

    imgModifierText: {
        color: 'orange',
        fontFamily: 'Times', 
        cursor: 'pointer',
        "&:hover":{
            color: 'black'
        }
    },

    verticalDividingLine: {
        position: 'relative',
        width: '1.5px', 
        background: 'repeating-linear-gradient(to bottom, orange 0,orange 5px,transparent 5px,transparent 7px)'
    },

    flexController: {
        width: '.5rem',
        height: '.5rem',
        backgroundColor: 'white',
        border: '1px solid black',
        cursor: 'ew-resize',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)'
    },

    horizontalDividingLine: {
        height: '1.5px', 
        width: '100%',
        background: 'repeating-linear-gradient(to right, orange 0,orange 5px,transparent 5px,transparent 7px)'
    },

    wrappedContentField: {
        width: '72.5%', 
        minWidth: '350px',
    },

    resizingContentField: {
        padding: '1rem', 
        width: '72.5%', 
        minWidth: '0px !important'
    },

    nonWrappedContentField: {
        minWidth: '100% !important', 
        padding: '1rem',
    },

    heightAuto: {
        height: 'auto !important',
    },

    minWidth: {
        minWidth: '100% !important'
    },

    minWidthZero: {
        minWidth: '0 !important'
    }

}));

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
    ModifierStyles, 
    ListStylesObj, 
    ulStylesObj, 
    TextStylesObj, 
    QuotesStylesObj 
}