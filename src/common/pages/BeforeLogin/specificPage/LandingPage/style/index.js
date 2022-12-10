import { makeStyles } from "@material-ui/core/styles";

const LandingPage = makeStyles((theme) => ({
    webpage: {
        margin: '0',
        minHeight: typeof window != "undefined"? `${window.innerHeight}px`: '700px',
        fontFamily: 'Arial Narrow',
        [theme.breakpoints.up('_1200')]: {
            maxWidth: 'none',
        },
    },
}))

export { LandingPage }