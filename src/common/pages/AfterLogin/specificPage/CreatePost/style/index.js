import { makeStyles } from "@material-ui/core";

const CreatePostPage = makeStyles((theme) => ({
    root: {
        minHeight: typeof window != "undefined"? `${window.innerHeight}px`: '1000px',
        position: 'relative',
    }
}))

export { CreatePostPage }