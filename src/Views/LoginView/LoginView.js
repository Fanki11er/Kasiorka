import React, { Component } from 'react';
import styled from 'styled-components';
import LoginImage from '../../components/atoms/LoginImage/LoginImage';
import TitleHeader from '../../components/atoms/TitleHeader/TitleHeader';
import LoginForm from '../../components/molecules/LoginForm/LoginForm';
import Footer from '../../components/atoms/Footer/Footer';
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  min-height: 100vh;
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

class LoginView extends Component {
  render() {
    return (
      <StyledWrapper>
        <TitleHeader />
        <StyledFlexWrapper>
          <LoginImage></LoginImage>
          <LoginForm />
        </StyledFlexWrapper>
        <Footer />
      </StyledWrapper>
    );
  }
}
export default LoginView;
