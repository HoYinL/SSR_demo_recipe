import { makeStyles } from "@material-ui/core/styles";

const CreateRecipeStyle = makeStyles((theme) => ({
    root: {
        margin: '2rem auto',
        minHeight: '800px',
        width: '90%',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        overflowY: 'scroll',
        [theme.breakpoints.up('_1000')]:{
            width: '80%',
            maxWidth: '1000px'
        }
    }
}))

export { CreateRecipeStyle }