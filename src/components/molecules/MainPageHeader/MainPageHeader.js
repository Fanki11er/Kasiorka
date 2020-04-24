import React from 'react';
import styled from 'styled-components';
import TitleHeader from '../../atoms/TitleHeader/TitleHeader';
import MainPageImage from '../../atoms/MainPageImage/MainPageImage';
import SittingManImage from '../../../assets/images/sitting-man-image.svg';

const StyledWrapper = styled.div`
  display: flex;
  align-self: center;
  margin: 30px 0;
  align-items: center;
`;

const MainPageHeader = () => {
  return (
    <StyledWrapper>
      <TitleHeader />
      <MainPageImage imageObj={{ image: SittingManImage, alt: 'Sitting man image' }} />
    </StyledWrapper>
  );
};

export default MainPageHeader;
