import styled, { css } from 'styled-components';
import UpArrow from '../../../assets/icons/UpArrow.svg';
import DownArrow from '../../../assets/icons/DownArrow.svg';

const UpDownButton = styled.button`
  width: 43px;
  height: 43px;
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.dayColour};
  background-repeat: no-repeat;
  background-size: 35px;
  background-position: 50% 50%;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }

  ${({ upButton }) =>
    upButton &&
    css`
      background-image: url(${() => UpArrow});
    `}
  ${({ downButton }) =>
    downButton &&
    css`
      background-image: url(${() => DownArrow});
    `}
`;

export default UpDownButton;
