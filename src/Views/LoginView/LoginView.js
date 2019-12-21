import React, { Component } from 'react';
import styled from 'styled-components';
import LoginImage from '../../components/atoms/LoginImage/LoginImage';
import TitleHeader from '../../components/atoms/TitleHeader/TitleHeader';
import LoginForm from '../../components/molecules/LoginForm/LoginForm';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  height: 100vh;
`;

class LoginView extends Component {
  render() {
    return (
      <StyledWrapper>
        <TitleHeader />
        <LoginForm />
        <LoginImage></LoginImage>
      </StyledWrapper>
    );
  }
}
export default LoginView;
