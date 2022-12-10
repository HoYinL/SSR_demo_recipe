import { makeStyles } from "@material-ui/core";

const InsertDeleteIconStyles = makeStyles((theme) => ({
    add: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#B7B7B7', 
        fontSize: '2rem',
        transform: 'rotate(-45deg)',
        transition: 'transform .25s',
        borderRadius: '50%',
        border: '1px solid #B7B7B7',
        padding: '2.5px',
    },

    cross: {
        padding: '2.5px',
        position: 'relative',
        top: '50%',
        cursor: 'pointer',
        transform: 'translateY(-50%)',
        fontSize: '2rem',
        color: '#5B5B5B !important',
        transform: 'rotate(0deg)',
        transition: 'transform .25s',
        border: '1px solid #5B5B5B',
        borderRadius: '50%',
    },
}))

export { InsertDeleteIconStyles }