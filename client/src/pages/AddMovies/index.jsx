import React from 'react';
import "./index.scss"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export const AddMovies = () => {
    const handleRegister = async (values) => {
        try {
            console.log("salam");
            const formData = new FormData();
            
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
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
        <Formik
            initialValues={{ name: '', desc: '', lang: '', year: '',image: '', category: [], }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .required('Required'),
                desc: Yup.string()
                    .required('Required'),
                lang: Yup.string().required('Required'),
                image: Yup.mixed().required('Required'),
                year:Yup.string().required('Required'),
                category:Yup.array().required('Required')
            })}
            onSubmit={(values, { resetForm }) => {
                console.log(values);
                
                handleRegister(values)
            }}
        >
            <Form>
                <label htmlFor="name">Name</label>
                <Field name="name" type="text" />
                <ErrorMessage name="name" />

                <label htmlFor="desc">desc</label>
                <Field name="desc" type="text" />
                <ErrorMessage name="desc" />

                <label htmlFor="lang">lang </label>
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

                <label htmlFor="category">Category</label>
                <Field name="category" as="select" multiple>
                    <option value="Action">
                        Action
                    </option>
                    <option value="Drama">
                        Action
                    </option>
                </Field>
                <ErrorMessage name="category" />

                <label htmlFor="year">year Address</label>
                <Field name="year" type="number" />
                <ErrorMessage name="year" />

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};