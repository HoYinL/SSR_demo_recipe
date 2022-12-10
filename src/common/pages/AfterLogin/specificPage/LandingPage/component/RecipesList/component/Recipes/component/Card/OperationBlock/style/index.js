import { makeStyles } from "@material-ui/core";

const OperationStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        background: 'white',
        zIndex: '250',
        right: '0',
        transform: 'translateY(25%)'
    }
}));

export { OperationStyles }