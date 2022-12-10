import { makeStyles } from "@material-ui/core/styles";

const Info = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, minmax(100px, 350px))',
        justifyContent: 'center',
        padding: '0', 
        margin: '2.5rem 0',
        position: 'relative',
        [theme.breakpoints.up('_380')]: {
            gridTemplateColumns: 'repeat(3, minmax(100px, 350px))',
        },
        [theme.breakpoints.up('_600')]: {
            justifyContent: 'space-between',
            padding: '0 4rem',
            margin: '4.5rem auto',
            maxWidth: '1500px'
        },
    },

    cover: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: '1000',
        backgroundColor: 'white'
    },

    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '6rem',
        boxShadow: 'none',
        backgroundColor: 'rgb(0, 0, 0, 0)',
        [theme.breakpoints.up('_600')]: {
            height: '9rem',
        },
    },
    
    data: {
        fontSize: '1.75rem',
        fontWeight: '600',
        color: '#EE4025',
        [theme.breakpoints.up('_600')]: {
            fontSize: '2.5rem',
        },
    }

}))

export { Info }