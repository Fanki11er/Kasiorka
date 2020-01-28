import React from 'react';
import styled from 'styled-components';
import regImage from '../../../assets/images/registration-image.svg';

const StyledImage = styled.img`
  width: 180px;
  position: absolute;
  right: -180px;
  bottom: 0;
  @media screen and (max-width: 1920px) {
    width: 120px;
    right: -122px;
  }
  @media screen and (max-width: 770px) {
    width: 50px;
    left: 0;
  }
`;

const RegistrationImage = () => <StyledImage src={regImage} alt="Login image" />;

export default RegistrationImage;
