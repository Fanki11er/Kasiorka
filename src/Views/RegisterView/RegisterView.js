import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../../components/molecules/RegisterForm/RegisterForm';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  min-height: 100vh;
`;

const RegisterView = () => (
  <StyledWrapper>
    <RegisterForm />
  </StyledWrapper>
);

export default RegisterView;
