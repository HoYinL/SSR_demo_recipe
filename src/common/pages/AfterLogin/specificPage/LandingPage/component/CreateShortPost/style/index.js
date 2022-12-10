import { makeStyles } from "@material-ui/core";

const CreatePost = makeStyles((theme) => ({
    root: {
        width: '96%', 
        margin: '2rem auto', 
        padding: '1rem 0', 
        backgroundColor: '#e4e4e4', 
        borderRadius: '10px',
        maxWidth: '1250px',
        [theme.breakpoints.up("_420")]:{
            width: '75%', 
        },
        [theme.breakpoints.up("_840")]:{
            width: '50%',
            maxWidth: '750px', 
        }
    },

    textBox: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '0 0 .5rem 0',
        borderBottom: "1px solid white",
        "& .MuiFormControl-root": {
            width: '85%',
            cursor: 'pointer',
        },
        "& .MuiSvgIcon-root":{
            color: '#c1c1c1'
        },
        "& .MuiAvatar-root":{
            margin: '0 0 0 .5rem'
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: '28px',
            margin: '0 .25rem',
            "& .MuiOutlinedInput-notchedOutline":{
                backgroundColor: 'white',
            },
            "&.Mui-focused .MuiOutlinedInput-input":{
                color: '#444444',
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: 'rgb(0, 0, 0, 0)',
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: 'rgb(0, 0, 0, 0)',
            },
            "& .MuiOutlinedInput-input": {
                padding: '.5rem',
                fontSize: '1rem',
                textAlign: 'center',
                cursor: 'text',
                [theme.breakpoints.up("_420")]:{
                    padding: '8px 0 8px 28px',
                    fontSize: '1.2rem',
                    textAlign: 'left',
                },
                color: '#444444',
                fontFamily: 'Trebuchet MS',
                zIndex: '2'
            }
        },
        [theme.breakpoints.up("_420")]:{
            margin: '0 1rem',
        }
    },

    textButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '.5rem 1rem 0 1rem',
        "& .MuiButton-root": {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '200px',
            [theme.breakpoints.up("_420")]:{
                margin: '0 .5rem',
            },
            "&.Mui-focused":{
                background: 'white',
            },
            "& p": {
                color: '#777777',
                fontFamily: 'Trebuchet MS',
            },
            "& .MuiSvgIcon-root":{
                color: '#777777',
                margin: '0',
                [theme.breakpoints.up("_420")]:{
                    margin: '0 .5rem 0 0',
                }
            },
            "&:active":{
                backgroundColor: 'rbg(0, 0, 0, 0)'
            },
            "&:hover": {
                backgroundColor: "rgb(0, 0, 0, 0)",
                "& p":{
                    color: 'white'
                },
                "& .MuiSvgIcon-root":{
                    color: 'orange',
                }
            },
            [theme.breakpoints.up("_420")]:{
                "&:hover": {
                    backgroundColor: "#AEAEAE",
                    "& p":{
                        color: 'white'
                    },
                    "& .MuiSvgIcon-root":{
                        color: 'orange',
                    }
                },
            },
        }
    }
}))

export { CreatePost }