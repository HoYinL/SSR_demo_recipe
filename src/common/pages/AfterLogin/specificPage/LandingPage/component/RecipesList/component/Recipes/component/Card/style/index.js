import { makeStyles } from "@material-ui/core";

const CardStyles = makeStyles((theme) => ({
    card: {
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '300px', 
        maxWidth: '240px',
        minHeight: '400px', 
        borderRadius: '.5rem',  
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        margin: 'auto',
        transition: 'background-size .25s',
        "&:hover::before":{
            opacity: '1',
        },
        "&::before":{
            content: "''",
            width: '300px', 
            minHeight: '550px', 
            position: 'absolute',
            boxShadow: 'inset 0 0 25px 10px #ffffffab',
            transition: 'opacity .25s',
            opacity: '0',
        },
        [theme.breakpoints.up("_370")]:{
            width: '100%',
            maxWidth: 'none',
            minHeight: '500px', 
        },
        [theme.breakpoints.up("_420")]:{
            width: '300px',
            maxWidth: 'none',
            minHeight: '500px', 
        },
    },

    cardHeader: {
        display: 'flex', 
        borderBottom: '2px solid orange', 
        borderTopLeftRadius: '.5rem', 
        borderTopRightRadius: '.5rem', 
        backgroundColor: '#ffffffc7',
        position: 'relative',
        "& .MuiTypography-root":{
            fontWeight: 'bold'
        },
        "& .MuiCardHeader-root":{
            padding: '.5rem',
        },
        [theme.breakpoints.up("_420")]:{
            margin: '1rem', 
            "& .MuiCardHeader-root":{
                padding: '1rem',
            }, 
        }
    },

    cardDot: {
        cursor: 'pointer',
        margin: 'auto', 
        top: '50%', 
        transform: 'translateY(-50%)',
        backgroundColor: 'rgb(0, 0, 0, 0)',
        "&:hover": {
            backgroundColor: '#9d9d9d69',
        }
    },

    cardBody: {
        padding: '0 0 .8rem 0',
        margin: '0 auto', 
        width: '100%', 
        backgroundColor: '#ffffffe3',
        "& p":{
            margin: '0 1rem',
            lineBreak: 'anywhere',
            textAlign: 'center'
        }
    },

    description: {
        margin: '0 auto', 
        width: '100%', 
        borderBottomLeftRadius: '.5rem', 
        borderBottomRightRadius: '.5rem', 
        borderTop: 'none',
        padding: '1.5px',
        [theme.breakpoints.up("_380")]:{
            padding: '.25rem 0',
            margin: '0 auto', 
            width: '90%', 
            borderTop: 'none !important',
            border: '1.5px solid orange',  
        }
    },

    commentBox: {
        width: '90%',
        margin: '.5rem auto 0',
        "& .MuiFormControl-root":{
            width: '100%',
            "& .MuiOutlinedInput-root":{
                borderRadius: '24px',
            },
            "& .MuiOutlinedInput-input":{
                padding: '.5rem 1rem',
                color: 'black',
                cursor: 'text',
                zIndex: '2'
            },
            "& .MuiOutlinedInput-notchedOutline":{
                border: 'none',
                backgroundColor: '#d7d7d7ad'
            }
        }
    },

    
    buttonList: {
        display: 'flex', 
        justifyContent: 'center',
        margin: '0 1rem',
        padding: '3px 0',
        borderTop: '1px solid #aaaaaa',
        borderBottom: '1px solid #aaaaaa',
        "& .MuiButton-root":{
            margin: '0 .5rem',
            width: '8rem',
            "& p":{
                fontSize: '.7rem',
                fontWeight: 'bold',
                color: 'grey',
            },
            "&:hover":{
                backgroundColor: 'grey',
                "& p":{
                    color: 'white'
                },
                "& .MuiSvgIcon-root":{
                    color: 'orange'
                }
            },
            "& .MuiSvgIcon-root":{
                margin: '0 .2rem 0 0',
                color: 'grey'
            }
        }
    },

    emoji: {
        height: '2.5rem', 
        width: '100%', 
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Trebuchet MS',
        position: 'relative',
        "& .MuiSvgIcon-root":{
            verticalAlign: 'middle'
        }
    },

    dot: {
        position: 'relative', 
        left: '50%',
        transform: 'translateX(-50%)', 
        height: '0.75em', 
        bottom: '0',
        "&:hover":{
            color: 'orange'
        }
    },

    subheaderRoot: {
        display: `flex`, 
        height: '1.5rem'
    },

    subheadeCreateTime: {
        lineHeight: '1.5rem', 
        fontSize: '.8rem', 
        fontWeight: '400 !important'
    },

    subheaderIcon: {
        lineHeight: '1.5rem', 
        margin: '0 0 0 .3rem', 
        width: ".8em !important", 
    },

    avator: {
        position: 'relative',
        width: '20%',
        "& .MuiSvgIcon-root":{
            color: '#cf8600'
        }
    },

    descriptionBlock: {
        maxHeight: '2.25rem', 
        overflowY: 'hidden', 
        position: 'relative',
        "& .MuiTypography-root": {
            fontSize: '.75rem', 
            padding: '0 .75rem'
        },
    },

    dishName: {
        fontWeight: 'bold', 
        lineHeight: '1.75rem',
        color: '#e06e00',
        textOverflow: 'ellipsis',
        display: "-webkit-box",
        "WebkitLineClamp": '1',
        'WebkitBoxOrient': 'vertical',
        lineBreak: 'anywhere',
        margin: '0 1rem',
        overflow: 'hidden',
        textAlign: 'center',
        [theme.breakpoints.up("_380")]:{
            color: 'black'
        }
    }, 

    tagList: {
        display: 'inline-block', 
        width: 'auto', 
        padding: '.05rem .75rem', 
        border: '1px solid orange', 
        borderRadius: '14px',
        backgroundColor: '#e6e6e6',
        color: 'black',
        margin: '.25rem',
        fontFamily: 'arial',
        fontSize: '.75rem'
    },

    bookmarked: {
        color: 'black'
    }
}));

export { CardStyles } 
