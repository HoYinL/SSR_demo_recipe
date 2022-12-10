import { makeStyles } from "@material-ui/core/styles";

const FormStyle = makeStyles((theme) => ({
    button: {
        display: 'inline-block',
        width: '15%',
        backgroundColor: "#e0e0e0",
        padding: '0 !important',
        textAlign: 'center',
        border: '1px solid black',
        textTransform: 'none',
        "& .MuiTypography-root":{
            fontSize: '.8rem',
            fontWeight: '100'
        }
    },

    backgroundImgBox: {
        position: 'relative', 
        margin: '0 0 0 2.5%',
    },

    editBox: {
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        display: 'flex',
        backgroundColor: '#dcdcdc7a',
        opacity: '0',
        transition: 'opacity .25s',
        "&:hover":{
            opacity: '1',
        },
        "& .MuiTypography-root":{
            display: 'inline-block', 
            margin: 'auto', 
            fontSize: '1.25rem', 
            color: 'white',
            fontFamily: 'Arial',
            "& .MuiSvgIcon-root":{
                fontSize: '1.5rem',
                verticalAlign: 'middle',
                margin: '0 0 0 .2rem'
            }
        }
    }
}))

export { FormStyle }