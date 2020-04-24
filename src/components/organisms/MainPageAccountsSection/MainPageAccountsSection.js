import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MainPageSectionHeader from '../../molecules/MainPageSectionHeader/MainPageSectionHeder';
import TileSection from '../../organisms/TilesSection/TilesSection';
const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 0 50px;
  min-height: 200px;
  @media screen and (max-width: 770px) {
    width: 95%;
    padding: 0 20px;
  }
`;

const MainPageAccountsSection = ({ labelText, imageObj, tilesArr }) => {
  return (
    <StyledSection>
      <MainPageSectionHeader labelText={labelText} imageObj={imageObj} />
      <TileSection tilesArr={tilesArr} />
    </StyledSection>
  );
};

MainPageAccountsSection.propTypes = {
  labelText: PropTypes.string,
  image: PropTypes.string,
  tilesArr: PropTypes.arrayOf(
    PropTypes.shape({
      tileLabel: PropTypes.string,
      tileImage: PropTypes.shape({
        image: PropTypes.string,
        alt: PropTypes.string,
      }),
    }),
  ),
};

export default MainPageAccountsSection;
