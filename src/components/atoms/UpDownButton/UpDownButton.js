import styled, { css } from 'styled-components';
import UpArrow from '../../../assets/icons/UpArrow.svg';
import DownArrow from '../../../assets/icons/DownArrow.svg';

const UpDownButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.dayColour};
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 50% 50%;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
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
`;

export default UpDownButton;
