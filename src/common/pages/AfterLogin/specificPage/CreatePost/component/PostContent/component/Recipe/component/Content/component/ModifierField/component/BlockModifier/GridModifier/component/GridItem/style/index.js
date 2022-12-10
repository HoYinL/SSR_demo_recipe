import { makeStyles } from "@material-ui/styles";

const GridBlockStyle = makeStyles((theme) => ({
    root: {
        border: '2px dashed orange', 
        padding: '1rem', 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
    },

    cover: {
        cursor: 'pointer',
        "&:hover":{
            "&::before":{
                backgroundColor: '#ffffff7d',
                content: '"Swap"',
            }
        },
        "&::before":{
            top: '0',
            left: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            content: '""',
            fontSize: '1.5rem',
            color: '#ffcc00',
            position: 'absolute',
            fontFamily: 'Arial',
            width: '100%',
            height: '100%',
            zIndex: '100',
            backgroundColor: '#9797973d',
            transition: 'background-color .25s',
        }
    },

    icon: {
        margin: '0 0 0 auto',
        padding: '2.5px',
        position: 'relative',
        top: '50%',
        cursor: 'pointer',
        transform: 'translateY(-50%)',
        fontSize: '1.75rem',
        color: '#5B5B5B !important',
        transform: 'rotate(0deg)',
        transition: 'transform .25s',
        border: '1px solid #5B5B5B',
        borderRadius: '50%',
        "&:hover":{
            color: 'orange !important',
            border: '1px solid orange',
        }
    },

    addBlockIcon: {
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%) translateX(-100%)',
        cursor: 'pointer',
        color: 'grey', 
        "&:hover":{
            color: 'orange !important',
        }
    }
}));

export { GridBlockStyle }