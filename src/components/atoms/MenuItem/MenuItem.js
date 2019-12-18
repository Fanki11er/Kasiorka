import styled, { css } from 'styled-components';

const MenuItem = styled.button`
  width: 185px;
  height: ${({ theme }) => theme.rowHeightSmall};
  margin: 3px 8px;
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  font-weight: bold;
  outline-style: none;
  color: ${({ theme, clicked, id }) =>
    parseFloat(clicked) === id ? theme.primary : theme.menuBlue};
  background-color: ${({ theme, clicked, id }) =>
    parseFloat(clicked) === id ? theme.menuBlue : 'transparent'};

  ${({ year }) =>
    year &&
    css`
      width: 120px;
      font-size: ${({ theme }) => theme.fontSize.verySmall};
      font-weight: bold;
    `}

  &:hover {
    color: ${({ theme }) => theme.hover};
    border: 2px solid ${({ theme }) => theme.hover};
  }
`;

export default MenuItem;
