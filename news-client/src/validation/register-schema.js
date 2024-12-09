import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(3, 'Password must be 8 characters at minimum')
    .required('Password is required')
});
