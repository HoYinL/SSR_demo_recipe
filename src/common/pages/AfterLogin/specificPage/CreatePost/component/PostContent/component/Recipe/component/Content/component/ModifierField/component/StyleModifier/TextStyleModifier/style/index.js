import { makeStyles } from "@mui/styles";

const TextStyleModifierStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        //position: 'absolute',
        position: 'relative',
        padding: '.25rem .75rem',
        backgroundColor: '#3a3a3a',
        zIndex: '125',
        borderRadius: '8px',
        width: 'auto',
        top: '0',
        "&::before":{
            content: "''",
            width: '0',
            height: '0',
            borderLeft: '.5rem solid transparent',
            borderRight: '.5rem solid transparent',
            borderTop: '.5rem solid #3a3a3a',
            display: 'inline-block',
            position: 'absolute',
            bottom: '-.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
        },
        "& .MuiSvgIcon-root":{
            color: 'white',
            margin: '0 .25rem',
            cursor: 'pointer',
            "&:hover":{
                color: 'orange'
            }
        },
        "& .MuiTextField-root":{
            width: '100% !important',
            margin: 'auto !important',
            "& .MuiOutlinedInput-input":{
                textAlign: 'start',
                color: 'white !important',
                fontFamily: 'ui-monospace !important',
                padding: '.25rem',
            },
            "& .MuiOutlinedInput-notchedOutline":{
                borderColor: 'rgb(0, 0, 0, 0) !important'
            }
        }
    },

    textBlock: {
        display: 'block', 
        margin: '0', 
        padding: '.25rem 1rem .25rem 0',
        minWidth: '100%', 
        textAlign: 'left', 
        outline: 'none', 
        padding: '0 .25rem', 
        lineBreak: 'anywhere'
    },

    text: {
        '&[contentEditable*="true"]': {
            cursor: 'text',
            position: 'relative',
            "&::before": {
                content: "attr(placeholder)",
                opacity: '0.6',
                position: 'absolute',
                color: '#686868',
            }
        },
    },

    caption: {
        '&[contentEditable*="true"]': {
            "&::before": {
                left: '50%',
                transform: 'translateX(-50%)',
            }
        }, 
    },
}));

export { TextStyleModifierStyles }