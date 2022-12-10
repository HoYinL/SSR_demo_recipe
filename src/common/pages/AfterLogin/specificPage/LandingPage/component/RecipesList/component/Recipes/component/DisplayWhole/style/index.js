import { makeStyles } from "@material-ui/core";

const WholeRecipeStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#64544a9c',
        opacity: '.8',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '1000'
    },

    recipeCard: {
        margin: '2rem 0',
        width: '240px',
        height: '450px',
        position: 'fixed',
        left: '50%',
        top: '50%',
        zIndex: '2000',
        transform: 'translateX(-50%) translateY(-50%)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        "& .MuiCardHeader-title":{
            fontWeight: 'bold',
        },
        [theme.breakpoints.up('_300')]:{
            width: '25%',
            minWidth: '290px',
            maxWidth: '350px'
        }
    },

    cardHeader: {
        width: '100%', 
        backgroundColor: '#ffffffd4'
    },

    wholeCardBody: {
        minHeight: '25%', 
        position: 'absolute', 
        bottom: '0'
    },

    description: {
        maxHeight: 'none', 
        position: 'relative',
        "& .MuiTypography-root": {
            fontSize: '.75rem', 
            padding: '0 .75rem'
        },
    },

    tagListContainer: {
        display: 'flex', 
        flexWrap: 'wrap', 
        padding: '.5rem 1rem', 
        justifyContent: 'center'
    },

    deleteIcon: {
        fontSize: '1.5rem',
        margin: '0 0 0 auto',
        color: 'grey',
        cursor: 'pointer',
        position: 'absolute',
        top: '.25rem',
        right: '.25rem',
        "&:hover": {
            color: 'orange'
        }
    }
}));

export { WholeRecipeStyles }