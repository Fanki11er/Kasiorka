import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import FormHeader from '../../atoms/FormHeader/FormHeader';
import FormInput from '../../atoms/FormInput/FormInput';
import FormError from '../../atoms/FormError/FormError';
import FormButton from '../../atoms/FormButton/FormButton';
import StyledForm from '../../atoms/Form/Form';

const RegisterForm = () => (
  <Formik
    initialValues={{ email: '', password: '', repeatedPassword: '', name: '' }}
    validate={values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Pole wymagane';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Błędny adres e-mail';
      }

      if (!values.password) errors.password = 'Pole wymagane';
      else if (values.password.length < 2) errors.password = 'Nie prawidłowe dane';

      if (values.password !== values.repeatedPassword) errors.password = 'Błędne hasł0';
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <StyledForm noValidate>
        <FormHeader>Logowanie</FormHeader>
        <FormInput label="E-mail" type="email" name="email" />
        <FormError name="email" component="div" />
        <FormInput label="Hasło" type="password" name="password" />
        <FormError name="password" component="div" />
        <FormButton type="submit" disabled={isSubmitting}>
          Zaloguj
        </FormButton>
        <FormButton as={Link} green="true" to="/hours">
          Rejestracja
        </FormButton>
      </StyledForm>
    )}
  </Formik>
);

export default RegisterForm;
