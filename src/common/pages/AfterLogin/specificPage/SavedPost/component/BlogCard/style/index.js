import { makeStyles } from "@material-ui/core";

const CardStyles = makeStyles((theme) => ({
    root: {
        cursor: 'pointer', 
        display: 'flex', 
        alignItem: 'space-between', 
        margin: '0 2rem', 
        padding: '1rem', 
        borderBottom: '1px solid black', 
        borderRadius: '0', 
        boxShadow: 'none'
    },

    content: {
        minWidth: '75%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        padding: '0 1rem 0 0',
    },

    title: {
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        "WebkitLineClamp": '1', 
        display: "-webkit-box", 
        'WebkitBoxOrient': 'vertical',
        fontSize: '1.25rem', 
        fontWeight: '700'
    },
    
    text:{
        fontSize: '1rem', 
        fontFamily: 'Times',
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        "WebkitLineClamp": '2', 
        display: "-webkit-box", 
        'WebkitBoxOrient': 'vertical'
    },

    blogBackgroundBlock: {
        display: 'flex',
        justifyContent: 'flex-end',
        minWidth: '80px',
        height: '60px',
        margin: 'auto',
        display: 'none',
        [theme.breakpoints.up('_500')]:{
            minWidth: '140px',
            height: '120px',
            margin: '0 0 0 auto',
            display: 'flex',
        }
    },

    blogImg: {
        maxWidth: '80px',
        maxHeight: '60px',
        [theme.breakpoints.up('_420')]:{
            maxWidth: '140px',
            maxHeight: '120px',
        }
    },

    Icon: {
        "&:hover":{
            color: 'orange'
        }
    },

    promptBlock: {
        position: 'absolute', 
        padding: '.5rem 1rem', 
        transform: 'translateX(-50%)',
        left: '50%',
        "& .MuiTypography-root":{
            textAlign: 'center',
            padding: '.25rem',
            "&:hover":{
                color: 'black'
            }
        }
    },

    deletePrompt: {
        zIndex: '2000',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        background: '#ffffff82',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    deletePromptBlock: {
        width: '50%',
        height: '50%',
        minWidth: '250px',
        maxWidth: '650px',
        maxHeight: '750px',
        background: 'white',
        padding: '1rem', 
        display: 'flex',
        flexDirection: 'column',
        "& .MuiTypography-root":{
            textAlign: 'center',
            padding: '.25rem',
        },
        "& .MuiSvgIcon-root":{
            margin: '0 0 0 auto',
            color: 'grey',
            cursor: 'pointer',
            "&:hover":{
                color: 'orange'
            }
        }
    },

    PromptBlockTitle: {
        fontSize: '2rem',
        color: '#b00000'
    },

    PromptBlockText: {
        fontSize: '1rem',
        color: 'grey'
    },

    promptContent: {
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        padding: '2rem'
    },

    button: {
        display: 'flex',
        justifyContent: 'center',
        "& .MuiButton-root":{
            textTransform: 'none',
            padding: '0 1rem',
            borderRadius: '1.2rem',
            margin: '0 10px',
        },
        "& .MuiTypography-root": {
            fontSize: '1rem'
        }
    },

    cancelButton: {
        border: '1px solid grey',
        "& .MuiTypography-root": {
            color: 'grey'
        },
    },
}));

export {CardStyles}