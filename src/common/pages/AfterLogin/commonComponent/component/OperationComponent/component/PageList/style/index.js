import { makeStyles } from "@material-ui/core";

const PageList = makeStyles((theme) => ({
    root: {
        textAlign: 'start',
        padding: '.75rem 0',
        height: '45%',
        position: 'relative',
        maxHeight: '300px',
        margin: '.5rem 0 0 0',
    },

    text: {
        padding: '0rem 1rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#ff721b'
    },

    button: {
        justifyContent: 'flex-start',
        width: '100%',
        padding: '.3rem 0 .3rem 1rem',
        fontSize: '.9rem !important',
        textTransform: 'none !important',
        color: '#541e00',
        "& p": { 
            fontFamily: 'Trebuchet MS !important',
            fontWeight: 'bold', //body.style.overflow
        },
        "&:hover": {
            backgroundColor: 'grey',
            "& p": {
                color: 'white'
            }
        }
    },

    KeyboardDoubleArrowDown: {
        position: 'absolute', 
        right: '0', 
        left: '0',
        bottom: '.15rem', 
        margin: 'auto', 
        color: 'white',
        backgroundColor: 'orange',
        borderRadius: '50%',
        animation: `$DoubleArrowDown 3000ms infinite`,
    },

    "@keyframes DoubleArrowDown": {
        "0%": {
          transform: "translateY(25%)"
        },
        "50%": {
          transform: "translateY(50%)"
        },
        "100%": {
            transform: "translateY(25%)"
        }
    },
}))

export { PageList }