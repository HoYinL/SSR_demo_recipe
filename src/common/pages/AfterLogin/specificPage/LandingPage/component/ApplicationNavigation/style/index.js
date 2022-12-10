import { makeStyles } from "@material-ui/core";

const Navigation = makeStyles((theme) => ({
    root: {
        padding: '0 !important',
        margin: 'auto',
        width: "85%",
        maxWidth: '800px',
        height: '275px',
        borderRadius: '.5rem',
        [theme.breakpoints.up("_420")]:{
            width: "75%",
        },
        [theme.breakpoints.up("_2000")]:{
            maxWidth: "1000px",
        }
    },

    box: {
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        height: '50px',
        backgroundColor: '#322E2E',
        boxShadow: '0 0 0 rgb(0, 0, 0, 0)',
        "& p": {
            width: '150px',
            fontSize: '1rem',
            lineHeight: '50px',
            textAlign: 'center',
            color: 'white',
            fontFamily: 'Trebuchet MS',
            borderBottom: '3px solid white'
        }
    },

    Text: {
        display: 'inline-block', 
        flex: '0 0 auto !important',
        position: 'relative',
        zIndex: '2',
    },

    uploadVideo: {
        margin: '0 .4rem',
        borderRadius: '.75rem',
        maxWidth: '150px',
        minWidth: '150px',
        height: '200px',
        backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        padding: '0',
        backgroundSize: '100% 100% !important',
        backgroundPosition: 'center !important',
        "&:hover":{
            backgroundSize: '102.5% 102.5% !important',
        },
        "& .MuiAvatar-root": {
            margin: 'auto',
            backgroundColor: 'orange',
            border: '.25rem solid #6c6c6c',
        },
        "& .MuiTypography-root": {
            fontSize: '.85rem',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
        }
    },

    loadMore: {
        margin: '0 .4rem',
        borderRadius: '.75rem',
        maxWidth: '150px',
        minWidth: '150px',
        height: '200px',
        backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '0',
        backgroundSize: '100% 100% !important',
        backgroundPosition: 'center !important',
        "& .MuiTypography-root": {
            fontSize: '.85rem',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
        }
    },

    uploadBlock: {
        width: '100%',
        display: 'flex',
        flexFlow: 'column',
        height: '25%',
        justifyContent: 'end',
        background: '#6c6c6c',
        borderBottomRightRadius: '.75rem',
        borderBottomLeftRadius: '.75rem',
    },

    postList: {
        margin: '0 .4rem',
        borderRadius: '.75rem',
        maxWidth: '150px',
        minWidth: '150px',
        height: '200px',
        backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'grey',
        position: 'relative',
        cursor: 'pointer',
        "& .MuiAvatar-root": {
            margin: 'auto',
            backgroundColor: 'grey',
            border: '3px solid white'
        },
        "& .MuiTypography-root": {
            fontSize: '.85rem',
            fontWeight: 'bold',
            color: 'white'
        },
        "& video": {
            objectFit: 'fill',
            width: '100%',
            //height: '-webkit-fill-available',
            height: 'inherit',
            borderRadius: '.75rem',
            position: 'absolute',
            top: '0',
        }

    },

    list: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'scroll'
    }, 

    icon: {
        position: 'relative',
        zIndex: '2',
    },

    container: {
        padding: '0 2rem', 
        backgroundColor: '#e4e4e4', 
        display: 'flex',
        "& .MuiSvgIcon-root":{
            margin: 'auto',
            cursor: 'pointer',
            "&:hover":{
                color: 'orange'
            }
        }
    }
}))

export { Navigation }