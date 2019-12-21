import React, { Component } from 'react';
import styled from 'styled-components';
import LoginImage from '../../components/atoms/LoginImage/LoginImage';
import TitleHeader from '../../components/atoms/TitleHeader/TitleHeader';

const StyledWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.primary};
  width: 100%;
  height: 100vh;
`;

class LoginView extends Component {
  render() {
    return (
      <StyledWrapper>
        <TitleHeader />
        <LoginImage></LoginImage>
      </StyledWrapper>
    );
  }
}
export default LoginView;
