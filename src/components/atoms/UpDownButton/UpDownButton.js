import styled, { css } from 'styled-components';
import UpArrow from '../../../assets/icons/UpArrow.svg';
import DownArrow from '../../../assets/icons/DownArrow.svg';
import PropTypes from 'prop-types';

const UpDownButton = styled.button`
  width: calc(${({ theme }) => theme.rowHeight} / 2);
  height: calc(${({ theme }) => theme.rowHeight} / 2);
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.dayColour};
  background-repeat: no-repeat;
  background-size: 65%;
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
    width: calc(${({ theme }) => theme.daysHeightMediumScreen} / 2);
    height: calc(${({ theme }) => theme.daysHeightMediumScreen} / 2);
    background-size: 70%;
  }
  @media screen and (max-width: 767px) {
    width: calc(${({ theme }) => theme.daysHeightSmallScreen} / 2);
    height: calc(${({ theme }) => theme.daysHeightSmallScreen} / 2);
    background-size: 70%;
  }
`;

UpDownButton.propTypes = {
  upButton: PropTypes.bool,
  downButton: PropTypes.bool,
};

export default UpDownButton;
