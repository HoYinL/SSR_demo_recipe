import { makeStyles } from "@material-ui/core/styles";
import lineImg from "../../../../../../../img/textureLine.jpg";

const ContributerStyle = makeStyles((theme) => ({
    root: {
        padding: '.5rem',
        width: '100%',
        backgroundImage: `url(${lineImg})`,
        backgroundRepeat: 'no-repeat', 
        backgroundSize: '275% 100%',
        backgroundPosition: 'bottom',
        position: 'relative',
        [theme.breakpoints.up('_420')]: {
            padding: '0rem',
            backgroundSize: '200% 100%',
        },
        [theme.breakpoints.up('_720')]: {
            backgroundSize: '100% 100%',
        },
        textAlign: 'center',
    },

    title: {
        margin: '.5rem 0',
        fontSize: '1.5rem',
        lineHeight: '2rem',
        fontFamily: 'Georgia',
        fontWeight: '600',
        display: 'inline-block',
        [theme.breakpoints.up('_380')]: {
            fontSize: '2rem',
            lineHeight: '2.5rem',
        },
        [theme.breakpoints.up('_600')]: {
            fontSize: '1.5rem',
            margin: '2rem 0',
            fontSize: '2.5rem',
            lineHeight: '3rem',
        },
        [theme.breakpoints.up('_900')]: {
            fontSize: '3rem',
            lineHeight: '3.5rem',
        },
    },

    subtitle: {
        width: '100%',
        fontSize: '.85rem',
        lineHeight: '1rem',
        display: 'block',
        position: 'relative',
        display: 'inline-block',
        color: '#595858',
        padding: '0 1rem',
        [theme.breakpoints.up('_380')]: {
            fontSize: '.9rem',
            lineHeight: '1.2rem',
            width: '75%',
        },
        [theme.breakpoints.up('_480')]: {
            fontSize: '1rem',
            width: '65%',
        },
    },

    conatiner: {
        position: 'relative', 
        margin: 'auto',
        [theme.breakpoints.up('_2000')]: {
            maxWidth: '2000px',
        },
    },

    cover: {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        zIndex: '1000',
        backgroundColor: 'white',
        backgroundImage: `url(${lineImg})`,
        backgroundRepeat: 'no-repeat', 
        backgroundSize: '275% 100%',
        backgroundPosition: 'bottom',
        [theme.breakpoints.up('_420')]: {
            padding: '0rem',
            backgroundSize: '200% 100%',
        },
        [theme.breakpoints.up('_720')]: {
            backgroundSize: '100% 100%',
        },
    },

    contributer_list_container: {
        display: 'flex',
        overflowX: 'scroll', 
        width: '100%', 
        touchAction: 'none', 
    },

    info: {
        height: '26rem',
        minWidth: '100%',
        overflowY: 'hidden',
        display: 'grid',
        gridGap: '5rem',
        transition: 'bottom .25s, opacity .25s',
        gridTemplateColumns: 'repeat(1, 11.75rem)',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('_500')]: {
            gridTemplateColumns: 'repeat(2, 12rem)',
            gridGap: '6rem 2.5rem',
            padding: '2rem 0rem',
        },
        [theme.breakpoints.up('_740')]: {
            height: '26rem',
            gridTemplateColumns: 'repeat(3, 12rem)',
        },
        [theme.breakpoints.up('_1060')]: {
            padding: '2rem 5rem',
            gridTemplateColumns: 'repeat(4, minmax(12rem, 13rem))',
            gridGap: '4rem 5rem',
        },
        [theme.breakpoints.up('_1800')]: {
            gridTemplateColumns: 'repeat(5, minmax(12rem, 13rem))',
        },
        [theme.breakpoints.up('_2400')]: {
            gridTemplateColumns: 'repeat(6, minmax(12rem, 13rem))',
        },
    },

    hideProperty: {
        bottom: '-50px',
        opacity: '0',
    },

    showProperty: {
        bottom: '0px',
        opacity: '1',
    },

    box: {
        height: '17.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'blue',
        position: 'relative',
        backgroundSize: '100% 100%',
        boxShadow: "0 5px 20px 5px rgb(0 0 0 / 50%)",
        cursor: 'pointer',
        transition: 'transform .25s',
    },

    scale: {
        transform: 'scale(1) !important'
    },

    zoomScale: {
        transform: 'scale(1.1) !important',
    },

    card: {
        height: '30%',
        width: '100%',
        padding: '0 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        borderRadius: '0',
        boxShadow: "0 2px 40px -2px rgb(0 0 0 / 50%)",
        position: 'absolute',
        bottom: '0',
        left: '0',
        userSelect: 'none',
        [theme.breakpoints.up('_300')]: {
            width: '75%',
            bottom: '-5%',
            left: '50%',
            transform: 'translateX(-50%)'        
        },
        [theme.breakpoints.up('_900')]: {
            width: '75%',
            bottom: '-10%',
            left: '-10%',
            transform: 'translateX(0%)'        
        },
    },

    leftArrow: {
        cursor: 'pointer',
        height: '2rem',
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#322E2E',
        zIndex: '300',
        borderRadius: '50%',
        boxShadow: '0px 0px 10px orange',
        "&:hover":{
            color: 'orange',
            boxShadow: '0px 0px 10px white',
        },
        [theme.breakpoints.up('_480')]: {
            left: '2.5%',
        }
    },

    rightArrow: {
        cursor: 'pointer',
        height: '2rem',
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#322E2E',
        zIndex: '300',
        borderRadius: '50%',
        boxShadow: '0px 0px 10px orange',
        "&:hover":{
            color: 'orange',
            boxShadow: '0px 0px 10px white',
        },
        [theme.breakpoints.up('_480')]: {
            right: '2.5%',
        }
    }
}))

export { ContributerStyle }