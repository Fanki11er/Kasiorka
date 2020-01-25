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
    clicked === id && clicked !== undefined ? theme.menuBlue : 'transparent'};
  text-decoration: none;

  ${({ year }) =>
    year &&
    css`
      width: 150px;
    `}

  &:hover, :focus {
    color: ${({ theme, clicked, id, selected }) =>
      (clicked === id && clicked !== undefined) || selected ? 'none' : theme.hover};
    border: 2px solid
      ${({ theme, clicked, id, selected }) =>
        (clicked === id && clicked !== undefined) || selected ? 'none' : theme.hover};

    cursor: ${({ clicked, id, selected }) =>
      (clicked === id && clicked !== undefined) || selected ? 'normal' : 'pointer'};
  }

  &.noActive {
    pointer-events: none;
    border: 2px solid gray;
    color: gray;
    opacity: 0.5;
  }

  @media screen and (max-width: 1920px) {
    width: 100px;
    height: ${({ theme }) => theme.rowHeightMediumScreen};
    font-size: ${({ theme }) => theme.fontSizeMedium.verySmall};
    border-radius: 8px;
  }
`;
MenuItem.propTypes = {
  clicked: PropTypes.number,
  selected: PropTypes.bool,
  id: PropTypes.number,
  year: PropTypes.bool,
};

MenuItem.defaultProps = {
  year: undefined,
  selected: false,
  clicked: -1,
};
export default MenuItem;
