import React, { useContext, useEffect, useState } from 'react';
import "./index.scss"
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { DarkmodeContext } from '../../Context/darkmodeContext';

export const AddMovies = () => {
    const { darkmode } = useContext(DarkmodeContext)
    const [data, setData] = useState([])

    const fetchData = async () => {
        const res = await fetch("http://localhost:5500/api/categories/")
        const jsonData = await res.json()
        setData(jsonData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleAddMovie = async (values) => {
        try {
            console.log("salam");
            const formData = new FormData();

            Object.keys(values).forEach((key) => {
                if (key === "cast") {
                    // Handle the 'cast' field as an array of objects
                    values.cast.forEach((castObj, index) => {
                        Object.keys(castObj).forEach((castKey) => {
                            formData.append(`cast[${index}].${castKey}`, castObj[castKey]);
                        });
                    });
                } else {
                    formData.append(key, values[key]);
                }
            });

            const resp = await axios.post("http://localhost:5500/api/movies/", formData);
            console.log("123");
            console.log(resp.data);
            console.log(values.category);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div id='addmovie' className={darkmode ? "darkaddmovie" : "lightaddmovie"}>
            <Formik
                initialValues={{ name: '', desc: '', lang: '', year: '', image: '', category: [], video: "", cast: [] }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Required'),
                    desc: Yup.string()
                        .required('Required'),
                    lang: Yup.string().required('Required'),
                    image: Yup.mixed().required('Required'),
                    video: Yup.mixed().required('Required'),
                    year: Yup.number().required('Required').min(1900, 'Must be at least 1900'),
                    category: Yup.array().required('Required'),
                    cast: Yup.array().of(Yup.object({
                        castName: Yup.string().required('Required'),
                    })).min(1, 'At least one cast member is required'),
                    // cast: Yup.array().required('Required'),
                })}
                onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    handleAddMovie(values)
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
                        <Field name="lang" type="lang" />
                        <ErrorMessage name="lang" />

                        <label htmlFor="image">Image</label>
                        <Field name="image">
                            {({ field, form }) => (
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={(event) => {
                                        form.setFieldValue("image", event.currentTarget.files[0]);
                                    }}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="image" />

                        <FieldArray name="cast">
                            {({ push, remove, form }) => (
                                <div>
                                    {values.cast && values.cast.length > 0 ? (
                                        values.cast.map((cast, index) => (
                                            <div key={index}>
                                                <label htmlFor={`cast.${index}.castName`}>Name</label>
                                                <Field
                                                    name={`cast.${index}.castName`}
                                                    type="text"
                                                />
                                                <button type="button" onClick={() => remove(index)}>
                                                    Remove
                                                </button>
                                            </div>
                                        ))
                                    ) : null}
                                    <button type="button" onClick={() => push({ castName: '' })}>
                                        Add Cast Member
                                    </button>

                                </div>
                            )}
                        </FieldArray>

                        <label htmlFor="video">Video</label>
                        <Field name="video">
                            {({ field, form }) => (
                                <input
                                    id="video"
                                    name="video"
                                    type="file"
                                    accept="video/*"
                                    onChange={(event) => {
                                        form.setFieldValue("video", event.currentTarget.files[0]);
                                    }}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="video" />


                        {/* <label htmlFor="category">Category</label>
                        <Field name="category" as="select" multiple>
                            <option value="Action">
                                Action
                            </option>
                            <option value="Drama">
                                Drama
                            </option>
                        </Field>
                        <ErrorMessage name="category" /> */}
                        <label>Categories</label>
                        <div role="group" aria-labelledby="checkbox-group" >
                             {data && data.map((cat) => (
                                <label className="container">
                                    <Field type="checkbox" name="category" value={cat._id} />
                                    {cat.categoryname}
                                    <span className="checkmark"></span>
                                </label>
                            ))}
                            {/* <label className="container">
                                <Field type="checkbox" name="category" value="Action" />
                                Action
                                <span className="checkmark"></span>
                            </label>
                            <label className="container">
                                <Field type="checkbox" name="category" value="Drama" />
                                Drama
                                <span className="checkmark"></span>
                            </label> */}
                        </div>
                        <ErrorMessage name="category" />

                        <label htmlFor="year">Year</label>
                        <Field name="year" type="number" min="1900" />
                        <ErrorMessage name="year" />

                        <button type="submit">Submit</button>
                    </Form>
                )}

            </Formik>
        </div>
    );
};