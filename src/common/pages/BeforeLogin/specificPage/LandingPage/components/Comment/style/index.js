import { makeStyles } from "@material-ui/core/styles";
import blueLine from "../../../../../../../img/blackLine.jpg"

const Comment = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 0',
        boxSizing: 'border-box',
        textAlign: 'end',
        backgroundImage: `url(${blueLine})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '',
        position: 'relative',
        [theme.breakpoints.up('_400')]: {
            padding: '30px 60px',
        },
        [theme.breakpoints.up('_600')]: {
            backgroundSize: '100% 50%',
            padding: '30px',
        },
        [theme.breakpoints.up('_900')]: {
            backgroundSize: '100% 100%',
        },
    }, 

    cover:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '1000',
        backgroundImage: `url(${blueLine})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '',
        [theme.breakpoints.up('_300')]: {
            padding: '30px 60px',
        },
        [theme.breakpoints.up('_600')]: {
            backgroundSize: '100% 50%',
        },
        [theme.breakpoints.up('_900')]: {
            backgroundSize: '100% 100%',
        },
    },

    cover2:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '2',
        backgroundImage: `url(${blueLine})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '',
        [theme.breakpoints.up('_300')]: {
            padding: '30px 60px',
        },
        [theme.breakpoints.up('_600')]: {
            backgroundSize: '100% 50%',
        },
        [theme.breakpoints.up('_900')]: {
            backgroundSize: '100% 100%',
        },
    },

    buttonCover: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '1000',
        backgroundColor: 'white'
    },

    title: {
        display: 'inline-block',
        width: '100%',
        fontSize: '1.5rem',
        lineHeight: '2rem',
        fontFamily: 'Georgia',
        fontWeight: '900',
        textAlign: 'center',
        zIndex: '4',
        [theme.breakpoints.up('_400')]: {
            fontSize: '2rem',
            lineHeight: '2.5rem',
        },
        [theme.breakpoints.up('_600')]: {
            width: '60%',
        },
        [theme.breakpoints.up('_680')]: {
            fontSize: '2.5rem',
            lineHeight: '3rem',
            marginLeft: 'auto',
            marginRight: '0',
            textAlign: 'end',
        },
        [theme.breakpoints.up('_900')]: {
            fontSize: '3rem',
            lineHeight: '3.5rem',
        },
        [theme.breakpoints.up('_2500')]: {
            maxWidth: '1250px',
            margin: '0',
        }
    },

    subtitle: {
        padding: '0 20px',
        fontSize: '.85rem !important',
        color: '#4a4a4a !important',
        fontFamily: 'Arial !important',
        lineHeight: '1.25rem !important',
        fontWeight: '400 !important',
        width: '100%',
        zIndex: '4',
        [theme.breakpoints.up('_480')]: {
            fontSize: '1.25rem !important',
            lineHeight: '2.5rem !important',
            padding: '0'
        }
    },

    container: {
        width: '100%',
        height: '22rem',
        padding: '1.25rem',
        margin: '0',
        position: 'relative',
        overflowY: 'hidden',
        maxWidth: '1500px',
        [theme.breakpoints.up('_680')]: {
            margin: '3rem 0',
        },
    },

    info: {
        display: 'grid',
        height: '20rem',
        gridTemplateColumns: 'repeat(auto-fill, 250px)',
        gridAutoRows: 'auto',
        gridAutoFlow: 'row',
        justifyContent: 'center',
        gridGap: '5rem 4rem',
    },

    card: {
        display: 'flex',
        height: '17.5rem',
        padding: '10px 10px 25px 10px',
        borderRadius: '.6rem',
        position: 'relative',
        boxShadow: "0 4px 10px -3px rgba(0,0,0)",
        flexDirection: 'column',
    },

    button: {
        minWidth: '0',
        padding: '.9rem',
        margin: '.9rem',
        borderRadius: '0',
        backgroundColor: 'orange',
        position: 'relative',
        zIndex: '100',
        "&:hover": {
            backgroundColor: '#F59644',
        }
    },

    left: {
        left: '-50px',
        opacity: '0',
        transition: 'left .5s, opacity .25s'
    },

    right: {
        right: '-50px',
        opacity: '0',
        transition: 'right .5s, opacity .25s'
    },

    cardHeader: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px 16px 0 16px',
        "& .MuiCardHeader-content":{
            display: 'inline-block',
            height: 'auto',
        },
        "& .MuiAvatar-root":{
            width: '50px',
            height: '50px'
        },
        "& .MuiTypography-root":{
            textIndent: '.5rem',
            lineHeight: '2rem',
            fontWeight: 'bold'
        }
    },

    comment: {
        padding: '0 1.5rem',
        textAlign: 'start',
        "& .MuiTypography-root":{
            fontSize: '.8rem',
            lineHeight: '1.5rem',
        }
    },

    dots: {
        cursor: 'pointer',
        right: '1rem',
        bottom: '2.25%',
        position: 'absolute',
        verticalAlign: 'bottom',
        backgroundColor: 'white',
        width: '50px',
        "&:hover":{
            color: 'orange'
        }
    },

    commentBlock: {
        width: '100%',
        height: '100%',
        position: 'fixed', 
        top: '0',
        left: '0',
        backgroundColor: 'white',
        opacity: '.5',
        zIndex: '50'
    },

    wholeCommentBlock: {
        width:'25%', 
        height: '25%',
        minWidth: '250px',
        minHeight: '400px',
        maxWidth: '500px',
        maxHeight: '500px',
        position: 'fixed',
        top: '50%', 
        left: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        zIndex: '500',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        margin: '2rem 0 0 0'
    },

    commentContent: {
        width: '75%',
        textAlign: 'start',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        lineHeight: '1.5rem',
        overflowY: 'scroll',
        height: '70%',
        fontSize: '.85rem'
    },

    cardHeader2: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 16px 0 16px',
        "& .MuiCardHeader-content":{
            display: 'inline-block',
            height: 'auto',
        },
        "& .MuiAvatar-root":{
            width: '50px',
            height: '50px'
        },
        "& .MuiTypography-root":{
            lineHeight: '2rem',
            fontWeight: '600 !important'
        },
        "& .MuiCardHeader-avatar":{
            margin: '0 !important',
        }
    },

    cancelButton: {
        position: 'absolute',
        right: '.5rem',
        top: '.5rem',
        color: '#703e00',
        cursor: 'pointer',
        "&:hover":{
            color: 'orange'
        }
    },

    hide: {
        transition: 'opacity 0s',
        opacity: '0'
    },

    show: {
        transition: 'opacity .5s',
        opacity: '1'
    },

    displayNone: {
        display: 'none',
    },

    displayBlock: {
        display: 'block'
    }
}))

export { Comment }