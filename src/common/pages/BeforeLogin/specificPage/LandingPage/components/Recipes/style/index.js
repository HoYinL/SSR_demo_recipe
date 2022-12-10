import { makeStyles } from "@material-ui/core/styles";

const Recipes = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: "#e7e7e7",
        textAlign: 'center',
        position: 'relative',
        padding: '2rem 0',
        [theme.breakpoints.up('_500')]: {
            padding: '3.5rem 2rem',
        }
    },

    cover: {
        position: 'absolute',
        height: '100%',
        width:'100%',
        top: '0',
        left: '0',
        backgroundColor: 'black',
        zIndex: '5'
    },

    title: {
        display: 'inline-block',
        fontSize: '1.5rem',
        lineHeight: '2rem',
        fontFamily: 'Georgia',
        fontWeight: '600',
        color: '#ffa500',
        padding: '0 1.5rem',
        [theme.breakpoints.up('_300')]: {
            fontSize: '2rem',
            lineHeight: '2.5rem',
        },
        [theme.breakpoints.up('_600')]: {
            fontSize: '2.5rem',
            lineHeight: '3rem',
            padding: '0rem',
        },
        [theme.breakpoints.up('_900')]: {
            fontSize: '3rem',
            lineHeight: '3.5rem',
        },
    },

    subtitle: {
        margin: '1.25rem 0',
        width: '100%',
        fontSize: '.9rem',
        lineHeight: '1.2rem',
        display: 'block',
        position: 'relative',
        display: 'inline-block',
        color: '#595858',
        padding: '0 1.5rem',
        [theme.breakpoints.up('_300')]: {
            fontSize: '1rem',
            lineHeight: '1.2rem',
        },
        [theme.breakpoints.up('_420')]: {
            width: '75%',
        },
        [theme.breakpoints.up('_800')]: {
            padding: '0rem',
            width: '50%',
        },
    },

    container: {
        width: '100%',
        position: 'relative',
        overflowY: 'hidden',
        maxWidth: '2400px',
        margin: '0 auto 0',
        [theme.breakpoints.up('_500')]: {
            margin: '40px auto 0',
        },
    },

    block: {
        display: 'flex',
        height: '32rem',
        width: '100%',
        margin: 'auto',
        overflowX: 'scroll',
        overflowY: 'hidden',
        flexWrap: 'nowrap',
        [theme.breakpoints.up('_2400')]: {
            maxWidth: '2600px',
        },
        [theme.breakpoints.up('_3000')]: {
            maxWidth: '2800px',
        },
    },

    boxParent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        transition: 'background-size .25s, box-shadow .25s, transform .25s',
        "&::before":{
            content: "''",
            position: 'absolute',
            bottom: '2.5%',
            transform: 'perspective(75px) rotateX(45deg) translateZ(10px)',
            transformOrigin: 'bottom',
            width: '180px',
            height: '10px',
            background: 'rgb(45 17 0 / 50%)',
            filter: 'blur(10px)'
        }
    },

    box: {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        minWidth: '200px',
        height: '22.5rem',
        padding: '5px 0',
        position: 'relative',
        backgroundSize: '100% 100%',
        boxShadow: 'inset 0 0 0px 0px #ffffffab',
        transition: 'background-size .25s, box-shadow .25s, transform .25s',
        backgroundPosition: 'center',
        "&:hover":{
            backgroundSize: '115% 115%', 
            boxShadow: 'inset 0 0 25px 10px #ffffffab',
        },
    },

    card: {
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'start',
        height: '40%',
        width: '96%',
        padding: '1rem',
        borderRadius: '0',
    },

    cardDish: {
        fontWeight: 'bold',
        fontSize: '1.1rem'
    },

    cardText: {
        color: '#595858',
        fontSize: '.9rem',
        lineHeight: '1.5rem',
        textIndent: '.6rem',
        display: 'flex',
        alignItems: 'center',
        textIndent: '4px'
    },

    cardAlarm: {
        height: '100%',
        width: '.9rem',
        fontSize: '.9rem',
        verticalAlign: 'bottom'
    },

    cardStar: {
        color: '#D8DF0A'
    },

    button: {
        padding: '1rem 1.5rem',
        backgroundColor: '#ff7d33',
        borderRadius: '0',
        "&:hover": {
            backgroundColor: '#ff782b',
        },
    },

    arrow: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '2.5rem',
        color: 'orange',
        zIndex: '100'
    },
    
    leftArrow: {
        left: '0',
    },

    rightArrow: {
        right: '0',
    },

    buttonText: {
        fontSize: '.6rem',
        fontWeight: '600',
        color: 'white'
    }
}))

export { Recipes }