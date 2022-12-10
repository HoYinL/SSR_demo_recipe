import { makeStyles } from "@material-ui/core";

const CommentBlockStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        background: '#c9c9c9a6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '2000'
    },

    commentBlock: {
        minWidth: '240px',
        width: '50%',
        minHeight: '60px',
        backgroundColor: 'white',
        padding: '1.5rem',
        margin: 'auto',
        backgroundColor: '#fcfcfcd9',
        borderRadius: '8px',
        border: '1px solid #b1b1b1',
        display: 'flex',
        flexFlow: 'column',
        "& .react-emoji":{
            position: 'unset'
        },
        "& .react-emoji-picker--wrapper":{
            height: '250px',
            width: '100%',
            transform: 'translateY(125%)',
            overflow: 'auto',
        },
        "& .react-emoji-picker--container":{
            top: 'unset',
            right: 'unset',
            width: '100%'
        },
        "& .flex-middle": {
            display: 'none'
        }
    },

    dividingLine: {
        width: '100%', 
        height: '2px', 
        borderRadius: '4px', 
        background: '#80808066',
        margin: '.5rem 0',
    },

    button: {
        textTransform: 'initial',
        backgroundColor: 'darkorange',
        color: 'white',
        padding: '.25rem 1rem',
        borderRadius: '28px',
        width: 'fit-content',
        margin: '0 0 0 auto',
        "&:hover": {
            backgroundColor: "orange"
        }
    }
}));

export { CommentBlockStyles }