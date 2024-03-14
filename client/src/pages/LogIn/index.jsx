import React, { useContext } from 'react';
import "./index.scss"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { UserContext } from '../../Context/userContext';
import { jwtDecode } from "jwt-decode"
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Helmet} from "react-helmet-async"

export const LogIn = () => {
    const { user, setUser, token } = useContext(UserContext)
    const { darkmode } = useContext(DarkmodeContext)
    const navigate = useNavigate()

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleLogin = async (values) => {
        try {
            const resp = await axios.post("http://localhost:5500/api/users/login", values)
            const decoded = jwtDecode(resp.data);
            setUser(decoded.nickname)
            console.log(resp);
            if (resp.data) {
                localStorage.setItem('token', resp.data)
                localStorage.setItem("nickname", decoded.nickname)
                navigate("/home")
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("nickname")
        setUser(null)
    }

    return (
        <div id='login' className={darkmode ? "darklogin" : "lightlogin"}>
            <Helmet>
                <title>
                    Log In
                </title>
            </Helmet>
            <Formik
                initialValues={{ nickname: '', password: '', email: '' }}
                validationSchema={Yup.object({
                    nickname: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .matches(/^[a-zA-Z][\w\s]*[^@#]$/, 'Invalid nickname')
                        .required('Required'),
                    password: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    email: Yup.string().email('Invalid email address').required('Required'),
                })}
                onSubmit={(values, { resetForm }) => {
                    handleLogin(values)
                    resetForm()
                }}
            >
                <Form>
                    <label htmlFor="nickname">NickName</label>
                    <Field name="nickname" type="text" />
                    <ErrorMessage name="nickname" />

                    <label htmlFor="email">Email Address</label>
                    <Field name="email" type="email" />
                    <ErrorMessage name="email" />

                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" />
                    <ErrorMessage name="password" />

                    <button type="submit">Submit</button>

                    <h3>Not a member yet? <Link to={"/"}>Sign Up</Link></h3>
                </Form>
            </Formik>
        </div>
    );
};