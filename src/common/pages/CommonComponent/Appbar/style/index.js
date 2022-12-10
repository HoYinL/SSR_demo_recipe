import { makeStyles } from "@material-ui/core/styles";

const Appbar = makeStyles((theme) => ({
    '@global': {
        '*':{
            boxSizing: 'border-box'
        },
        '*::-webkit-scrollbar': {
          width: '0.1rem',
          color: 'grey',
          backgroundColor: 'rgb(0, 0, 0, 0)',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0, 0, 0, 0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        'iframe':{
            aspectRatio: '16 / 9',
            maxWidth: '100%',
            margin: 'auto',
        },
        "a":{
            color: 'black',
        }
    },

    appbar: {
        position: 'fixed',
        zIndex: '10000',
        backgroundColor: "#322E2E",
        minHeight: '4rem',
    },

    toolbar: {
        justifyContent: 'center',
        margin: 'auto 0',
        [theme.breakpoints.up('_360')]: {
            justifyContent: 'space-between'
        }
    },

    logo: {
        height: 50,
        width: 175,
    },

    link: {
        textDecoration: 'none',
        color: 'white',
        fontFamily: 'Arial'
    },

    box: {
        paddingLeft: '16px',
        "& a": {
            fontFamily: 'Trebuchet MS',
        }
    },

    userInfoText: {
        color: 'white',
        fontSize: '14px'
    },

    button: {
        textTransform: 'initial',
        backgroundColor: 'darkorange',
        color: 'white',
        padding: '.25rem 1rem',
        borderRadius: '28px',
        "&:hover": {
            backgroundColor: "orange"
        }
    },

    commentedPrompt: {
        padding: '.5rem', 
        width: '50%', 
        minWidth: '250px', 
        position: 'fixed',
        zIndex: '200', 
        top: '5rem', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        borderRadius: '4px', 
        background: 'black',
        "& .MuiTypography-root":{
            color: 'white', 
            textAlign: 'center', 
            fontFamily: 'Times'
        }
    },
}));

const DocumentOverflow = makeStyles((theme) => ({
    overflowX: {
        overflowX: 'hidden'
    },

    auto: {
        overflowY: 'auto'
    },

    hidden: {
        overflowY: 'hidden'
    }
}));

export { Appbar, DocumentOverflow }