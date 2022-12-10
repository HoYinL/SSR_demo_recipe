import { makeStyles } from "@material-ui/core/styles";

const ModifierStyle = makeStyles((theme) => ({
    root: {
        zIndex: '0 !important'
    },
    
    component: {
        position: 'relative'
    },

    block: {
        display: 'flex',
        flexDirection: 'column',
    },

    confirmedButton: {
        margin: '.75rem 0',
        backgroundColor: '#3a3a3a',
        color: '#ffa900 !important',
        transition: 'background-color .25s, color .5s',
        padding: '.5rem .75rem',
        "&:hover":{
            backgroundColor: 'black',
            color: 'white'
        }
    },
}));

export { ModifierStyle }