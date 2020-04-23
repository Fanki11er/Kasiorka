import React from 'react';
import styled from 'styled-components';
import MainPageSectionLabel from '../../atoms/MainPageSectionLabel/MainPageSectionLabel';
import devicesImage from '../../../assets/images/devices-image.svg';

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const StyledImage = styled.img`
  width: 180px;
  margin: 40px;
`;

const labelText = 'Aplikacja jest dostępna na wielu urządzeniach';

const DevicesSection = () => {
  return (
    <StyledWrapper>
      <MainPageSectionLabel>{labelText}</MainPageSectionLabel>
      <StyledImage src={devicesImage} />
    </StyledWrapper>
  );
};

export default DevicesSection;
