import styled from 'styled-components';
import PropTypes from 'prop-types';

const CoverDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  transform: ${({ isModalOpened }) =>
    isModalOpened === true ? 'translateY(0)' : 'translateY(105%)'};
  transition: transform 0.6s;
  z-index: 10;
`;

CoverDiv.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
};

export default CoverDiv;
