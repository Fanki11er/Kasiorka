import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledImage = styled.img`
  width: 100px;
  margin: 10px;
  max-height: 65px;
  user-select: none;
`;

const MainPageImage = ({ imageObj }) => {
  const { image, alt } = imageObj;
  return <StyledImage src={image} alt={alt} />;
};

MainPageImage.propTypes = {
  imageObj: PropTypes.shape({
    image: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
};

export default MainPageImage;
