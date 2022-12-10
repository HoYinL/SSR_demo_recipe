import { makeStyles } from "@material-ui/core";

const FilterBlock = makeStyles((theme) => ({
    root: {
        padding: '1.5rem 0 0 0',
        width: '80%',
        margin: '0 auto',
        [theme.breakpoints.up('_480')]:{
            padding: '2.5rem 0 0 3rem',
            margin: '0',
            width: '50%',
        },
    },

    filterBlock: {
        display: 'flex',
        cursor: 'pointer',
        padding: '.5rem 1rem', 
        width: '100%', 
        margin: 'auto',
        backgroundColor: '#F2F2F2',
        borderRadius: '24px',
        transition: 'background-color .25s',
        [theme.breakpoints.up('_420')]:{
            width: '100%', 
            margin: '0',
        },
        "& .MuiTypography-root":{
            color: 'grey'
        },
        "&:hover":{
            backgroundColor: '#D4D4D4',
        },
        "& .MuiSvgIcon-root":{
            margin: '0 .5rem 0 0'
        }
    },
}))

export { FilterBlock }