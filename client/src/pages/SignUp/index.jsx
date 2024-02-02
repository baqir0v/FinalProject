import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"

export const SignUp = () => {
  return (
    <Formik
      initialValues={{ nickname: '', password: '', email: '', image: ""}}
      validationSchema={Yup.object({
        nickname: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .matches(/^[a-zA-Z][\w\s]*[^@#]$/, 'Invalid nickname')
          .required('Required'),
        password: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        image: Yup.string().required('Required'),
      })}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        const handleRegister = async ()=>{
            try {
              const resp = await axios.post("http://localhost:5500/api/users/register",values)
              console.log(resp);
            } catch (error) {
              console.log(error);
            }
        }
        handleRegister()
        // resetForm()
      }}
    >
      <Form>
        <label htmlFor="image">Image</label>
        <Field name="image" type="text" />
        <ErrorMessage name="image" />

        <label htmlFor="nickname">NickName</label>
        <Field name="nickname" type="text" />
        <ErrorMessage name="nickname" />

        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="text" />
        <ErrorMessage name="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};