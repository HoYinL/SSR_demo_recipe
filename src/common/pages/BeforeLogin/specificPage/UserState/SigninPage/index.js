import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Box, Card } from "@mui/material"
import { register } from "../../../../../../server/axios/api1";
import { componentStyle } from "../style";
import { useSelector, useDispatch } from "react-redux";
import { scrollSmall } from '../../../commonComponent/Footer/function';
import { setClearstate } from "../../../../../store/clearrevealreducer";
import RegUsername from "./component/Username";
import RegEmail from "./component/Email";
import RegPassword from "./component/Password";
import RegIcon from "./component/Icon";
import Description from "./component/Description";
import validate from "validate.js";

const Signin = () => {
    const [ username, setUsername ] = useState("Username");
    const [description, setDescription] = useState("User Description");
    const [ email, setEmail ] = useState("Email");
    const [ password, setPassword ] = useState("Password");
    const [ confirmedPassword, setConfirmedPassword ] = useState("Password");
    const [ validSetPassword, setValidSetPassword ] = useState(true);
    const [ validPassword, setValidPassword] = useState(true);
    const [ validEmail, setVaildEmail ] = useState(true);
    const [ rejectMessage, setRejectMessage ] = useState(null);
    const [ displayImg, setDisplayImg ] = useState('');
    const [ constraints, setConstraints ] = useState({});

    const paddingBottom = useSelector(state => state.paddingBottomBeforeLogin.paddingBottom);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const component = componentStyle();

    useEffect(() => {
        scrollTo(0, 0);
        dispatch(setClearstate(true))
        setTimeout(scrollSmall);

        setConstraints({
           emailFrom: {
            presence: true,
            email: true 
           }, 

           password: {
            presence: true,
            format:{
                pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$",
                message: `requires:\n&#x2022; At least 8 characters\n&#x2022; At least 1 uppercase, lowercase, digit no. and symbol`
            }
           }
        })
    }, [])

    const signin = ( username, email, password, backgroundImage, description ) => {
        const form = document.getElementById('registerForm');
        const result = validate(form, constraints);

        if(result){
            if(result.password){
                setValidSetPassword(result.password[0]);
                return
            }
            if(result.emailFrom){
                setVaildEmail(false);
                setRejectMessage(result.emailFrom[0]);
                return
            }
        }

        if(password != confirmedPassword){
            setValidPassword(false);
            ConfirmPasseordInputProps.error = false;
            return
        }
        setValidPassword(true);

        register(username, email, password, backgroundImage, description)
            .then((res) => {
                navigate(`/surfaceUI/${res.id}/LandingPage`)
            })
            .catch((res) => {
                setVaildEmail(false);
                setUsername("Username");
                setEmail("Email");
                setPassword("Password");
                setConfirmedPassword("Password");
                setDescription("User Description");
                setRejectMessage(res);
            })
    }

    const htmlParser = (target) => {
        const str = target.replace(/\n/g, "<br />");
        const split_str = str.split('<br />').map(string => string.split('&#x2022;'));
        const split_block = split_str.map((ele) => {
            if(ele.length == 1){
                return `<span style="display: inline-block; color: red">${ele[0]}</span>`
            } else {
                return `<span style="display: flex">
                    <span style="min-width: .6rem; display: inline-block; color: red">${'&#x2022;'}</span>
                    <span style="display: inline-block; color: red">${ele[1]}</span>
                </span>`
            }
        });
        let str_html = '';
        split_block.map((ele) => {
            str_html += ele ;
        }) 

        return str_html
    };
    
    return (
        <>
        <Box className={component.background}>
            <Card className={component.card}>
                <form id='registerForm' className={component.form}>
                    <RegUsername 
                        username={username} 
                        setUsername={setUsername}
                    />
                    <RegEmail 
                        email={email} 
                        validEmail={validEmail} 
                        rejectMessage={rejectMessage} 
                        setEmail={setEmail}
                    />
                    <RegPassword 
                        password={password} 
                        validPassword={validPassword} 
                        validSetPassword={validSetPassword}
                        setPassword={setPassword}
                        htmlParser={htmlParser}
                        confirmedPassword={confirmedPassword}
                        setConfirmedPassword={setConfirmedPassword}
                    />
                    <Description 
                        description={description}
                        setDescription={setDescription}
                    />
                    <RegIcon 
                        displayImg={displayImg}
                        setDisplayImg={setDisplayImg}
                    />
                    <Button 
                        variant="contained" 
                        className={component.button}
                        onClick={() => {signin(username, email, password, displayImg, description)}}
                    >
                    Register
                    </Button>
                </form>
            </Card>
        </Box>
        <Box sx={{height: `${paddingBottom}`}}></Box>
        </>
    )
}

export default Signin