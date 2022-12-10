import { makeStyles } from "@material-ui/core";

const BlogStyles = makeStyles((theme) => ({
    subheaderRoot: {
        display: `flex`, 
        height: '1.5rem'
    },

    subheaderCreateTime: {
        lineHeight: '1.5rem', 
        fontSize: '.8rem !important', 
        fontWeight: '400 !important'
    },

    subheaderIcon: {
        lineHeight: '1.5rem', 
        margin: '0 0 0 .3rem', 
        width: ".8em !important", 
    },

    contentRoot: {
        display: 'flex' 
    },

    blogCard: {
        padding: '1rem', 
        margin: '2rem auto 0', 
        cursor: 'pointer',
        width: '96%',
        boxShadow: 'none',
        minHeight: '225px',
        "&::after":{
            content: '""',
            display: 'block',
            width: '100%',
            height: '1px',
            backgroundColor: '#c1c1c1',
            transform: 'translateY(10px)',
        }
    },

    blogHeader: {
        padding: '.5rem 1rem',
        '& .MuiCardHeader-content':{
            [theme.breakpoints.up('_420')]:{
                "& .MuiTypography-root":{
                    margin: '.25rem',
                },
                display: 'flex',
            },
            "& .MuiTypography-root":{
                lineHeight: '1.5rem',
                fontWeight: 'bold'
            }
        }
    },

    blogRoot: {
        display: 'flex',
    },

    blogContent: {
        display: 'flex',
        width: '80%',
        minWidth: '0',
        flexDirection: 'column',
    },

    blogContentText: {
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        maxWidth: '-webkit-fill-available',
    },

    blogTitle: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: '.9rem',
        textOverflow: 'ellipsis',
        display: "-webkit-box",
        "WebkitLineClamp": '1',
        'WebkitBoxOrient': 'vertical',
        lineBreak: 'anywhere',
        margin: '0 1rem',
        overflow: 'hidden'
    },

    blogDescriptionBlock: {
        maxHeight: '3rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        "WebkitLineClamp": '2',
        display: "-webkit-box",
        'WebkitBoxOrient': 'vertical',
        lineBreak: 'anywhere',
        margin: 'auto 1rem'
    },

    blogDescription: {
        fontSize: '.85rem',
        lineHeight: '1.25rem',
    },

    blogIcons: {
        margin: '0 1rem',
        textAlign: 'start',
        [theme.breakpoints.up('_500')]:{
            textAlign: 'end',
        },
        "& .fa":{
            fontSize: '1.25rem',
            margin: '0 .5rem 0 0',
            [theme.breakpoints.up('_500')]:{
                margin: '0 .75rem',
            }
        }
    },

    blogBackgroundBlock: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '120px',
        width: '120px',
        margin: 'auto',
    },

    blogImg: {
        minWidth: '120px',
        height: '120px',
    },

    tagList: {
        display: 'inline-block', 
        width: 'auto', 
        padding: '.05rem .75rem', 
        border: '1px solid orange', 
        borderRadius: '14px',
        backgroundColor: '#e6e6e6',
        color: 'black',
        margin: '.25rem',
        fontFamily: 'arial',
        fontSize: '.75rem'
    },
}));

export { BlogStyles }
