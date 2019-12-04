import styled, { css } from 'styled-components';

const MenuItem = styled.button`
  width: 185px;
  height: 60px;
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme, active }) => (active ? theme.menuActive : theme.menuBlue)};

  ${({ year }) =>
    year &&
    css`
      width: 120px;
      font-size: ${({ theme }) => theme.fontSize.smaller};
      font-weight: bold;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.hover};
    border: 2px solid ${({ theme }) => theme.hover};
  }
`;

export default MenuItem;
