import React, { useEffect, useState } from 'react';
import { Box, Card, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { initialColumnsDisplayNone } from '../../commonComponent/function';
import { EditProfilePage } from './style';
import { useSelector, useDispatch } from 'react-redux';
import Authenticate from './component/Authenticate';
import Username from './component/Username';
import Password from './component/Password';
import Email from './component/Email';
import Icon from './component/Icon';
import Descripiton from './component/Description';
import { modifyInformation, confirmPassword } from '../../../../../server/axios/api1';
import { setPayloadByRes } from '../../../../store/tokenreducer';
import { setPublish } from '../../../../store/publishreducer';
import validate from 'validate.js';

const EditProfile = () => {
    const editProfilePage = EditProfilePage();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modifyInfo, setModifyInfo] = useState(null);
    const [authenticate, setAuthenticate] = useState(false);
    const [password, setPassword] = useState(null);
    const [confirm_password, setConfirmPassword] = useState(null);
    const [confirmed, setConfirmed] = useState(null);
    const [number, setNumber] = useState(0);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [modifiedEmail, setModifiedEmail] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [iconSrc, setIconSrc] = useState(null);
    const [id, setID] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [constraints, setConstraints] = useState(null);
    const [description, setDescription] = useState(null);

    const paddingBottom = useSelector(state => state.paddingBottom.paddingBottom);
    const info = useSelector(state => state.token.token_payload);

    useEffect(() => {
        initialColumnsDisplayNone();
        setIconSrc(localStorage.getItem('icon'));
        dispatch(setPublish(false));

        setConstraints({
            emailForm: {
                email: true
            },

            password: {
                format: {
                    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$",
                    message: `requires:\n&#x2022; At least 8 characters\n&#x2022; At least 1 uppercase, lowercase, digit no. and symbol`
                }
            }
        })
    }, []);

    useEffect(() => {
        if (info != null && typeof window != null && number == 0) {
            (info);
            let { username, email, id, isAdmin, description } = info;
            setUsername(username);
            setEmail(email);
            setPassword('');
            setIsAdmin(isAdmin);
            setID(id);
            setIconSrc(localStorage.getItem('icon'));
            setNumber(1);
            setDescription(description);
        }
    }, [info, iconSrc])

    useEffect(() => {
        if (
            username != null &&
            email != null &&
            password != null &&
            iconSrc != null &&
            description != null
        ) {
            setModifyInfo({ username, email, password, iconSrc, id, isAdmin, description });
        }
    }, [username, email, password, iconSrc, id, isAdmin, description]);

    return (
        <Box sx={{ padding: `0rem 0px ${paddingBottom} !important` }} className={editProfilePage.root}>
            {
                info &&
                <Card className={editProfilePage.editForm}>
                    {
                        authenticate == false &&
                        <Authenticate
                            confirm_password={confirm_password}
                            setConfirmPassword={setConfirmPassword}
                            password={password}
                            setPassword={setPassword}
                            confirmed={confirmed}
                        />
                    }

                    {
                        authenticate &&
                        <form id='edit_form'>
                            <Username
                                username={username}
                                setUsername={setUsername}
                                info={info}
                                modifyInfo={modifyInfo}
                            />
                            <Password
                                password={password}
                                setPassword={setPassword}
                                modifyInfo={modifyInfo}
                                validPassword={validPassword}
                            />
                            <Email
                                email={email}
                                setEmail={setEmail}
                                info={info}
                                modifyInfo={modifyInfo}
                                validEmail={validEmail}
                                setModifiedEmail={setModifiedEmail}
                            />
                            <Descripiton
                                description={description}
                                setDescription={setDescription}
                            />
                            <Icon
                                iconSrc={iconSrc}
                                setIconSrc={setIconSrc}
                                modifyInfo={modifyInfo}
                            />
                        </form>
                    }
                    <Button
                        onPointerDown={() => {
                            if (info != null) {
                                if (authenticate == true) {
                                    const form = document.getElementById('edit_form');
                                    const result = validate(form, constraints);

                                    if (result) {
                                        if (result.password) {
                                            setValidPassword(result.password[0]);
                                            return
                                        }
                                        if (result.emailForm) {
                                            setValidEmail(result.emailForm[0]);
                                            return
                                        }
                                    }

                                    modifyInformation(modifyInfo, modifiedEmail)
                                        .then((res) => {
                                            dispatch(setPayloadByRes(res.data.user));
                                            localStorage.setItem('icon', res.data.user.icon);
                                            navigate(`/surfaceUI/${info.id}/LandingPage`);
                                        })
                                        .catch((res) => (res))
                                } else {
                                    confirmPassword(confirm_password, id)
                                        .then((res) => {
                                            setAuthenticate(true)
                                        })
                                        .catch((res) => {
                                            setAuthenticate(false);
                                            setConfirmed(false);
                                        })
                                }
                            }
                        }}
                        className={editProfilePage.button}
                    >
                        <Typography>{authenticate ? 'Edit' : 'Confirm'}</Typography>
                    </Button>
                </Card>
            }
        </Box>
    )
}

export default EditProfile