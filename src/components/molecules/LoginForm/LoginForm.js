import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import FormHeader from '../../atoms/FormHeader/FormHeader';
import FormInput from '../../atoms/FormInput/FormInput';
import FormError from '../../atoms/FormError/FormError';
import FormButton from '../../atoms/FormButton/FormButton';
import StyledForm from '../../atoms/Form/Form';
import ErrorWrapper from '../../atoms/ErrorWrapper/ErrorWrapper';

const LoginForm = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validate={values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Pole wymagane';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Błędny adres e-mail';
      }

      if (!values.password) errors.password = 'Pole wymagane';

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
        <FormInput withError label="E-mail" type="email" name="email" />
        <ErrorWrapper>
          <FormError name="email" component="div" />
        </ErrorWrapper>
        <FormInput withError label="Hasło" type="password" name="password" />
        <ErrorWrapper>
          <FormError name="password" component="div" />
        </ErrorWrapper>
        <FormButton clicked={0} type="submit" disabled={isSubmitting}>
          Zaloguj
        </FormButton>
        <FormButton clicked={0} as={Link} green="true" to="user/hours">
          Rejestracja
        </FormButton>
      </StyledForm>
    )}
  </Formik>
);

export default LoginForm;
