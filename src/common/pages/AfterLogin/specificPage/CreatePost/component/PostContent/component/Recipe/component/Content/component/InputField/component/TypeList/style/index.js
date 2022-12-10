import { makeStyles } from "@material-ui/core/styles";

const TypeListStyle = makeStyles((theme) => ({
    root: {
        minWidth: '2rem !important',
        padding: '0 !important',
        margin: '.5rem',
    },

    list: {
        display: 'flex',
        margin: 'auto',
        position: 'relative',
        minWidth: '2rem',
        justifyContent: 'flex-start',
    },
}))

export { TypeListStyle }