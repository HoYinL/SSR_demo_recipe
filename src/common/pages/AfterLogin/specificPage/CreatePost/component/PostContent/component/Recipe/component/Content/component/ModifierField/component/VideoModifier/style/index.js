import { makeStyles } from "@material-ui/styles";

const VideoModifierStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: '20',
        width: '100%',
        maxWidth: '100%', 
        margin: 'auto',
        "& .MuiTextField-root": {
            width: '50%',
            margin: '.5rem 0',
            "& .MuiOutlinedInput-input":{
                padding: '0',
                textAlign: 'center',
                color: 'grey !important',
                fontSize: '.85rem',
            },
            "& .MuiOutlinedInput-root":{
                "& .MuiOutlinedInput-notchedOutline":{
                    border: 'none'
                },
                "&.Mui-focused":{
                    "& .MuiOutlinedInput-notchedOutline":{
                        border: 'none'
                    }
                }
            }
        },
    },
}));

export { VideoModifierStyles }