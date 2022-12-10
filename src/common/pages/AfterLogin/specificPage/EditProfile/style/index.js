import { makeStyles } from "@material-ui/core";
import backgroundImage from "../../../../../img/PostCreateBackgroundImg.jpg";

const EditProfilePage = makeStyles((theme) => ({
    root: {
        display: 'flex',
        boxSizing: 'content-box',
        minHeight: typeof window != "undefined"? `${window.innerHeight}px`: '1000px',
        position: 'relative',
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: '2rem 0 0 0',
    },

    editForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        width: '100%',
        maxWidth: '350px',
        minWidth: '250px',
        borderRadius: '0.5rem',
        backgroundColor: '#ffffff94',
        position: 'relative',
        margin: 'auto',
        "& .MuiTextField-root":{
            width: '90%'
        },
        "& .MuiFilledInput-root":{
            backgroundColor: '#cfcfcf',
            "&::after":{
                borderBottom: '2px solid #000000'
            }
        },
        "& .MuiFilledInput-input":{
            padding: '.5rem 1rem',
            backgroundColor: '#ffffff7d',
            borderTopLeftRadius: '.25rem',
            color: '#707070',
            "&:focus": {
                color: 'black',
            }
        }
    },

    warningTextField: {
        "& .MuiFilledInput-input":{
            backgroundColor: '#e8e8e8'
        },
        "& .MuiFilledInput-root":{
            backgroundColor: 'rgb(255 64 64 / 29%)',
            "&::before":{
                borderBottom: '2px solid red !important'
            },
            "&::after":{
                borderBottom: '2px solid red !important'
            }
        },
        "&:hover": {
            "& .MuiFilledInput-root":{
                "&::before":{
                    borderBottom: '2px solid red !important'
                },
                "&::after":{
                    borderBottom: '2px solid red !important'
                }
            },
        }
    },

    button: {
        backgroundColor: 'black',
        padding: '.5rem .75rem',
        margin: '.5rem 0 0 0',
        "&:hover":{
            backgroundColor: '#171616b8', 
            "& .MuiTypography-root":{
                color: 'orange'
            }
        },
        "& .MuiTypography-root":{
            transition: 'color .25s',
            color: 'white',
            fontSize: '.85rem',
        }
    },

    helperText: {
        width: '85%'
    },

    warningText: {
        width: '85%',
        color: 'red'
    },

    warning: {
        width: '85%',
        color: 'red'
    },

    uploadButton: {
        display: 'inline-block',
        backgroundColor: "#e0e0e0",
        padding: '.25rem .5rem !important',
        textAlign: 'center',
        margin: '0 0 0 auto',
        border: '1px solid black',
        textTransform: 'none',
        "& .MuiTypography-root":{
            fontSize: '.8rem',
            fontWeight: '100'
        }
    },

    iconImgBox: {
        position: 'relative', 
        cursor: 'pointer',
        margin: '2.5%',
    },
}))

export { EditProfilePage }