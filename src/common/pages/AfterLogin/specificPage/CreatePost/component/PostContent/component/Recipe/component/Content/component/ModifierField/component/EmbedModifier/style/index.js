import { makeStyles } from "@material-ui/core/styles";

const EmbedModifierStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        margin: '2rem 0',
    },

    formatChoice: {
        borderRadius: '.5rem',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '-65px',
        transition: 'transform .25s',
        width: '100px',
        height: '3rem',
        backgroundColor: '#443a3a',
        zIndex: '2000',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        "& .MuiTypography-root":{
            color: 'white',
            lineHeight: '3rem',
        },
        "& .MuiSvgIcon-root":{
            color: 'white',
            fontSize: '1.75rem',
            margin: '0 7.5px',
            color: 'white',
            cursor: 'pointer',
            "&:hover":{
                color: 'orange'
            },
        },
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
            transform: 'translateX(-50%)'
        }
    },
}));

const embedStyles = {
    conatiner: {
        display: 'inline-flex', 
        justifyContent: 'center', 
        padding: '0' 
    },

    twitter: {
        margin: 'auto', 
        minWidth: '250px', 
        padding: '1rem 0'
    },

    youtube: {
        width: '100%', 
        position: 'relative', 
        padding: '0', 
        minHeight: '450px'
    },

    facebookConatiner: {
        width: '100%', 
        position: 'relative', 
        padding: '0', 
        minHeight: '450px'
    },

    facebookSkeleton:{
        position: 'absolute',
        width: '100%', 
        minHeight: '450px', 
        zIndex: '1000'
    }
}

const container = {
    cursor: 'pointer', 
    borderRadius: '0', 
    width: '90%', 
    maxWidth: '750px', 
    height: '150px', 
    display: 'flex', 
    justifyContent: 'space-between',
    margin: '1rem auto'
};

const content = {
    minWidth: '0', 
    padding: '.5rem 1.5rem', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-around', 
    textAlign: 'start'
};

const embedTitle = {
    overflow: 'hidden', 
    textOverflow: 'ellipsis',  
    "WebkitLineClamp": '2', 
    display: "-webkit-box", 
    'WebkitBoxOrient': 'vertical'
};

const embedDescription = {
    fontSize: '.85rem', 
    maxHeight: '3.75rem', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis',  
    "WebkitLineClamp": '2',
    display: "-webkit-box", 
    'WebkitBoxOrient': 'vertical' 
};

const embedLink = {
    fontSize: '.85rem', 
    color: 'grey !important',
    overflowWrap: 'anywhere',
    "WebkitLineClamp": '1',
    display: "-webkit-box", 
    'WebkitBoxOrient': 'vertical' ,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
};

const embedImg = {
    minWidth: '175px',
    backgroundSize: '100% 100%',
    border: '1px solid #a29d9dc9'
}


export { EmbedModifierStyles, embedStyles, container, content, embedImg, embedTitle, embedDescription, embedLink }