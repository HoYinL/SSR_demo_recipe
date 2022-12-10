import { makeStyles } from "@material-ui/core";

const InBlogCommentBlockStyles = makeStyles((theme) => ({
    commentBlock: {
        minWidth: '240px',
        width: '100%',
        minHeight: '60px',
        backgroundColor: 'white',
        padding: '.5rem',
        margin: 'auto',
        backgroundColor: '#fcfcfcd9',
        borderRadius: '8px',
        border: '1px solid #b1b1b1',
        display: 'flex',
        flexFlow: 'column',
        "& .react-emoji-picker--wrapper":{
            overflow: 'initial',
        },
    },
}));

export { InBlogCommentBlockStyles }