import { makeStyles } from "@material-ui/core";

const Main = makeStyles((theme) => ({
    block: {
        position: 'fixed',
        top: '0',
        zIndex: '10',
        width: '200px',
        height: '100%',
        backgroundColor: '#efefef',
    },

    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '200px',
        padding: '4rem 0 0 0',
        position: 'fixed',
        top: '0',
        zIndex: '100',
        left: '0',
        backgroundColor: '#efefef',
    },

    arrowBlock: {
        margin: '2rem 0 0 0',
        width: '2rem',
        height: '100px',
        backgroundColor: '#f6f6f6',
        position: 'fixed',
        top: '50%',
        left: '-2rem',
        zIndex: '50',
        transform: 'translateY(-50%)',
        borderTopRightRadius: '.25rem',
        borderBottomRightRadius: '.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'left .25s',
        "& .MuiSvgIcon-root":{
            height: '100px',
            width: '1.5rem',
            color: '#ffac80',
            fontSize: '1.75rem',
            zIndex: '250'
        }
    },

    arrowBlockCover: {
        height: '100px',
        width: '2rem',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '1000',
        display: 'none',
    },

    arrowBlockCoverDisplay: {
        display: 'block',
    }, 

    arrowBlockCoverDisplayNone: {
        display: 'none',
    }, 
}))

export { Main }