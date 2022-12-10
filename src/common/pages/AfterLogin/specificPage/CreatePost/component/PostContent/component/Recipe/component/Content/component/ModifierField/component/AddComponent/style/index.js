import { makeStyles } from "@material-ui/core/styles";

const AddStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        zIndex: '250',
        position: 'relative',
        justifyContent: 'space-between',
        margin: '0 0 auto 0',
        "& .MuiSvgIcon-root":{
            color: '#969696',
            cursor: 'pointer'
        }
    },

    clear: {
        top: '50%',
        margin: 'auto',
        cursor: 'pointer',
        padding: '2.5px',
        fontSize: '2rem',
        right: '2.5%',
        borderRadius: '50%',
        background: 'white',
        zIndex: '250',
        position: 'relative',
        "&:hover":{
            color: 'orange',
        }
    },
}))

export { AddStyle }