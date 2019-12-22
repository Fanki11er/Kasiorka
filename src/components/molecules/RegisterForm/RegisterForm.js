import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import FormHeader from '../../atoms/FormHeader/FormHeader';
import FormInput from '../../atoms/FormInput/FormInput';
import FormError from '../../atoms/FormError/FormError';
import FormButton from '../../atoms/FormButton/FormButton';
import StyledForm from '../../atoms/Form/Form';

const StyledRegisterForm = styled(StyledForm)`
  height: 150%;
  align-self: center;
`;

const RegisterForm = () => (
  <Formik
    initialValues={{ email: '', password: '', repeatedPassword: '', name: '' }}
    validate={values => {
      const errors = {};

      if (!values.name) errors.name = 'Pole wymagane';
      else if (values.name.length < 2) errors.name = 'Długość imienia to min 2 znaki';

      if (!values.email) {
        errors.email = 'Pole wymagane';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Błędny adres e-mail';
      }

      if (!values.password) errors.password = 'Pole wymagane';
      else if (values.password.length < 5) errors.password = 'Długość hasła to min 4 znaki';

      if (values.password !== values.repeatedPassword) errors.password = 'Błędne hasło';
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <StyledRegisterForm noValidate>
        <FormHeader>Rejestracja</FormHeader>
        <FormInput label="Imię" type="Text" name="name" />
        <FormError name="name" component="div" />
        <FormInput label="E-mail" type="email" name="email" />
        <FormError name="email" component="div" />
        <FormInput label="Hasło" type="password" name="password" />
        <FormInput label="Powtórz hasło" type="password" name="repeatedPassword" />
        <FormError name="password" component="div" />
        <FormButton type="submit" disabled={isSubmitting}>
          Zarejestruj
        </FormButton>
        <FormButton as={Link} green="true" to="/hours">
          Logowanie
        </FormButton>
      </StyledRegisterForm>
    )}
  </Formik>
);

export default RegisterForm;
