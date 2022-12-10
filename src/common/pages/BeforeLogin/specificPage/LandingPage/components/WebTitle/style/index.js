import { makeStyles } from "@material-ui/core/styles";
import img from "../../../../../../../img/tomato-basil-dish.png";

const WebTitle = makeStyles((theme) => ({
    title: {
        width: '100%', 
        height: '90vh',
        padding: '2rem 4rem', 
        position: 'relative', 
        margin: '0 !important',
        backgroundColor: `#e7e7e7`,
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
        backgroundSize: '80vh 80vh',
        [theme.breakpoints.up('_500')]: {
            height: '30rem',
            background: 'linear-gradient(#e7e7e7 55%, white 0)',
            padding: '2rem 4rem',
        }
    },

    cover: {
        width: '100%', 
        height: '80vh',
        padding: '2rem 4rem', 
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: '1000',
        top: '0',
        left: '0',
        [theme.breakpoints.up('_500')]: {
            height: '35rem',
        }
    },

    wrapper: {
        fontSize: '1rem',
        width: '100%'
    },

    container: {
        width: '90%',
        height: 'fit-content',
        position: 'absolute',
        zIndex: '1',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        margin: 'auto',
        [theme.breakpoints.up('_800')]: {
            maxWidth: '1500px',
            width: '70%',
            left: '0',
        },
    },

    backgroundImg: {
        width: '450px',
        height: '450px',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '50% 50%',
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        position: 'absolute',
        top: '-5rem',
        right: '0rem',
        zIndex: '-1',
        [theme.breakpoints.up('_720')]: {
            left: '0',
            transform: 'translateX(0)',
            marginRight: '0',
            marginLeft: 'auto',
        },
        [theme.breakpoints.up('_800')]: {
            top: '-2.5rem',
        },
        [theme.breakpoints.up('_2000')]: {
            top: '-2.5rem',
            right: '-10rem',
            zIndex: '-1',
        }
    },

    searchBarCard: {
        padding: ".6rem 1.5rem",
        margin: "1rem 0",
        borderRadius: '0',
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        width: '100%',
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        [theme.breakpoints.up('_2000')]: {
            width: '90%'
        }
    },

    bar: {
        width: '100%',
        margin: '.3rem 0',
        backgroundColor: '#f6f6f6',
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                border: '0px',
            },
            borderRadius: '0',
            boxSizing: 'content-box',
            "&.Mui-focused fieldset": {
                border: '0px'
            }
        },
        "& .MuiOutlinedInput-input": {
            padding: '.75rem .5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
        },
        [theme.breakpoints.up('_300')]:{
            "& .MuiOutlinedInput-input": {
                padding: '.6rem 0.25rem',
                fontSize: '1rem',
                lineHeight: '1.5rem',
                fontWeight: '100',
            }
        }
    },

    button: {
        padding: '.5rem 1.5rem',
        backgroundColor: '#ff7d33',
        borderRadius: '0',
        "&:hover": {
            backgroundColor: '#ff782b',
        }
    },

    buttonBlock: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'fixed',
        top: '4.5rem',
        right: '1rem',
        zIndex: '1000',
    },

    linkButton: {
        color: '#4e4646',
        margin: '0  0 10px 0',
        padding: '2.5px 0',
        textTransform: 'none',
        border: '1.5px solid #4e4646',
        opacity: 0,
        transform: 'translateX(100%)',
        transition: 'transform .5s, oapcity .25s',
        backgroundColor: '#ffa50069',
        "&:hover":{
            backgroundColor: '#ffa500b3',
            color: 'white'
        }
    },

    loginButton: {
        width: '2.5rem',
        height: '2.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        border: '1.5px solid #3e3e3e',
        cursor: 'pointer',
        transition: 'border .25s',
        "& .MuiSvgIcon-root":{
            color: '#3e3e3e',
            transform: 'rotate(-180deg)',
            transition: 'transform .5s, color .25s',
        },
        "&:hover":{
            border: '1.5px solid orange',
            backgroundColor: '#ffffff8f',
            "& .MuiSvgIcon-root":{
                transform: 'rotate(0deg)',
                color: 'orange',
            },
        }
    },
  
    loginButtonClick: {
        border: '1.5px solid orange',
        backgroundColor: '#ffffff8f',
        "& .MuiSvgIcon-root":{
            transform: 'rotate(0deg)',
            color: 'orange',
        },
    },
}))

const Title = makeStyles((theme) => ({
    title: {
        fontSize: '4rem',
        lineHeight: 1.25,
        fontFamily: 'Georgia',
        fontWeight: '600',
    },

    subtitle: {
        fontSize: '1.2rem',
        fontFamily: 'Arial Narrow',
        color: '#666666'
    },
}))

const ResponsiveTitle = makeStyles((theme) => ({
    title: {
        display: 'block',
        margin: '5px 0',
        fontSize: '4vh',
        lineHeight: 1.25,
        fontFamily: 'Georgia',
        fontWeight: '600',
        textAlign: 'center',
        color: 'orange',
        [theme.breakpoints.up('_500')]:{
            fontSize: '5vh'
        }
    },

    subtitle: {
        display: 'block',
        fontSize: '.8rem', 
        fontFamily: 'Arial Narrow',
        color: '#666666',
        textAlign: 'center',
        [theme.breakpoints.up('_300')]: {
            fontSize: '.9rem', 
        }
    },
}))

export {
    WebTitle,
    Title,
    ResponsiveTitle
}