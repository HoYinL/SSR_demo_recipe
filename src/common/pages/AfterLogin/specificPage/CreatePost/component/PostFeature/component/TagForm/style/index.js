import { makeStyles } from "@material-ui/core/styles";

const TagList = makeStyles((theme) => ({
    tagForm: {
        cursor: 'pointer'
    },

    list:{
        padding: '0 0 .5rem 0', 
        display: 'flex', 
        justifyContent: 'flex-start', 
        flexWrap: 'wrap'
    },

    listItem: {
        display: 'flex',
        width: 'auto',
        padding: '.2rem .5rem', 
        margin: '.1rem .25rem',
        borderRadius: '24px', 
        border: '1px solid #e47100', 
        backgroundColor: '#e9e9e9',
        color: '#474747c9',
        fontSize: '.8rem',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        "& .MuiSvgIcon-root":{
            cursor: 'pointer',
            margin: '0 0 0 .4rem',
            width: '.8em',
            height: '.8em',
            fontSize: '1.25rem',
        },
        "& .MuiTypography-root":{
            padding: '0 0 0 0.5rem',
            fontSize: '.8rem'
        }
    }
}))

export { TagList }