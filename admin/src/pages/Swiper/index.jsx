import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import "./index.scss"
import { useContext } from 'react';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link, NavLink } from 'react-router-dom'
import Navbar from '../../layout/Navbar';

const Swiper = () => {
    const { darkmode } = useContext(DarkmodeContext);

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
            <Navbar />
            <div id='swiperpage' className={darkmode ? "darkswiper" : "lightswiper"}>
                <div className="adminleft">
                    <NavLink activeclassname="active" to={"/admin"}>Users</NavLink>
                    <NavLink to={"/movies"}>Movie</NavLink>
                    <NavLink to={"/swipepage"}>swipepage</NavLink>
                    <NavLink to={"/add"}>Add</NavLink>
                    <NavLink to={"/swiper"}>Swiper</NavLink>
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
                    }}
                >
                    <Form encType="multipart/form-data">
                        <label htmlFor="swipername">Name</label>
                        <Field name="swipername" type="text" />
                        <ErrorMessage name="swipername" />

                        <label htmlFor="swiperimage">Image</label>
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
                        <ErrorMessage name="swiperimage" />

                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default Swiper