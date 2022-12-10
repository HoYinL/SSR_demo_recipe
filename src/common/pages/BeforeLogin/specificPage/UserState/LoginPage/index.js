import React, { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Box, Card, TextField, Typography, InputAdornment, FormControl, FormHelperText } from "@mui/material";
import { Email, VisibilityOff } from '@mui/icons-material';
import { login } from "../../../../../../server/axios/api1"
import { textfieldStyle, textfieldError, componentStyle } from "../style";
import { useSelector, useDispatch } from "react-redux";
import { scrollSmall } from '../../../commonComponent/Footer/function'
import { setClearstate } from "../../../../../store/clearrevealreducer";

const Login = () => {
    const [ username, setUsername ] = useState("Email");
    const [ password, setPassword ] = useState("Password");
    const [ validUsername, setValidUsername ] = useState(true);
    const [ validPassword, setValidPassword ] = useState(true);
    const [ rejectMessage, setRejectMessage ] = useState(null);

    const paddingBottom = useSelector(state => state.paddingBottomBeforeLogin.paddingBottom);

    const textfield = textfieldStyle();
    const component = componentStyle();
    const errorTextfield = textfieldError();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        scrollTo(0, 0);
        dispatch(setClearstate(true))
        setTimeout(scrollSmall)
    }, [])

    const loginFun = (username, password) => {
        if (username !== "" && password !== "") {
            login(username, password)
            .then((res) => {
                setValidUsername(true);
                setValidPassword(true);
                navigate(`/surfaceUI/${res.id}/LandingPage`);
            })
            .catch((res) => {
                switch(res.type){
                    case "username":
                    setUsername("Email")
                    setValidUsername(false);
                    setValidPassword(true);
                    setRejectMessage(res.message)
                    break;
                    case "password":
                    setPassword("Password")
                    setValidUsername(true);
                    setValidPassword(false);
                    setRejectMessage(res.message)
                    break;
            }})
        } else if (username === "") {
          alert("please enter username!");
        } else if (password === ""){
          alert("please enter password!");
        }
    }

    return(
        <>
        <Box className={component.background}>
            <Card className={component.card}>
                <>
                <form className={component.form}>
                    <FormControl>
                    <TextField 
                        required={validUsername == true? true: false}
                        error={validUsername == true? false: true}
                        type="email"
                        name="Email"
                        variant="filled"
                        label={validUsername == true? "Required": "Error"}
                        value={username == "Email"? "Email": username}
                        placeholder="Email"
                        size="small" 
                        onChange={(e) => {setUsername(e.target.value);}}
                        onFocus={(e) => {username == "Email"? setUsername(""): null}}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Email />
                            </InputAdornment>
                        ),
                        }}
                        classes={validUsername == true? textfield: errorTextfield}
                    />
                    <FormHelperText 
                        className={`${validUsername == true? component.helperText: component.warningText}`}
                    >
                        {validUsername == true? '': `*${rejectMessage}*`}
                    </FormHelperText>
                    </FormControl>

                    <FormControl>
                    <TextField 
                        required={validPassword == true? true: false}
                        error={validPassword == true? false: true}
                        type="password"
                        name="password"
                        variant="filled"
                        label={validPassword == true? "Required": "Error"}
                        value={password == "Password"? "Password": password}
                        placeholder="Password"
                        size="small" 
                        onChange={(e) => {setPassword(e.target.value);}}
                        onFocus={(e) => {password == "Password"? setPassword(""): null}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <VisibilityOff />
                                </InputAdornment>
                            ),
                        }}
                        classes={validPassword == true? textfield: errorTextfield}
                    />
                    <FormHelperText 
                        className={`${validPassword == true? component.helperText: component.warningText}`}
                    >
                        {validPassword == true? '': `*${rejectMessage}*`}
                    </FormHelperText>
                    </FormControl>

                    <Button
                        variant="contained" 
                        className={component.button}
                        onClick={() => {loginFun(username, password)}}
                    >
                    Log In
                    </Button>
                </form>

                <Box>
                    <Link to="/signin" style={{textDecoration: 'none'}}>
                        <Typography 
                        align="center" 
                        sx={{fontSize: 14}} 
                        className={component.link}
                        >
                        not yet registered?
                        </Typography>
                    </Link>
                </Box>
                </>
            </Card>
        </Box>
        <Box sx={{height: `${paddingBottom}`}}></Box>
        </>
    )
}

export default Login