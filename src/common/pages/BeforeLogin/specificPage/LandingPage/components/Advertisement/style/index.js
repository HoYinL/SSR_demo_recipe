import { makeStyles } from "@material-ui/core/styles";
import circleLine from "../../../../../../../img/whiteline2.png";
import cooking from "../../../../../../../img/cooking.png";

const Advertisement = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '20rem',
        margin: '5rem 0',
        position: 'relative',
        opacity: '0',
        transition: 'opacity .5s',
    },

    cover: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '1000',
        backgroundColor: 'white',
        top: '0',
        left: '0'
    },

    root: {
        height: '17.5rem',
        width: '80%',
        maxWidth: '1000px',
        padding: '2rem',
        borderRadius: '0',
        position: 'relative',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        backgroundColor: '#e1cfa3',
        backgroundImage: `url(${cooking}), url(${circleLine})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `280px 100%, 100% 100%`,
        backgroundPosition: 'left bottom, right',
        backgroundAttachment: 'fixed',
    },

    titleBox: {
        width: '100%',
        top: '50%',
        padding: '.6rem .9rem',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        borderRadius: '.3rem',
        backgroundColor: 'white',
        boxShadow: "0 8px 40px -12px rgba(0, 0, 0, 0.5)",
        [theme.breakpoints.up('_440')]: {
            left: '0',
            marginLeft: 'auto',
            marginRight: '0',
            transform: 'translateX(0) translateY(-50%)',
        },
        [theme.breakpoints.up('_580')]: {
            width: '70%',
            padding: '0',
            background: 'none',
            boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)",
        },
        [theme.breakpoints.up('_700')]: {
            width: '60%',
            transform: 'translateX(-25%) translateY(-50%)',
        },
        [theme.breakpoints.up('_920')]: {
            width: '50%',
        }
    },

    title: {
        display: 'inline-block',
        width: '100%',
        fontSize: '.85rem',
        lineHeight: '1rem',
        fontFamily: 'Georgia',
        fontWeight: 'bold',
        textAlign: 'center',
        [theme.breakpoints.up('_380')]: {
            fontSize: '1.25rem',
            lineHeight: '1.5rem',
        },
        [theme.breakpoints.up('_580')]: {
            fontSize: '1.5rem',
            lineHeight: '1.75rem',
            textAlign: 'start',
        },
        [theme.breakpoints.up('_740')]: {
            fontSize: '2rem',
            lineHeight: '2.25rem',
        },
    },

    button: {
        display: 'block',
        borderRadius: '0',
        margin: '1rem 0',
        padding: '.3rem .4rem',
        backgroundColor: '#7a532c',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        "&:hover": {
            backgroundColor: '#502800',
        },
        [theme.breakpoints.up('_400')]: {
            padding: '.6rem .8rem',
        },
        [theme.breakpoints.up('_580')]: {
            left: '0',
            transform: 'translateX(0)',
        }
    },

    buttonText: {
        fontSize: '.5rem',
        lineHeight: '1.25rem',
        fontWeight: 'bold',
        color: 'white',
        [theme.breakpoints.up('_400')]: {
            fontSize: '.8rem',
            lineHeight: '1.5rem',
        },
    },

    reveal: {
        opacity: '1 !important',
    }
}))

export { Advertisement }