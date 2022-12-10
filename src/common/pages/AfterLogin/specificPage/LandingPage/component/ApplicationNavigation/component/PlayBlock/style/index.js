import { makeStyles } from "@material-ui/core";

const VideoUploaderStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        backgroundColor: '#a9a9a9a8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '200'
    },

    uploadBlock: {
        padding: '1rem',
        borderRadius: '8px',
        position: 'relative',
        display: 'flex',
        flexFlow: 'column'
    },

    reelsPreviewContainer: {
        maxWidth: '100%',
        height: '400px',
        width: '250px',
        margin: '1rem auto',
        borderRadius: '.75rem',
        "& video": {
            objectFit: 'fill',
            width: '100%',
            //height: '-webkit-fill-available',
            height: 'inherit',
            borderRadius: '.75rem',
        }
    },

    cancel: {
        fontSize: '2rem',
        margin: '0 0 .5rem auto',
        cursor: 'pointer',
        "&:hover": {
            color: 'orange'
        }
    },

    changeVideo: {
        color: 'white',
        fontSize: '3rem',
        "&:hover": {
            color: 'orange'
        }
    },

    username: {
        display: 'inline-block', 
        flex: '0 0 auto !important',
        zIndex: '2',
        color: 'white',
        fontWeight: 'bold',
        lineHeight: '40px',
    },

    info: {
        position: 'absolute', 
        padding: '1rem', 
        display:'flex', 
        gap: '1rem',
        zIndex: '10',
    }
}));

export default VideoUploaderStyles