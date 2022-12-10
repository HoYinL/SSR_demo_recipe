import { makeStyles } from "@material-ui/core";

const QuotesStylesObj = {
    root: {
        display: 'flex', 
        backgroundColor: '#ffe4c470',
        margin: '.5rem 0',
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

const QuotesStyles = makeStyles((theme) => ({
    ...QuotesStylesObj
}));

export { QuotesStyles, QuotesStylesObj }