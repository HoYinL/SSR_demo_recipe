import { makeStyles } from "@material-ui/core/styles";

const AltTextStyles = makeStyles((theme) => ({
    root: {
        right: '0',
        padding: '4rem 0 0 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        opacity: '.9',
        position: 'fixed',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: '150',
        maxWidth: 'none',
    },

    root2: {
        left: '0',
        padding: '4rem 0 0 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '1',
        position: 'fixed',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: '200',
        maxWidth: 'none',
    },

    InputBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '45rem',
        height: '25rem',
        transform: 'perspective(200px) translateZ(-500px) translateY(250px)',
        transition: 'transform .5s',
        "& .MuiTypography-root":{
            textAlign: 'center'
        },
        "& .MuiTextField-root":{
            width: '80% !important',
            padding: '0 1rem !important',
            margin: '0 auto',
            borderLeft: '1px solid grey',
            "& .MuiOutlinedInput-input":{
                textAlign: 'left !important',
            }
        },
    },

    button: {
        "& .MuiButton-root":{
            textTransform: 'none',
            padding: '.5rem 1rem',
            borderRadius: '1.2rem',
            margin: '0 10px',
            "&:hover":{
                backgroundColor: 'rgb(0, 0, 0, 0)'
            }
        },
        "& .MuiTypography-root": {
            fontSize: '.8rem'
        }
    },

    cancelButton: {
        border: '1px solid grey',
        "& .MuiTypography-root": {
            color: 'grey'
        },
        "&:hover":{
            "& .MuiTypography-root": {
                color: 'black'
            },
            border: '1px solid black'
        }
    }
}))

export { AltTextStyles }