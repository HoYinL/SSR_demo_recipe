import { makeStyles } from "@material-ui/core/styles";
import img from "../../../../img/lobster2.jpg";

const textfieldStyle = makeStyles(theme => ({
    root: {
      backgroundColor: "#E4E4E4",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      "& .MuiFilledInput-input": {
        backgroundColor: "#F2F2F2",
        borderTopLeftRadius: "4px",
        color: "#c9c9c9"
      },
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
    }
}));

const textfieldNormal = makeStyles(theme => ({
  root: {
    backgroundColor: "#E4E4E4",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    "& .MuiInputLabel-root":{
      color: 'black'
    },
    "& .MuiFilledInput-input": {
      backgroundColor: "#F2F2F2",
      borderTopLeftRadius: "4px",
      color: "#c9c9c9"
    },
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
  }
}));

const textfieldError = makeStyles(theme => ({
  root: {
    backgroundColor: "#f4acb7",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    "& .MuiFilledInput-input": {
      backgroundColor: "#F2F2F2",
      borderTopLeftRadius: "4px",
      color: "#c9c9c9"
    },
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
    margin: '8px',
    "& .MuiInputLabel-root":{
      color: 'red'
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
  }
}));

const componentStyle = makeStyles(theme => ({
    form: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      [theme.breakpoints.up('_2000')]: {
        width: '90%',
        height: '75%',
      },
      "& .MuiFormControl-root":{
        [theme.breakpoints.up('_2000')]: {
          width: '80%',
          margin: '0 auto'
        }
      }
    },

    background:{
        padding: "4rem 10px 0 10px",
        minHeight: typeof window != "undefined"? `${window.innerHeight}px`: '1000px',
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
    },

    card: {
      margin: '1rem 0',
      padding: '32px',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      display: 'flex',
      backgroundColor: 'rgba(216, 216, 216, 0.85)',
      [theme.breakpoints.up('_2000')]: {
        width: '25%',
        height: '25%',
      },
    },

    button: {
        marginTop: '8px', 
        marginBottom: '8px', 
        textAlign: 'center',  
        backgroundColor: "#322E2E",
        "&:hover": {
            backgroundColor: "#5E5E5E"
        }
    },

    link: {
        textDecoration: 'none', 
        color: '#322E2E',
        "&:hover": {
            color: "#ff721b"
        }
    },

    helperText: {
      fontSize: '8px',
      color: 'rgba(0, 0, 0, 0.65)',
      width: '80%',
    },

    warningText: {
      fontSize: '8px',
      marginBottom: '0px',
      color: 'red',
      width: '80%',
      maxWidth: '225px',
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

export {textfieldStyle, textfieldNormal, textfieldError, componentStyle}