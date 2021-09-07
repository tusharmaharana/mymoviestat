import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Button from '../widgets/Button';

const AuthForm = props => {
  const { isSignUp, onSubmit, ...restProps } = props;
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      await onSubmit(values);
      setSubmitting(false);
      resetForm();
    } catch (err) {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={isSignUp ? signupSchema : signinSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form {...restProps}>
          {isSignUp ? <Field name="name" type="text" placeholder="Name" component={MyTextInput} /> : null}
          <Field
            name="email"
            type="email"
            placeholder="Email"
            autoComplete={isSignUp ? 'off' : 'on'}
            component={MyTextInput}
          />
          <Field
            name="password"
            type="password"
            placeholder="Password"
            autoComplete={isSignUp ? 'new-password' : 'password'}
            component={MyTextInput}
          />
          <Button disabled={isSubmitting} type="submit" title={isSignUp ? 'Sign Up' : 'Sign In'} />
        </Form>
      )}
    </Formik>
  );
};

const MyTextInput = props => {
  const { field, form } = props;
  // console.log(field, '\n', form, '\n');
  const error = form.touched[field.name] && form.errors[field.name] ? form.errors[field.name] : null;
  return (
    <div className="d-flex flex-column my-3">
      <input {...field} {...props} className={error ? 'border-danger' : ''} />
      <div className={error ? 'd-block text-danger' : 'd-none'}>{error}</div>
    </div>
  );
};

const initialValues = {
  name: '',
  email: '',
  password: ''
};

const signupSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().min(5).max(255).email('Invalid Email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(255, 'Too Long!').required('Required')
});

const signinSchema = Yup.object().shape({
  email: Yup.string().min(5).max(255).email('Invalid Email!').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(255, 'Too Long!').required('Required')
});

export default AuthForm;
