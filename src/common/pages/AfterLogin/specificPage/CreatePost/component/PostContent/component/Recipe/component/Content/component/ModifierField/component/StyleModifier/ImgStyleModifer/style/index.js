import { makeStyles } from "@material-ui/core/styles";

const captionStyle = {
    position: 'relative', 
    fontSize: '.85rem', 
    color: 'grey !important', 
    fontFamily: 'Arial', 
    margin: '.5rem 0',
    textAlign: 'center'
};

const ImgModifierStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        margin: 'auto',
        "& .MuiTextField-root": {
            width: '50%',
            margin: '.5rem 0',
            "& .MuiOutlinedInput-input":{
                padding: '0',
                textAlign: 'center',
                color: 'grey !important',
                fontSize: '.85rem',
            },
            "& .MuiOutlinedInput-root":{
                "& .MuiOutlinedInput-notchedOutline":{
                    border: 'none'
                },
                "&.Mui-focused":{
                    "& .MuiOutlinedInput-notchedOutline":{
                        border: 'none'
                    }
                }
            }
        }
    },

    nonClickedHover: {
        "&:hover": {
            "& #imgBox": {
                border: '2px solid orange',
            }
        }
    },

    clickedHover: {
        "&:hover": {
            "& #imgBox": {
                border: '2px solid rgb(0, 0, 0, 0)',
            }
        }
    },

    imgBox: {
        maxHeight: '500px', 
        maxWidth: '100%',
        cursor: 'pointer',
        border: '2px solid rgb(0, 0, 0, 0)',
        userSelect: 'none', 
    },
    
    imgBoxClicked: {
        maxHeight: '500px', 
        maxWidth: '100%',
        cursor: 'pointer',
        border: '2px solid rgb(0, 0, 0, 0)',
        userSelect: 'none', 
    },

    img_preview: {
        //maxHeight: '500px', 
        cursor: 'pointer',
        display: 'none', 
        margin: '0 auto',
        border: '2px solid rgb(0, 0, 0, 0) !important',
        position: 'absolute',
        userSelect: 'none', 
        zIndex: '100',
    },

    img_previewClicked: {
        //maxHeight: '500px', 
        //width: '100%',
        cursor: 'pointer',
        display: 'block', 
        border: '2px dashed #ff721b !important',
        position: 'absolute',
        margin: '0 auto',
        zIndex: '100',
        userSelect: 'none', 
    },

    previewImg: {
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        display: 'block', 
        position: 'relative', 
        right: '0',
        opacity: '.5',
        userSelect: 'none', 
        //maxHeight: '498.5px',
    },

    height: {
        maxHeight: '500px',
    },

    height2: {
        width: '100%',
        height: '100%'
    },

    square: {
        height: '.5rem', 
        width: '.5rem', 
        position: 'absolute', 
        backgroundColor: 'white',
        border: '1px solid black'
    },

    altBlock: {
        borderRadius: '.5rem',
        position: 'absolute',
        transform: 'translateY(-150%) perspective(150px) rotateX(-90deg)',
        transition: 'transform .25s',
        width: '100px',
        height: '3rem',
        backgroundColor: '#443a3a',
        zIndex: '120',
        cursor: 'pointer',
        "& .MuiTypography-root":{
            color: 'white',
            lineHeight: '3rem',
        },
        "&::before":{
            content: "''",
            width: '0',
            height: '0',
            borderLeft: '.5rem solid transparent',
            borderRight: '.5rem solid transparent',
            borderTop: '.5rem solid #3a3a3a',
            display: 'inline-block',
            position: 'absolute',
            zIndex: '100000',
            bottom: '-.5rem',
            transform: 'translateX(-50%)'
        }
    },

    altBockHide: {
        transform: 'translateY(-150%) perspective(250px) rotateX(-90deg)',
    },

    altBlockShow: {
        transform: 'translateY(-150%) perspective(250px) rotateX(0deg)',
    },

    confirmedButton: {
        margin: '.75rem 0',
        backgroundColor: '#3a3a3a',
        color: '#ffa900 !important',
        transition: 'background-color .25s, color .5s',
        padding: '.5rem .75rem',
        "&:hover":{
            backgroundColor: 'black',
            color: 'white'
        }
    },

    captionModifier: {
        minWidth: '150px',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: '-3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '.25rem .75rem',
        backgroundColor: '#3a3a3a',
        zIndex: '125',
        borderRadius: '8px',
        "&::before":{
            content: "''",
            width: '0',
            height: '0',
            borderLeft: '.5rem solid transparent',
            borderRight: '.5rem solid transparent',
            borderTop: '.5rem solid #3a3a3a',
            display: 'inline-block',
            position: 'absolute',
            bottom: '-.5rem',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        "& .MuiSvgIcon-root":{
            color: 'white',
            margin: '0 .25rem',
            cursor: 'pointer',
            "&:hover":{
                color: 'orange'
            }
        },
        "& .MuiTextField-root":{
            width: '100%',
            margin: 'auto',
            "& .MuiOutlinedInput-input":{
                textAlign: 'start',
                color: 'white !important',
                fontFamily: 'ui-monospace !important',
            }
        }
    },

    
    imgChangeBlock: {
        position: 'absolute', 
        height: '100%', 
        width: '100%', 
        left: '0', 
        top: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff6e',
    },

    player: {
        color: '#f0f8ff94',
        fontSize: '10rem',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
    }
}))

const direction_position = {
    NW: {top: '0 !important', transform: 'translateX(-50%) translateY(-50%) !important', cursor: 'nwse-resize !important'},
    N: {top: '0 !important', left: '50% !important', transform: 'translateX(-50%) translateY(-50%) !important', cursor: 'ns-resize !important'},
    NE: {top: '0 !important', right: '0% !important', transform: 'translateX(50%) translateY(-50%) !important', cursor: 'nesw-resize !important'},
    W: {top: '50% !important', transform: 'translateX(-50%) translateY(-50%) !important', cursor: 'ew-resize !important'},
    E: {top: '50% !important', right: '0% !important', transform: 'translateX(50%) translateY(-50%) !important', cursor: 'ew-resize !important'},
    SW: {bottom: '0% !important', transform: 'translateX(-50%) translateY(50%) !important', cursor: 'nesw-resize !important'},
    S: {bottom: '0% !important', left: '50% !important', transform: 'translateX(-50%) translateY(50%) !important', cursor: 'ns-resize !important'},
    SE: {bottom: '0% !important', right: '0% !important', transform: 'translateX(50%) translateY(50%) !important', cursor: 'nwse-resize !important'},
}

export { ImgModifierStyles, direction_position, captionStyle }