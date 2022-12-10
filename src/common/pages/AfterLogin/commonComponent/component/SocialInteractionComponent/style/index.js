import { makeStyles } from "@material-ui/core";

const FriendList = makeStyles((theme) => ({
    block: {
        position: 'fixed',
        top: '0',
        zIndex: '150'
    },

    root: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: '4rem 0 0 0',
        width: '200px',
        height: '100%',
        position: 'fixed',
        top: '0',
        zIndex: '150',
        backgroundColor: '#efefef'
    },

    box: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '.5rem 1rem',
    },

    textField: {
        padding: '0',
        color: 'black',
        "& .MuiOutlinedInput-root": {
            borderRadius: '28px',
            "& .MuiSvgIcon-root":{
                color: 'black',
                zIndex: '2'
            },
            "& .MuiOutlinedInput-input": {
                padding: '6px 0 6px 28px',
            },
            "& .MuiOutlinedInput-notchedOutline":{
                backgroundColor: '#ffffff8a',
            },
            "&.Mui-focused .MuiOutlinedInput-input":{
                color: 'black',
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: 'rgb(0, 0, 0, 0)',
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: 'rgb(0, 0, 0, 0)',
            },
            "& .MuiOutlinedInput-input": {
                padding: '6px 0 6px 28px !important',
                color: 'black',
                fontWeight: 'bold',
                fontFamily: 'Trebuchet MS',
                fontSize: '.85rem',
                zIndex: '2'
            }
        },
    },    

    MoreHorizOutlined: {
        color: '#b4b4b4',
        fontSize: '2rem',
    },

    friendText: {
        display: 'block',
        textAlign: 'center',
        fontFamily: 'Trebuchet MS',
        fontWeight: 'bold',
        color: 'black',
    },

    friendcard: {
        height: '42.5% !important',
        borderRadius: '0',
        borderBottom: '1px solid grey',
        color: 'rgb(0, 0, 0, 0) !important',
        margin: '0 .5rem !important',
        backgroundColor: 'rgb(0, 0, 0, 0) !important',
        boxShadow: '0px 0px 0px rgb(0, 0, 0, 0)',
        overflowY: 'scroll',
        cursor: 'pointer'
    },

    groupcard: {
        height: '42.5% !important',
        borderRadius: '0',
        color: 'rgb(0, 0, 0, 0) !important',
        margin: '0 .5rem !important',
        backgroundColor: 'rgb(0, 0, 0, 0) !important',
        boxShadow: '0px 0px 0px rgb(0, 0, 0, 0)',
        overflowY: 'scroll',
        cursor: 'pointer'
    },

    listitem: {
        padding: '.5rem .5rem !important',
        "& .MuiAvatar-root": {
            margin: 'auto',
            height: '2rem',
            width: '2rem',
        },
        "& .MuiListItemAvatar-root": {
            minWidth: '0',
            position: 'relative',
            margin: '0 .5rem',
            /*"&::before": {
                content:'""',
                position: 'absolute',
                display: 'block',
                width:'.5rem',
                height:'.5rem',
                borderRadius: '50%',
                border: '.15rem solid #efefef',
                backgroundColor: 'green',
                bottom: '0',
                right: '2.5px',
                zIndex: '10',
                transform: 'translateX(25%) translateY(25%)'
            }*/
        }
    },

    listitem_group: {
        padding: '.5rem .5rem !important',
        "& .MuiAvatar-root": {
            margin: 'auto',
            height: '2rem',
            width: '2rem',
        },
        "& .MuiListItemAvatar-root": {
            minWidth: '0',
            position: 'relative',
            margin: '0 .5rem',
        }, 
        "& .MuiTypography-root":{
            fontSize: ".8rem",
            color: 'grey',
            fontWeight: 'bold'
        }
    },

    arrowBlock: {
        margin: '2rem 0 0 0',
        width: '2rem',
        height: '100px',
        backgroundColor: '#f6f6f6',
        position: 'fixed',
        top: '50%',
        right: '-2rem',
        zIndex: '50',
        transform: 'translateY(-50%)',
        borderTopLeftRadius: '.5rem',
        borderBottomLeftRadius: '.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'right .25s',
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
        right: '0',
        zIndex: '1000',
        display: 'none',
    },

    arrowBlockCoverDisplay: {
        display: 'block',
    }, 

    arrowBlockCoverDisplayNone: {
        display: 'none',
    }, 

    lineBlock: {
        position: 'fixed',

    },

    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        "WebkitLineClamp": '2',
        display: "-webkit-box",
        'WebkitBoxOrient': 'vertical',
        lineBreak: 'anywhere',
        margin: 'auto 1rem',
        fontWeight: 'bold', 
        color: 'black' 
    }
}))

export { FriendList }