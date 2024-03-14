import React, { useContext } from 'react';
import "./index.scss"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify"
import { Helmet } from "react-helmet-async"

export const SignUp = () => {
  const { darkmode } = useContext(DarkmodeContext)
  const navigate = useNavigate()
  return (
    <div id="signup" className={darkmode ? "darksign" : "lightsign"}>
      <Helmet>
        <title>
          Sign Up
        </title>
      </Helmet>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Formik
        initialValues={{ nickname: '', password: '', email: '', image: '', category: [] }}
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

              toast.success('User created successfully');
              const resp = await axios.post("http://localhost:5500/api/users/register", formData);
              console.log(resp.data);
              navigate("/payment")
            } catch (error) {
              toast.error('Error creating new user');
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

          <div className="inpfile">
            <label style={{ cursor: "pointer" }} htmlFor="fileInput" className="custom-file-upload">
              Upload Profile Picture
            </label>
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
          </div>
          <ErrorMessage name="image" />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          <button type="submit">Submit</button>

          <h3>Already have an account?: <Link to={"/login"}>Log In</Link></h3>
        </Form>
      </Formik>
    </div>
  );
};