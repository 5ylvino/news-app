import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(3, 'Password must be 8 characters at minimum')
    .required('Password is required')
});
