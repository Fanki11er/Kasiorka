import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledExampleImage = styled.img`
  display: flex;
  align-self: center;
  width: 320px;
  margin: 40px;
  user-select: none;
`;

const ExampleImage = ({ exampleImage }) => {
  const { image, alt } = exampleImage;
  return <StyledExampleImage src={image} alt={alt} />;
};

ExampleImage.propTypes = {
  exampleImage: PropTypes.shape({
    image: PropTypes.string,
    alt: PropTypes.string,
  }),
};

ExampleImage.defaultProps = {};

export default ExampleImage;
