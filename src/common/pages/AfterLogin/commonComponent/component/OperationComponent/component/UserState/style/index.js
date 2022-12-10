import { makeStyles } from "@material-ui/core";

const UserState = makeStyles((theme) => ({
    root: {
        width: '100%', 
        padding: '0 .75rem',
        margin: '1rem 0'
    },

    stateBox: {
        cursor: 'pointer',
        display: 'flex', 
        padding: '.25rem 0',
        "& p": {
            fontSize: '.9rem'
        },
        "&:hover": {
            "& p": {
                color: '#322E2E',
            },
            "& .MuiSvgIcon-root": {
                color: '#322E2E',
            }
        }
    },

    icon: {
        color: '#f76600', 
        verticalAlign: 'bottom'
    },

    text: {
        color: '#ff721b', 
        padding: '0 .25rem', 
        fontFamily: "Trebuchet MS", 
        fontSize: '.9rem', 
        lineHeight: '1.5rem', 
        fontWeight: 'bold',
    }
}))

export { UserState }