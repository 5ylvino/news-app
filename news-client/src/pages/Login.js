import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import { loginSchema } from '../validation/login-schema';
import httpClient from '../service/client';
import { API_ENDPOINTS } from '../service/api-endpoints';
import { encryptData } from '../utils/encrypt-decrypt';

const Login = () => {
  const handleOnSubmit = (values, setSubmitting) => {
    httpClient
      .post(API_ENDPOINTS.login, values)
      .then(response => {
        setSubmitting(false);
        const data = response.data;
        if (!data?.error) {
          toast.success(data?.message);
          window.localStorage.setItem('active-token', encryptData(data?.data));
          window.location.replace('/');
        } else {
          toast.error(data?.message);
        }
      })
      .catch(error => {
        setSubmitting(false);
        toast.error(error?.message);
      });
  };

  return (
    <div className='h-screen flex items-center justify-center bg-white'>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleOnSubmit(values, setSubmitting)
        }>
        {({ isSubmitting }) => (
          <Form className='bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200'>
            <h2 className='text-xl font-bold mb-4'>Login</h2>
            <Field
              name='email'
              type='email'
              placeholder='Email'
              className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none'
            />
            <ErrorMessage
              name='email'
              component='div'
              className='text-red-500 text-sm'
            />

            <Field
              name='password'
              type='password'
              placeholder='Password'
              className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none'
            />
            <ErrorMessage
              name='email'
              component='div'
              className='text-red-500 text-sm'
            />

            <button
              className='w-full bg-orange-600 text-white py-2 rounded-lg'
              type='submit'
              disabled={isSubmitting}>
              Login
            </button>
            <p className='text-sm text-gray-500 mt-4 text-center'>
              Don’t have an account?{' '}
              <Link to='/register' className='text-orange-600'>
                Register
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
