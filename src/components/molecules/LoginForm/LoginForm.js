import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import { Link } from 'react-router-dom';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 700px;
  height: 600px;
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 30px;
  align-self: flex-end;
  margin-right: 250px;
  padding: 30px 0;
`;

const StyledInput = styled(Field)`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.menuBlue};
  font-size: 28px;
  padding: 0 20px;

  width: 400px;
  height: 60px;
  outline: none;
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  margin-left: 50px;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.normal};
  margin-bottom: 40px;
`;

const StyledHeader = styled.h2`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.normal};
  margin: 30px 0;
  transform: translateX(-30px);
`;

const StyledButton = styled(MenuItem)`
  width: 220px;
  margin-bottom: 20px;
  transform: translateX(65px);
  color: ${({ theme, green }) => (green === 'true' ? theme.green : theme.menuBlue)};
  border: 2px solid ${({ theme, green }) => (green === 'true' ? theme.green : theme.menuBlue)};
  padding: 10px;
  text-align: center;
`;

const StyledError = styled(ErrorMessage)`
  color: ${({ theme }) => theme.holidayRed};
  font-size: 24px;
  transform: translateY(-30px) translateX(-15px);
  margin: 0;
`;

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
      else if (values.password.length < 2) errors.password = 'Nie prawidłowe dane';
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <StyledForm noValidate>
        <StyledHeader>Logowanie</StyledHeader>
        <StyledLabel>
          E-mail
          <StyledInput type="email" name="email" />
        </StyledLabel>
        <StyledError name="email" component="div" />
        <StyledLabel>
          Hasło
          <StyledInput type="password" name="password" />
        </StyledLabel>
        <StyledError name="password" component="div" />
        <StyledButton type="submit" disabled={isSubmitting}>
          Zaloguj
        </StyledButton>
        <StyledButton as={Link} green="true" to="/hours">
          Rejestracja
        </StyledButton>
      </StyledForm>
    )}
  </Formik>
);

export default LoginForm;
