import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MainPageSectionLabel from '../../atoms/MainPageSectionLabel/MainPageSectionLabel';
import MainPageImage from '../../atoms/MainPageImage/MainPageImage';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
`;

const StyledLabel = styled(MainPageSectionLabel)`
  margin: 0;
  color: ${({ theme }) => theme.green};
`;

const MainPageTile = ({ tileLabel, tileImage }) => {
  return (
    <StyledWrapper>
      <MainPageImage imageObj={tileImage} />
      <StyledLabel>{tileLabel}</StyledLabel>
    </StyledWrapper>
  );
};

MainPageTile.propTypes = {
  tileLabel: PropTypes.string,
  tileImage: PropTypes.shape({
    image: PropTypes.string,
    alt: PropTypes.string,
  }),
};

MainPageTile.defaultProps = {
  tileLabel: '----',
};

export default MainPageTile;
