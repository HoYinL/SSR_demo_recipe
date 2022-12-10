import { makeStyles } from "@material-ui/core/styles";

const InputTypeListStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: '0 !important',
        position: 'absolute',
        left: '100%',
        zIndex:'1',
    },

    List: {
        cursor: 'pointer',
        opacity: '0',
        transform: 'translateY(100%)',
        transition: 'opacity .35s, transform .35s',
        border: '1px solid black',
        borderRadius: '50%',
        padding: '8px',
        minWidth: '2rem',
        textAlign: 'center',
        margin: '0 0 0 0.5rem',
        zIndex: '50',
        backgroundColor: 'white',
        "&:hover": {
            "&::before":{
                color: 'orange'
            },
            border: '1px solid orange'
        },
    },

    ListParent: {
        cursor: 'pointer',
        opacity: '0',
        transform: 'translateY(100%)',
        transition: 'opacity .35s, transform .35s',
        border: '1px solid black',
        borderRadius: '50%',
        padding: '8px',
        minWidth: '2rem',
        textAlign: 'center',
        margin: '0 0 0 0.5rem',
        zIndex: '50',
        backgroundColor: 'white',
    },

    subtleType: {
        width: '2rem',
        height: '2rem',
        lineHeight: '2rem !important',
        border: '1px solid black',
        borderRadius: '50%',
        backgroundColor: 'white'
    },

    hover: {
        "&::before":{
            color: 'orange'
        },
        border: '1px solid orange'
    },
}))

export { InputTypeListStyles }