import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MainPageTile from '../../molecules/MainPageTile/MainPageTile';

const StyledWrapper = styled.section`
  display: flex;
  flex-flow: wrap row;
  width: 80%;
  justify-content: space-around;
  align-self: center;
  padding: 0 50px;
  @media screen and (max-width: 770px) {
    width: 95%;
    padding: 0 15px;
  }
`;

const TilesSection = ({ tilesArr }) => {
  return <StyledWrapper>{renderTiles(tilesArr)}</StyledWrapper>;
};

TilesSection.propTypes = {
  tilesArr: PropTypes.arrayOf(
    PropTypes.shape({
      tileLabel: PropTypes.string,
      tileImage: PropTypes.shape({
        image: PropTypes.string,
        alt: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default TilesSection;

const renderTiles = (tilesArr) => {
  return (
    tilesArr &&
    tilesArr.map(({ tileLabel, tileImage }, index) => (
      <MainPageTile tileLabel={tileLabel} tileImage={tileImage} key={index} />
    ))
  );
};
