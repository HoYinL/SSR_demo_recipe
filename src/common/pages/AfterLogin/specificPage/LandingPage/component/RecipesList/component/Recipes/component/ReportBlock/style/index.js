import { makeStyles } from "@material-ui/core";

const ReportBlockStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        background: '#c9c9c9a6',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '2000',
        "& .MuiList-root":{
            maxHeight: '200px',
            overflow: 'auto',
        },
        "& .MuiTypography-root":{
            margin: '1rem 1rem 0',
            fontWeight: 'bold',
        },
        "& .MuiOutlinedInput-input":{
            padding: '.5rem',
        },
        "& .MuiOutlinedInput-root":{
            margin: '.5rem 1rem',
            padding: '0'
        },
        "& .Mui-focused":{
            "& .MuiOutlinedInput-notchedOutline":{
                borderColor: '#5b3b00',
            },
        }
    },

    reportBlock: {
        minWidth: '240px',
        width: '50%',
        minHeight: '60px',
        backgroundColor: 'white',
        padding: '1.5rem',
        margin: 'auto',
        backgroundColor: '#fcfcfcd9',
        borderRadius: '8px',
        border: '1px solid #b1b1b1',
        display: 'flex',
        flexFlow: 'column',
        padding: '0',
        "& .Mui-checked":{
            color: '#bd611b'
        }
    },

    dividingLine: {
        width: '100%', 
        height: '2px', 
        borderRadius: '4px', 
        background: '#80808066',
        margin: '.5rem 0',
    },

    button: {
        textTransform: 'initial',
        backgroundColor: 'darkorange',
        color: 'white',
        padding: '.25rem 1rem',
        borderRadius: '28px',
        width: 'fit-content',
        margin: '.5rem .5rem .5rem auto',
        "&:hover": {
            backgroundColor: "orange"
        }
    }
}));

export { ReportBlockStyles }