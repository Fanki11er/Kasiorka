import styled, { css } from 'styled-components';
import UpArrow from '../../../assets/icons/UpArrow.svg';
import DownArrow from '../../../assets/icons/DownArrow.svg';
import PropTypes from 'prop-types';

const UpDownButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.dayColour};
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 50% 50%;
  outline: none;

  &:hover,
  :focus {
    background-color: ${({ theme }) => theme.hover};
    cursor: pointer;
  }

  ${({ upButton }) =>
    upButton &&
    css`
      background-image: url(${() => UpArrow});
      border-top-right-radius: 10px;
    `}
  ${({ downButton }) =>
    downButton &&
    css`
      background-image: url(${() => DownArrow});
      border-bottom-right-radius: 10px;
    `}
    @media screen and (max-width: 1920px) {
    width: 21px;
    height: 21px;
    background-size: 15px;
  }
`;

UpDownButton.propTypes = {
  upButton: PropTypes.bool,
  downButton: PropTypes.bool,
};

export default UpDownButton;
