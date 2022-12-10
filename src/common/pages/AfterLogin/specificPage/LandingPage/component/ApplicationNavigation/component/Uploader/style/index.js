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
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '200'
    },

    uploadBlock: {
        padding: '1rem',
        borderRadius: '8px',
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        flexFlow: 'column'
    },

    uploaderBlock: {
        display: 'flex',
        gap: '1rem'
    },

    emptyReelsPreviewContainer: {
        maxWidth: '100%',
        height: '0px',
        width: '0px',
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

    button: {
        textTransform: 'initial',
        backgroundColor: 'darkorange',
        color: 'white',
        padding: '.25rem 1rem',
        borderRadius: '28px',
        margin: 'auto',
        "&:hover": {
            backgroundColor: "orange"
        }
    },

    cancel: {
        fontSize: '2rem',
        margin: '0 0 1rem auto',
        cursor: 'pointer',
        "&:hover": {
            color: 'orange'
        }
    },

    radio: {
        position: 'absolute',
        margin: '.75rem',
        color: 'red',
    },

    radioDisplay: {
        display: 'block'
    },

    radioHidden: {
        display: 'none'
    }
}));

export default VideoUploaderStyles