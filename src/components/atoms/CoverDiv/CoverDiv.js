import styled from 'styled-components';
import PropTypes from 'prop-types';

const CoverDiv = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ isModalOpened }) =>
    isModalOpened === true ? 'translateY(0)' : 'translateY(105%)'};
  transition: transform 0.6s;
`;

CoverDiv.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
};

export default CoverDiv;
