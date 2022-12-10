import { makeStyles } from "@material-ui/core";

const LandingPage = makeStyles((theme) => ({
    root: {
        minHeight: typeof window != "undefined"? `${window.innerHeight}px`: '1000px',
        position: 'relative',
    }
}))

export { LandingPage }