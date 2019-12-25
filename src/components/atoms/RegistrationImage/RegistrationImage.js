import React from 'react';
import styled from 'styled-components';
import regImage from '../../../assets/images/registration-image.svg';

const StyledImage = styled.img`
  width: 180px;
  position: absolute;
  right: -180px;
  bottom: 0;
`;

const RegistrationImage = () => <StyledImage src={regImage} alt="Login image" />;

export default RegistrationImage;
