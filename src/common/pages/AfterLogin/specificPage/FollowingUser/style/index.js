import { makeStyles } from "@material-ui/styles";

const FollowingUserStyles = makeStyles((theme) => ({
    userCard: {
        display: 'flex', 
        gap: '1.5rem', 
        padding: '1rem', 
        boxShadow: 'none', 
        borderRadius: '0', 
        borderBottom: '1px solid grey',
        margin: '0 2rem',
        cursor: 'pointer'
    },

    avatar: {
        width: '4rem', 
        height: '4rem', 
        margin: 'auto 0'
    },

    cardHeader: {
        padding: '0'
    },

    username: {
        color: 'black', 
        fontWeight: 'bold', 
        fontSize: '1.25rem'
    },

    editText: {
        color: '#ff8500',
        margin: '1.25rem',
        fontSize: '1.25rem',
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },

    descriptionBlock: {
        margin: '1rem .5rem'
    }
}));

export { FollowingUserStyles }