import { makeStyles } from "@mui/styles"

const ListStyles = makeStyles((theme) => ({
    add: { 
        color: '#969696', 
        margin: 'auto',
        cursor: 'pointer',
        "&:hover":{
            color: 'orange'
        }
    },

    absolute: {
        position: 'absolute', 
        top: '0', 
        right: '0',
    }
}));

const ListStylesObj = {
    font: {
        fontSize: '1rem',
        lineHeight: '1.25rem',
        fontFamily: 'Times'
    }
}

const ulStylesObj = {
    textAlign: 'left', 
    fontFamily: 'Times', 
    textDecoration: 'underline',
    fontSize: '1rem',
    lineHeight: '1.25rem',
}

export { ListStylesObj, ulStylesObj, ListStyles  }