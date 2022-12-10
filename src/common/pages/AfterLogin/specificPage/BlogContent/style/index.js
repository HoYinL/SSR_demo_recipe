import { makeStyles } from "@material-ui/core";

const BlogContentStyle = makeStyles((theme) => ({
    root: {
        minHeight: typeof window != "undefined"? `${window.innerHeight}px`: '1000px',
        position: 'relative',
        "& .MuiContainer-root":{
            maxWidth: '900px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 0 5rem 0'
        }
    },
}))

export { BlogContentStyle }