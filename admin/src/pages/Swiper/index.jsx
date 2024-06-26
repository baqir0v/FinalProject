import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import "./index.scss"
import { useContext } from 'react';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link, NavLink } from 'react-router-dom'
import Navbar from '../../layout/Navbar';
import Nav from '../../layout/Nav';
import Errorpage from '../Error';
import { UserContext } from '../../Context/userContext';
import { Helmet } from "react-helmet-async"

const Swiper = () => {
    const { darkmode } = useContext(DarkmodeContext);
    const { userData } = useContext(UserContext)

    const handleAdd = async (values) => {
        try {
            const formData = new FormData()

            formData.append("swipername", values.swipername)
            formData.append("swiperimage", values.swiperimage)

            const res = await axios.post("http://localhost:5500/api/swiper", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200) {
                console.log('Movie added successfully');
            } else {
                console.log('Failed to add movie');
            }
        } catch (error) {
            console.error('Error adding image:', error);
        }
    }

    return (
        <>
            <Helmet>
                <title>
                    Swiper
                </title>
            </Helmet>
            {userData.isAdmin === true ?
                <>
                    <Navbar />
                    <div id='swiperpage' className={darkmode ? "darkswiper" : "lightswiper"}>
                        <div className="adminleft">
                            <Nav />
                        </div>
                        <Formik
                            initialValues={{ swipername: '', swiperimage: '' }}
                            validationSchema={Yup.object({
                                swipername: Yup.string()
                                    .required('Required'),
                                swiperimage: Yup.mixed()
                                    .required('Required'),
                            })}
                            onSubmit={(values, { resetForm }) => {
                                handleAdd(values)
                                resetForm()
                            }}
                        >
                            <Form encType="multipart/form-data">
                                <label htmlFor="swipername">Name</label>
                                <Field name="swipername" type="text" />
                                <ErrorMessage name="swipername" />

                                <label htmlFor="swiperimage">Image</label>
                                <div className="inpfile">
                                    <label style={{ cursor: "pointer" }} htmlFor="fileInput" className="custom-file-upload">
                                        Upload Profile Picture
                                    </label>
                                    <Field name="swiperimage">
                                        {({ field, form }) => (
                                            <input
                                                id="swiperimage"
                                                name="swiperimage"
                                                type="file"
                                                onChange={(event) => {
                                                    form.setFieldValue('swiperimage', event.currentTarget.files[0]);
                                                }}
                                            />
                                        )}
                                    </Field>
                                </div>

                                <ErrorMessage name="swiperimage" />

                                <button type="submit">Submit</button>
                            </Form>
                        </Formik>
                    </div>
                </>
                : <Errorpage />
            }
        </>
    )
}

export default Swiper