import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./index.scss";
import { DarkmodeContext } from '../../Context/darkmodeContext';
import Navbar from '../../layout/Navbar';
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import Errorpage from '../Error';
import { UserContext } from '../../Context/userContext'

export const AddMovies = () => {
    const { darkmode } = useContext(DarkmodeContext);
    const [categories, setCategories] = useState([]);
    const { userData } = useContext(UserContext)

    const handleAddMovie = async (values) => {
        try {
            const formData = new FormData();

            formData.append('name', values.name);
            formData.append('desc', values.desc);
            formData.append('lang', values.lang);
            formData.append('year', values.year);
            formData.append('ageLimit', values.ageLimit);
            formData.append('imdb', values.imdb);
            formData.append('trailer', values.trailer);

            formData.append('image', values.image);
            formData.append('detailImage', values.detailImage);
            formData.append('video', values.video);

            values.category.forEach((categoryId, index) => {
                formData.append(`category[${index}]`, categoryId);
            });

            const response = await axios.post('http://localhost:5500/api/movies/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log('Movie added successfully');
            } else {
                console.log('Failed to add movie');
            }
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5500/api/categories");
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            {userData.isAdmin === true ?
                <>
                    <Navbar />
                    <div id='addmovie' className={darkmode ? "darkaddmovie" : "lightaddmovie"}>
                        <div className="adminleft">
                            <NavLink activeclassname="active" to={"/admin"}>Users</NavLink>
                            <NavLink to={"/movies"}>Movie</NavLink>
                            <NavLink to={"/add"}>Add</NavLink>
                            <NavLink to={"/swiper"}>Swiper</NavLink>
                        </div>
                        <Formik
                            initialValues={{ name: '', desc: '', lang: '', year: '', image: null, detailImage: null, video: null, category: [], trailer: "", imdb: "", ageLimit: "" }}
                            validationSchema={Yup.object({
                                name: Yup.string().required('Required'),
                                desc: Yup.string().required('Required'),
                                lang: Yup.string().required('Required'),
                                image: Yup.mixed().required('Required'),
                                detailImage: Yup.mixed().required('Required'),
                                video: Yup.mixed().required('Required'),
                                trailer: Yup.string().required('Required'),
                                ageLimit: Yup.number().required('Required').min(0, 'Must be at least 0'),
                                imdb: Yup.number().required('Required').min(0, "Must be between 0 and 10").max(10, 'Must be between 0 and 10'),
                                year: Yup.number().required('Required').min(1900, 'Must be at least 1900'),
                            })}
                            onSubmit={(values, { resetForm }) => {
                                console.log(values);
                                handleAddMovie(values);
                                // resetForm()
                            }}
                        >
                            {({ values }) => (

                                <Form>
                                    <label htmlFor="name">Name</label>
                                    <Field name="name" type="text" />
                                    <ErrorMessage name="name" />

                                    <label htmlFor="desc">Description</label>
                                    <Field name="desc" type="text" />
                                    <ErrorMessage name="desc" />

                                    <label htmlFor="lang">Language</label>
                                    <Field name="lang" type="text" />
                                    <ErrorMessage name="lang" />

                                    <label htmlFor="imdb">IMDB</label>
                                    <Field name="imdb" type="text" min="0" max="10" />
                                    <ErrorMessage name="imdb" />

                                    <label htmlFor="trailer">Trailer</label>
                                    <Field name="trailer" type="text" />
                                    <ErrorMessage name="trailer" />

                                    <label htmlFor="image">Image</label>
                                    <Field name="image">
                                        {({ field, form }) => (
                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                onChange={(event) => {
                                                    form.setFieldValue('image', event.currentTarget.files[0]);
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="image" />

                                    <label htmlFor="detailImage">Wide Image</label>
                                    <Field name="detailImage">
                                        {({ field, form }) => (
                                            <input
                                                id="detailImage"
                                                name="detailImage"
                                                type="file"
                                                onChange={(event) => {
                                                    form.setFieldValue('detailImage', event.currentTarget.files[0]);
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="detailImage" />

                                    <label htmlFor="video">Video</label>
                                    <Field name="video">
                                        {({ field, form }) => (
                                            <input
                                                id="video"
                                                name="video"
                                                type="file"
                                                accept="video/*"
                                                onChange={(event) => {
                                                    form.setFieldValue('video', event.currentTarget.files[0]);
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="video" />

                                    {/* <label htmlFor="category">Category</label>
                            <Field name="category" as="select" multiple>
                                <option value="Action">Action</option>
                                <option value="Drama">Drama</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Horror">Horror</option>
                                <option value="Romance">Romance</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Crime">Crime</option>
                                <option value="Documentary">Documentary</option>
                                <option value="Sports">Sports</option>
                                <option value="Western">Western</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Animation">Animation</option>
                            </Field>
                            <ErrorMessage name="category" /> */}

                                    <label htmlFor="category">Category</label>
                                    <Field name="category" as="select" multiple>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category.categoryname}>
                                                {category.categoryname}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="category" />

                                    <label htmlFor="ageLimit">Age limit</label>
                                    <Field name="ageLimit" type="number" min="0" />
                                    <ErrorMessage name="ageLimit" />

                                    <label htmlFor="year">Year</label>
                                    <Field name="year" type="number" min="1900" />
                                    <ErrorMessage name="year" />

                                    <button type="submit">Submit</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </>
                : <Errorpage />}
        </>
    );
};
