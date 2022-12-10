import { makeStyles } from "@material-ui/styles";

const PreviewStyle = makeStyles((theme) => ({
    root: {
        width: '100%', 
        minHeight: '60px', 
        backgroundColor: '#616161',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        "& .MuiSvgIcon-root":{
            color: 'white',
            width: '2rem',
            height: '100%',
            margin: 'auto .5rem auto auto',
        },
        "& .MuiTypography-root":{
            lineHeight: '40px',
            color: 'white'
        },
        "@global": {
            "*::-webkit-scrollbar": {
                display: 'none',
            },
            "*::-webkit-scrollbar-track": {
                display: 'none',
            },
            "*::-webkit-scrollbar-thumb": {
                display: 'none',
            }
          }
    }, 

    box: {
        display: 'flex', 
        margin: 'auto 1.5rem auto auto', 
        cursor: 'pointer',
        "&:hover":{
            "& .MuiSvgIcon-root":{
                color: 'orange',
            },
            "& .MuiTypography-root":{
                color: 'orange'
            }
        },
    },

    controllerBlock: {
        width: '.5rem',
        height: '.5rem',
        backgroundColor: 'white',
        border: '1px solid black',
        position: 'absolute',
        top: '50%',
        cursor: 'ew-resize',
        zIndex: '2000',
        userSelect: 'none',
    },

    leftBlock: {
        left: '0px',
        transform: 'translateX(-50%) translateY(-50%)',
    },

    rightBlock: {
        right: '0px',
        transform: 'translateX(50%) translateY(-50%)',
    },

    previewContainer: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1d9',
        zIndex: '1000',
        padding: '5rem 4rem 2rem',
        userSelect: 'none',
    },

    previewBlock: {
        position: 'relative', 
        zIndex: '10', 
        maxHeight: '95%', 
        border: '2px dashed orange',
        padding: '0 !important',
        overflow: 'auto'
    }
}));

const previewBlock = {
    padding: '1rem .5rem',
    background: 'white',
    borderRadius: '8px',
    position: 'relative',
    height: '100%',
    overflow: 'auto'
}

export { PreviewStyle, previewBlock }