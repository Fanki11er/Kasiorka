import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

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
  color: ${({ theme, clicked, id }) => (clicked === id ? theme.primary : theme.menuBlue)};
  background-color: ${({ theme, clicked, id }) =>
    clicked === id ? theme.menuBlue : 'transparent'};
  text-decoration: none;

  ${({ year }) =>
    year &&
    css`
      width: 120px;
    `}

  &:hover {
    color: ${({ theme, clicked, id, selected }) =>
      clicked === id || selected ? 'none' : theme.hover};
    border: 2px solid
      ${({ theme, clicked, id, selected }) => (clicked === id || selected ? 'none' : theme.hover)};

    cursor: ${({ clicked, id, selected }) => (clicked === id || selected ? 'normal' : 'pointer')};
  }

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
MenuItem.propTypes = {
  clicked: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  id: PropTypes.number,
  year: PropTypes.bool,
  viewItem: PropTypes.bool,
  addYearButton: PropTypes.bool,
};

MenuItem.defaultPropTypes = {
  year: false,
  viewItem: false,
  addYearButton: false,
  selected: false,
};
export default MenuItem;
