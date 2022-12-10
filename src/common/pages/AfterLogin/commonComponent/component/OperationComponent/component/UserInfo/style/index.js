import { makeStyles } from "@material-ui/core";

const UserInfo = makeStyles((theme) => ({
    root: {
        width: '90%',
        height: 'auto',
        minHeight: '180px',
        padding: '.5rem 0',
        position: 'relative',
        backgroundColor: 'white',
        margin: '.5rem 0 0 0',
    },

    avatar: {
        width: '3rem',
        height: '3rem',
        margin: 'auto',
    },

    description: {
        textAlign: 'center',
        boxShadow : 'none',
        padding: '.5rem 0',
        "& .MuiTypography-root": {
            padding: '.2rem 0',
            fontSize: '.9rem',
            lineHeight: '1rem',
            overflow: 'hidden',
            lineBreak: 'anywhere',
            padding: '.25rem .75rem',
        }
    }
}))

export { UserInfo }