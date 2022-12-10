import { makeStyles } from "@material-ui/core/styles";

const TitleStyle = makeStyles((theme) => ({
    root: {
        minHeight: 'auto',
        boxShadow: '0 0 0 rgb(0, 0, 0, 0)',
        overflow: 'scroll',
        "& .MuiTypography-root": {
            display: 'inline-block',
            fontSize: '1.5rem',
            fontFamily: 'Trebuchet MS',
            fontWeight: 'bold'
        }
    },

    prompt: {
        cursor: 'pointer',
        position: 'fixed',
        left: '1rem',
        bottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '8rem',
        "& .MuiTypography-root":{
            fontSize: '1rem',
            fontFamily: 'Trebuchet MS',
            color: '#a06800'
        },
        "& .MuiSvgIcon-root":{
            color: '#ff9900',
            fontSize: '2.25rem',
            animation: `$ArrowDown 3000ms infinite`,
        }
    },

    "@keyframes ArrowDown": {
        "0%": {
          transform: "translateY(-25%)"
        },
        "50%": {
          transform: "translateY(0%)"
        },
        "100%": {
            transform: "translateY(-25%)"
          }
      },
}))

export { TitleStyle }