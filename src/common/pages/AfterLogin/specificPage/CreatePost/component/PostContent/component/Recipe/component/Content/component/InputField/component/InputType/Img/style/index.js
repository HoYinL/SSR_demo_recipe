import { makeStyles } from "@material-ui/core/styles";

const ImgStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        height: '7.5rem',
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23333' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='22' stroke-linecap='square'/%3e%3c/svg%3e")`,
        borderRadius: `4px`,
        margin: '1rem',
    },

    imgBox: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        "& .MuiTypography-root":{
            fontFamily: 'Times New Roman',
            fontSize: '1.5rem',
            lineHeight: '65px',
            color: '#929292',
        },
        "& .MuiSvgIcon-root":{
            margin: '0 10px',
            color: '#929292',
            fontSize: '2rem',
        },
        [theme.breakpoints.down("_360")]:{
            margin: '1rem .75rem',
        }
    }
}))

export { ImgStyles }