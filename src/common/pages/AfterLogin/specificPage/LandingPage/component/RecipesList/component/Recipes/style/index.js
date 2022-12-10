import { makeStyles } from "@material-ui/core";

const Recipes = makeStyles((theme) => ({
    container: {
        width: '100%', 
        borderRadius: '1rem',
        padding: '0 !important',
        display: 'grid', 
        justifyContent: 'space-evenly', 
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 300px))",
        gridAutoRows: 'auto',
        gridGap: '1.5rem', 
        padding: '2rem !important',
    },
}))

export { Recipes }