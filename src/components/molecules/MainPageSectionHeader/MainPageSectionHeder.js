import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MainPageSectionLabel from '../../atoms/MainPageSectionLabel/MainPageSectionLabel';
import MainPageImage from '../../atoms/MainPageImage/MainPageImage';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
`;

const MainPageSectionHeader = ({ labelText, imageObj }) => {
  return (
    <StyledWrapper>
      <MainPageImage imageObj={imageObj} />
      <MainPageSectionLabel>{labelText}</MainPageSectionLabel>
    </StyledWrapper>
  );
};
MainPageSectionHeader.propTypes = {
  labelText: PropTypes.string,
  imageObj: PropTypes.shape({
    image: PropTypes.string,
    alt: PropTypes.string,
  }),
};

MainPageSectionLabel.defaultProps = {
  labelText: '------',
};

export default MainPageSectionHeader;
