import { makeStyles } from "@material-ui/core";

const Footer = makeStyles((theme) => ({
    root: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '1.5rem',
        width: '100%', 
        minHeight: 'auto',
        backgroundColor: 'black',
        zIndex: '1', 
        position: 'absolute',
        bottom: '0',
        "& .MuiListItem-root":{
            width: '7rem',
            padding: '.5rem 0',
            justifyContent: 'center',
            "& .MuiTypography-root":{
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'Trebuchet MS',
            }
        }
    },

    copyright: {
        padding: '1.5rem 0',
        display: 'flex',
        flexDirection: 'column',
        "& .MuiTypography-root":{
            padding: '.5rem 0 0 0',
            display: 'inline-block',
            margin: 'auto',
            fontSize: '.8rem'
        }
    }
}))

export { Footer }