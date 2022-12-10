import { makeStyles } from "@material-ui/core";

const SavedPostStyle = makeStyles((theme) => ({
    root: {
        minHeight: typeof window != "undefined"? `${window.innerHeight}px`: '1000px',
        position: 'relative',
    },

    savedPostContainer: {
        display: 'flex', 
        flexDirection: "column", 
        justifyContent: 'center', 
        maxWidth: '800px', 
        margin: 'auto', 
        minHeight: '200px',
    },

    editText: {
        margin: '1.25rem', 
        fontSize: '1.25rem', 
        fontFamily: 'monospace', 
        fontWeight: 'bold', 
        color: '#ff8500'
    },

    noEditText: {
        color: '#bdbdbd', 
        margin: '1.25rem', 
        fontSize: '1.25rem', 
        textAlign: 'center'
    },

    loader: {
        display: 'flex',
        gap: '1rem',
        fontSize: '1.5rem',
        fontFamily: 'monospace',
        justifyContent: 'center',
        padding: '1.5rem',
        lineHeight: '40px',
    },

    deletedPrompt: {
        position: 'fixed', 
        top: '6rem', 
        left: '50%', 
        transform: 'translateX(-50%)',
        width: '80%',
        padding: '1rem 2rem',
        backgroundColor: 'black',
        transition: 'oapcity 1s',
        display: 'flex',
        justifyContent: 'center',
        "& .MuiTypography-root": {
            color: 'white',
        },
    },

    button: {
        textTransform: 'initial',
        backgroundColor: 'darkorange',
        color: 'white',
        padding: '0 1rem',
        borderRadius: '28px',
        "&:hover": {
            backgroundColor: "orange"
        }
    },
}))

export { SavedPostStyle }