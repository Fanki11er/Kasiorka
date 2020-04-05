import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signIn as signInAction } from '../../../actions/authActions';
import FormHeader from '../../atoms/FormHeader/FormHeader';
import FormInput from '../../atoms/FormInput/FormInput';
import FormButton from '../../atoms/FormButton/FormButton';
import StyledForm from '../../atoms/Form/Form';
import ErrorWrapper from '../../atoms/ErrorWrapper/ErrorWrapper';
import ErrorInfo from '../../atoms/ErrorInfo/ErrorInfo';

const LoginForm = ({ signIn, auth, authErr }) => {
  if (auth.uid) return <Redirect to="/user" />;

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        signIn(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <StyledForm noValidate>
          <FormHeader>Logowanie</FormHeader>
          <FormInput withError label="E-mail" type="email" name="email" focused={true} />
          <ErrorWrapper></ErrorWrapper>
          <FormInput withError label="Hasło" type="password" name="password" />
          <ErrorWrapper>{authErr && <ErrorInfo>{authErr}</ErrorInfo>}</ErrorWrapper>
          <FormButton type="submit" green="true" disabled={isSubmitting}>
            Zaloguj
          </FormButton>
          <FormButton as={Link} to="/reg">
            Rejestracja
          </FormButton>
        </StyledForm>
      )}
    </Formik>
  );
};
LoginForm.propTypes = {
  signIn: PropTypes.func.isRequired,
  auth: PropTypes.object,
  authErr: PropTypes.string,
};

const mapStateToProps = ({ firebase, errors }) => {
  return {
    auth: firebase.auth,
    authErr: errors.authErr,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signInAction(credentials)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
