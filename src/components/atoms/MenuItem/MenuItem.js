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
  transition: color, background-color 0.4s;
  color: ${({ theme, clicked, id }) =>
    parseFloat(clicked) === id ? theme.primary : theme.menuBlue};
  background-color: ${({ theme, clicked, id }) =>
    parseFloat(clicked) === id ? theme.menuBlue : 'transparent'};

  ${({ year }) =>
    year &&
    css`
      width: 120px;
    `}

  &:hover {
    color: ${({ theme, clicked, id, selected }) =>
      parseFloat(clicked) === id || selected ? 'none' : theme.hover};
    border: 2px solid
      ${({ theme, clicked, id, selected }) =>
        parseFloat(clicked) === id || selected ? 'none' : theme.hover};
  }

  ${({ viewItem }) =>
    viewItem &&
    css`
      width: 150px;
      color: ${({ theme, selected }) => (selected ? theme.primary : theme.menuYellow)};
      border: 2px solid ${({ theme }) => theme.menuYellow};
      background-color: ${({ theme, selected }) => (selected ? theme.menuYellow : theme.primary)};
    `};

  ${({ addYearButton }) =>
    addYearButton &&
    css`
      width: 120px;
      color: ${({ theme }) => theme.green};
      border: 2px solid ${({ theme }) => theme.green};
      font-size: ${({ theme }) => theme.fontSize.smallest};
      margin-top: ${({ theme }) => theme.rowHeight};
      transition: none;
      &:hover {
        color: ${({ theme }) => theme.primary};
        background-color: ${({ theme }) => theme.green};
        border: 2px solid ${({ theme }) => theme.green};
      }
    `};
`;

export default MenuItem;
