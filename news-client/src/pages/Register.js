import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import { registerSchema } from '../validation/register-schema';
import httpClient from '../service/client';
import { API_ENDPOINTS } from '../service/api-endpoints';
import { encryptData } from '../utils/encrypt-decrypt';

const Register = () => {
  const handleOnSubmit = (values, setSubmitting) => {
    httpClient
      .post(API_ENDPOINTS.register, values)
      .then(({ data }) => {
        setSubmitting(false);
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
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        }}
        validationSchema={registerSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleOnSubmit(values, setSubmitting)
        }>
        {({ isSubmitting }) => (
          <Form className='bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200'>
            <h2 className='text-xl font-bold mb-4'>Register</h2>
            <Field
              name='first_name'
              type='text'
              placeholder='First Name'
              className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none'
            />
            <ErrorMessage
              name='first_name'
              component='div'
              className='text-red-500 text-sm'
            />
            <Field
              name='last_name'
              type='text'
              placeholder='Last Name'
              className='w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none'
            />
            <ErrorMessage
              name='last_name'
              component='div'
              className='text-red-500 text-sm'
            />
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
              name='password'
              component='div'
              className='text-red-500 text-sm'
            />
            <button
              className='w-full bg-orange-600 text-white py-2 rounded-lg'
              disabled={isSubmitting}>
              {isSubmitting ? 'loading...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
