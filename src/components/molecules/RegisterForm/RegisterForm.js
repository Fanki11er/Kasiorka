import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormHeader from '../../atoms/FormHeader/FormHeader';
import FormInput from '../../atoms/FormInput/FormInput';
import FormError from '../../atoms/FormError/FormError';
import FormButton from '../../atoms/FormButton/FormButton';
import StyledForm from '../../atoms/Form/Form';
import RegistrationImage from '../../atoms/RegistrationImage/RegistrationImage';
import ErrorWrapper from '../../atoms/ErrorWrapper/ErrorWrapper';
import ErrorInfo from '../../atoms/ErrorInfo/ErrorInfo';
import { signUp as signUpAction } from '../../../actions/authActions';

const StyledRegisterForm = styled(StyledForm)`
  height: 150%;
  align-self: center;
  position: relative;
  @media screen and (max-width: 1920px) {
    height: 220%;
  }
`;

const RegisterForm = ({ signUp, auth, signUpErr }) => {
  if (auth.uid) return <Redirect to="/user/hours" />;

  return (
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
            {signUpErr ? <ErrorInfo>{signUpErr}</ErrorInfo> : null}
          </ErrorWrapper>
          <FormInput withError label="Hasło" type="password" name="password" />
          <ErrorWrapper>
            <FormError name="password" component="div" />
          </ErrorWrapper>
          <FormInput withError label="Powtórz hasło" type="password" name="repeatedPassword" />
          <ErrorWrapper>
            <FormError name="repeatedPassword" component="div" />
          </ErrorWrapper>
          <FormButton type="submit" green="true" disabled={isSubmitting}>
            Zarejestruj
          </FormButton>
          <FormButton as={Link} to="/">
            Logowanie
          </FormButton>
          <RegistrationImage />
        </StyledRegisterForm>
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  signUp: PropTypes.func.isRequired,
  auth: PropTypes.object,
};
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    signUpErr: state.errors.signUpErr,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: values => dispatch(signUpAction(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
