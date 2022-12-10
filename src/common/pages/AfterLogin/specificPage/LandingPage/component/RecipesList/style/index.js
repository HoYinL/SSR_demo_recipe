import { makeStyles } from "@material-ui/core";

const Post = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginBottom: '1rem',
        width: '90%', 
        maxWidth:'800px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)', 
        borderRadius: '1rem',
        padding: '0rem !important',
        [theme.breakpoints.up('_2000')]:{
            maxWidth: '1500px',
        }
    },

    filterList: {
        padding: '0', 
        display: 'flex', 
        flexWrap: 'wrap',
        width: '90%',
        margin: '1rem auto',
        [theme.breakpoints.up('_420')]:{
            padding: '1rem 5rem 0 5rem', 
            width: '100%',
            margin: '0',
        }
    },

    formCard:{ 
        cursor: 'pointer',
        padding: '.5rem 1rem', 
        fontSize: '1rem', 
        fontFamily: 'Arial', 
        minWidth: '75px',
        textAlign: 'center',
        boxShadow: '0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 1px 0px rgb(0 0 0 / 44%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
    },

    formCardNotClicked:{
        color: 'black',
        borderBottomLeftRadius: '0', 
        borderBottomRightRadius: '0',
        border: '1px solid #e4e4e4ed'
    },

    formCardClicked:{ 
        color: 'orange',
        borderBottomLeftRadius: '0', 
        borderBottomRightRadius: '0'
    },

    formContainer: {
        display: 'flex', 
        justifyContent: 'center',
        maxWidth: '200px',
        position: 'relative',
        margin: 'auto',
        "&::after":{
            position: 'absolute',
            content: "''",
            display: 'block',
            width: '100%',
            height: '3px',
            bottom: '-3px',
            backgroundColor: 'white',
        }
    }
}))

export { Post }