import { makeStyles } from "@material-ui/core";

const FilterForm = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        padding: '4rem 0 0 0',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        width: `100%`, 
        height: `100%`, 
        backgroundColor: '#ffffffd4',
        position: 'fixed',
        zIndex: '1000',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    form: {
        padding: '1rem 0',
        display: 'flex',
        height: '85%',
        maxHeight: '800px',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '400px',
        backgroundColor: 'white',
        "& .MuiTypography-root":{
            color: '#5b3b00',
            fontFamily: 'trebuchet MS',
            fontSize: '1.5rem',
            padding: '0.5rem 0',
            fontWeight: '600'
        }
    },

    buttonBox: {
        display: 'flex', 
        padding: '.5rem 0',
        "& .MuiButton-root":{
            backgroundColor: '#643d00', 
            color: '#ffbc00',
            margin: '0 1.5rem',
            padding: '0.5rem 1rem',
            fontWeight: '600',
            fontFamily: 'trebuchet MS',
            "&:hover":{
                backgroundColor: '#482500', 
            }
        }
    },

    select: {
        width: '85%',
        margin: '.5rem auto',
        position: 'relative',
        "& .MuiFormControl-root":{
            width: '100%',
            margin: '0 0 .5rem 0',
        },
        "& .MuiFormLabel-root":{
            padding: '0 1rem',
            backgroundColor: 'white',
            "& .Mui-focused":{
                color: '#ffbc00 !important'
            }
        },
        "& .MuiOutlinedInput-root":{
            "& .MuiSelect-select":{
                padding: '1rem 2rem',
                color: 'black !important'
            },
            width: '100%',
            borderRadius: '28px',
        },
        "& .Mui-focused":{
            color: '#ffbc00',
            "& .MuiOutlinedInput-notchedOutline":{
                borderColor: '#5b3b00',
            },
        }
    },

    filterList:{
        padding: '0 0 .5rem 0', 
        display: 'flex', 
        justifyContent: 'flex-start', 
        flexWrap: 'wrap'
    },

    filterBlock: {
        display: 'flex',
        width: 'auto',
        padding: '.2rem .5rem', 
        margin: '.1rem .25rem',
        borderRadius: '24px', 
        border: '1px solid #e47100', 
        backgroundColor: '#e9e9e9',
        color: '#474747c9',
        fontSize: '.8rem',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        "& .MuiSvgIcon-root":{
            cursor: 'pointer',
            margin: '0 0 0 .4rem',
            width: '.8em',
            height: '.8em',
            fontSize: '1.25rem',
        },
        "& .MuiTypography-root":{
            padding: '0 0 0 0.5rem',
            fontSize: '.8rem'
        }
    }
}))

const filterStyle = {
    display: 'flex',
    width: 'auto',
    padding: '.2rem .5rem', 
    margin: '.1rem .25rem',
    borderRadius: '24px', 
    border: '1px solid #e47100', 
    backgroundColor: '#e9e9e9',
    color: '#474747c9',
    fontSize: '.8rem',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    "& .MuiSvgIcon-root":{
        cursor: 'pointer',
        margin: '0 0 0 .4rem',
        width: '.8em',
        height: '.8em',
        fontSize: '1.25rem',
    },
    "& .MuiTypography-root":{
        padding: '0 0 0 0.5rem',
        fontSize: '.8rem'
    }
}

export { FilterForm, filterStyle }