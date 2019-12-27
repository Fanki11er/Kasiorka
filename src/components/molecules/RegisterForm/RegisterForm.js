import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FormHeader from '../../atoms/FormHeader/FormHeader';
import FormInput from '../../atoms/FormInput/FormInput';
import FormError from '../../atoms/FormError/FormError';
import FormButton from '../../atoms/FormButton/FormButton';
import StyledForm from '../../atoms/Form/Form';
import RegistrationImage from '../../atoms/RegistrationImage/RegistrationImage';
import ErrorWrapper from '../../atoms/ErrorWrapper/ErrorWrapper';
import { signUp as signUpAction } from '../../../actions/authActions';

const StyledRegisterForm = styled(StyledForm)`
  height: 150%;
  align-self: center;
  position: relative;
`;

const RegisterForm = ({ signUp }) => (
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

      if (values.password !== values.repeatedPassword) errors.repeatedPassword = 'Błędne hasło';
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
      signUp(values);
    }}
  >
    {({ isSubmitting }) => (
      <StyledRegisterForm noValidate>
        <FormHeader>Rejestracja</FormHeader>
        <FormInput withError label="Imię" type="Text" name="name" />
        <ErrorWrapper>
          <FormError name="name" component="div" />
        </ErrorWrapper>
        <FormInput withError label="E-mail" type="email" name="email" />
        <ErrorWrapper>
          <FormError name="email" component="div" />
        </ErrorWrapper>
        <FormInput withError label="Hasło" type="password" name="password" />
        <ErrorWrapper>
          <FormError name="password" component="div" />
        </ErrorWrapper>
        <FormInput withError label="Powtórz hasło" type="password" name="repeatedPassword" />
        <ErrorWrapper>
          <FormError name="repeatedPassword" component="div" />
        </ErrorWrapper>
        <FormButton type="submit" disabled={isSubmitting}>
          Zarejestruj
        </FormButton>
        <FormButton as={Link} green="true" to="/">
          Logowanie
        </FormButton>
        <RegistrationImage />
      </StyledRegisterForm>
    )}
  </Formik>
);

const mapDispatchToProps = dispatch => {
  return {
    signUp: values => dispatch(signUpAction(values)),
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
