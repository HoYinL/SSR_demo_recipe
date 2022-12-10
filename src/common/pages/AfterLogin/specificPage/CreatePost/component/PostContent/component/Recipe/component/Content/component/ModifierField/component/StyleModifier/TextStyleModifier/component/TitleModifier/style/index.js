import { makeStyles } from "@mui/styles";

const HeaderStyleModifierStyles = makeStyles((theme) => ({
    root: {
        fontSize: '1.5rem',
        color: 'white',
        cursor: 'pointer',
        "&:hover":{
            color: 'orange'
        }
    },

    header: {
        lineHeight: '1.5rem',
        fontSize: '1.15rem',
        color: 'white',
        width: '1.5rem',
        "&:hover":{
            color: 'orange'
        }
    }
}));

export {HeaderStyleModifierStyles}
