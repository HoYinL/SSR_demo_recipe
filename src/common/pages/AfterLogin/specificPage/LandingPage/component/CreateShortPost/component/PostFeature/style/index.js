import { makeStyles } from "@material-ui/core";

const PostFeatureStyles = makeStyles((theme) => ({
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

    featureBlock: {
        display: 'flex',
        flexFlow: 'column'
    },

    button: {
        textTransform: 'initial',
        backgroundColor: 'darkorange',
        color: 'white',
        padding: '.25rem 1rem',
        borderRadius: '28px',
        margin: '1rem 0 1rem auto',
        "&:hover": {
            backgroundColor: "orange"
        }
    },
}));

export default PostFeatureStyles