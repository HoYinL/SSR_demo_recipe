import { makeStyles } from "@material-ui/styles";

const SearchImgStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        borderBottom: '1px solid grey',
        padding: '0 .5rem',
        "& .MuiOutlinedInput-input":{
            fontSize: '1.25rem',
            fontFamily: 'revert',      
            padding: '0rem',
            lineHeight: '2rem'
        },
        "& .MuiOutlinedInput-root":{
            paddingLeft: '0',
            paddingRight: '0',
        },
        "& .MuiOutlinedInput-notchedOutline":{
            display: 'none'
        },
        "& .MuiSvgIcon-root":{
            height: '100%',
        },
        [theme.breakpoints.down("_360")]:{
            margin: '1rem .75rem',
        }
    },

    avoidClicks: {
        pointerEvents: 'none !important',
    }
}))

export { SearchImgStyles }