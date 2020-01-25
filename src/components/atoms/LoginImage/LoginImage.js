import React from 'react';
import styled from 'styled-components';
import loginImage from '../../../assets/images/login-image.svg';

const StyledImage = styled.img`
  width: 500px;
  align-self: flex-end;

  @media screen and (max-width: 1920px) {
    width: 315px;
  }
`;

const LoginImage = () => <StyledImage src={loginImage} alt="Login image" />;

export default LoginImage;
