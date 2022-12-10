import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../../../../../../../../common/img/PostCreateBackgroundImg.jpg";

const FormStyle = makeStyles((theme) => ({
    root: {
        padding: '1rem 1.5rem',
        width: '90%',
        margin: '0 auto',
        "& .MuiTypography-root":{
            fontFamily: 'Trebuchet Ms',
            fontWeight: 'bold',
            padding: '.25rem 0',
        },
        "& .MuiFilledInput-input": {
            padding: '.25rem .5rem',
        },
        "& .MuiFilledInput-root": { 
            padding: '.25rem .5rem'
        },
        "& .MuiFormControl-root":{
            margin: '0 2.5% 1rem',
            width: '95%',
        },
        [theme.breakpoints.up("_420")]:{
            width: '400px',
        }
    },

    textfield: {
        "& ::after": {
            borderBottom: "2px solid #322E2E"
        },
        "& .Mui-focused":{
            color: 'black',
            fontSize: '16px'
        },
        "& .MuiFilledInput-input:focus":{
            color: 'black !important',
        },
        "& .Mui-focused:after": {
            borderBottom: "2px solid #322E2E"
        },
        margin: '8px'
    },

    backgroundImg: {
        padding: '2rem 0 2rem 0',
        width: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
    }
}))

export { FormStyle }