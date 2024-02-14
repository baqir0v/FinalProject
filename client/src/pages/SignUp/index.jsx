import React, { useContext } from 'react';
import "./index.scss"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link } from 'react-router-dom';

export const SignUp = () => {
  const { darkmode } = useContext(DarkmodeContext)
  return (
    <div id="signup" className={darkmode ? "darksign" : "lightsign"}>
      <Formik
        initialValues={{ nickname: '', password: '', email: '', image: '',category: [] }}
        validationSchema={Yup.object({
          nickname: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .matches(/^[a-zA-Z][\w\s]*[^@#]$/, 'Invalid nickname')
            .required('Required'),
          password: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          image: Yup.mixed().required('Required'),
        })}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          const handleRegister = async () => {
            try {
              const formData = new FormData();
          
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });
          
          
              const resp = await axios.post("http://localhost:5500/api/users/register", formData);
              console.log(resp.data);
            } catch (error) {
              console.log(error);
            }
          };
          handleRegister()
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

          <label htmlFor="password">Password</label>
          <Field name="password" type="text" />
          <ErrorMessage name="password" />

          <Link to={"/home"}><button type="submit">Submit</button></Link>

          <h3>Already have an account?: <Link to={"/login"}>Log In</Link></h3>
        </Form>
      </Formik>
    </div>
  );
};