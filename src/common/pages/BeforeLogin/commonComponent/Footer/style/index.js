import { makeStyles } from "@material-ui/core/styles";
import logo from "../../../../../../common/img/logo.png"

const Footer = makeStyles((theme) => ({
    block: {
        position: 'absolute',
        bottom: '0',
    },

    root: {
        gridAutoRows: 'auto',
        gridAutoFlow: 'row',
        boxShadow: 'none',
        [theme.breakpoints.up('_700')]: {
            backgroundColor: '#fdf4e8',
        }
    },

    appPaper: {
        left: '50%',
        borderRadius: '0',
        backgroundColor: '#fdf4e8',
        [theme.breakpoints.up('_700')]: {
            justifyContent: 'flex-start',
            backgroundColor: 'rgb(0, 0, 0, 0)',
            boxShadow: 'none',
        }
    },

    paper: {
        borderRadius: '0',
        backgroundColor: '#f9f9f9',
        [theme.breakpoints.up('_700')]: {
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }
    },

    logo: {
        height: '4rem',
        width: '15rem',
        position: 'relative',
        backgroundImage: `url(${logo})`,
        backgroundSize: '100% 100%',
        margin: 'auto',
        [theme.breakpoints.up('_700')]:{
            margin: '0',
            transform: 'translateX(0)',
        }
    },

    appDiscription: {
        padding: '1rem',
        fontSize: '.8rem',
        lineHeight: '1.2rem',
        textAlign: 'center',
        [theme.breakpoints.up('_380')]: {
            lineHeight: '1.3rem',
        },
        [theme.breakpoints.up('_700')]: {
            fontSize: '.9rem',
            lineHeight: '1.75rem',
            textAlign: 'start',
        }
    },

    appLink: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 1rem 0 0',
        justifyContent: 'space-around',
        width: '100%',
        padding: '0 1rem',
        [theme.breakpoints.up('_380')]:{
            flexDirection: 'row',
        },
        [theme.breakpoints.up('_700')]:{
            justifyContent: 'flex-start'
        },
    },

    appBradge: {
        display: 'block', 
        height: '2.75rem',
        width: '70%', 
        position: 'relative',
        margin: 'auto',
        marginTop: '1rem',
        backgroundRepeat: `no-repeat`,
        backgroundSize: '100% 100%',
        [theme.breakpoints.up('_300')]:{
            width: '60%', 
        },
        [theme.breakpoints.up('_340')]:{
            height: '3rem',
            width: '55%',  
            left: '0',
            transform: 'translateX(0)',
        },
        [theme.breakpoints.up('_340')]:{
            height: '3rem',
            width: '150px', 
        },
        [theme.breakpoints.up('_700')]: {
            margin: '.5rem 1rem .5rem 0',
        }
    },

    infoListTitle: {
        fontSize: '1rem',
        lineHeight: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        [theme.breakpoints.up('_700')]: {
            lineHeight: '4rem',
            textAlign: 'start',
            textIndent: '10%',
        }
    },

    infoList: {
        border: '0',
        display: 'block',
        textAlign: 'center',
        boxShadow: 'none',
        backgroundColor: 'rgb(0, 0, 0, 0)',
        "& p": {
            fontSize: '.8rem',
            lineHeight: '2rem',
        },
        [theme.breakpoints.up('_700')]: {
            display: 'inline-block',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'start',
            "& p": {
                fontSize: '.85rem',
                lineHeight: '3rem',
            },
        }
    },

    infoDiscoveryList: {
        border: '0',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        boxShadow: 'none',
        backgroundColor: 'rgb(0, 0, 0, 0)',
        position: 'relative',
        width: '100%',
        "& p": {
            fontSize: '.8rem',
            lineHeight: '2rem',
            padding: '0 .5rem',
            textAlign: 'start',
        },
        [theme.breakpoints.up('_400')]: {
            display: 'inline-block',
            position: 'relative',
            "& p": {
                textAlign: 'center',
            }
        },
        [theme.breakpoints.up('_700')]: {
            "& p": {
                fontSize: '.85rem',
                lineHeight: '3rem',
                textAlign: 'start',
                width: '50%',
                margin: 'auto'
            },
        }
    },

    bottomNav: {
        padding: '1rem 0 0 0',
        margin: 'auto',
        width: '100%',
        boxSizing: 'content-box',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 0, 0, 0)',
        "& .MuiSvgIcon-root": {
            color: 'black',
            backgroundColor: 'rgb(0, 0, 0, 0)',
        },
        "& .MuiButtonBase-root": {
            backgroundColor: 'white',
            borderRadius: '50%',
            "&.MuiBottomNavigationAction-root": {
                minWidth: '30px',
                maxWidth: '30px',
                width: '30px',
                height: '30px',
                transition: 'background-color .25s',
                [theme.breakpoints.up('_600')]: {
                    minWidth: '35px',
                    maxWidth: '35px',
                    width: '35px',
                    height: '35px',
                    "& .MuiSvgIcon-root": {
                        fontSize: '1.5rem',
                    }
                },
                "&:hover": {
                    backgroundColor: 'orange',
                    "& .MuiSvgIcon-root": {
                        color: 'white',
                        fontSize: '1.25rem',
                    }
                },
            }
        },
        [theme.breakpoints.up('_600')]: {
            justifyContent: 'space-around',
        },
        [theme.breakpoints.up('_460')]: {
            width: '75%',
        },
        [theme.breakpoints.up('_700')]: {
            width: '50%',
        }
    },

    copyrightBox: {
        padding: '1rem 0',
        overflow: 'hidden',
        [theme.breakpoints.up('_600')]: {
            padding: '2rem 0'
        }
    },

    webName: {
        display: 'block',
        fontSize: '1.25rem',
        lineHeight: '2rem',
        letterSpacing: '.075rem',
        fontWeight: '600',
        textAlign: 'center',
        color: '#ff7600',
    },

    copyright: {
        display: 'block',
        fontSize: '.8rem',
        lineHeight: '1.6rem',
        textAlign: 'center',
        color: '#bfbfbf',
    }
}))

export { Footer }