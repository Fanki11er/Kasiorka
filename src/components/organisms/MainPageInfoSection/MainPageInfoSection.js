import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MainPageSectionHeader from '../../molecules/MainPageSectionHeader/MainPageSectionHeder';
import ExampleImage from '../../atoms/ExampleImage/ExampleImage';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 0 50px;
  min-height: 200px;
  @media screen and (max-width: 560px) {
    padding: 0 20px;
    width: 95%;
  }
`;

const MainPageInfoSection = ({ labelText, imageObj, exampleImage }) => {
  return (
    <StyledSection>
      <MainPageSectionHeader labelText={labelText} imageObj={imageObj} />
      <ExampleImage exampleImage={exampleImage} />
    </StyledSection>
  );
};

MainPageInfoSection.propTypes = {
  labelText: PropTypes.string,
  imageObj: PropTypes.shape({
    image: PropTypes.string,
    alt: PropTypes.string,
  }),
  exampleImage: PropTypes.any,
};

MainPageInfoSection.defaultProps = {
  labelText: '------',
};

export default MainPageInfoSection;
