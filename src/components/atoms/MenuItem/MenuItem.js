import styled, { css } from 'styled-components';

const MenuItem = styled.button`
  width: 185px;
  height: 60px;
  font-size: 24px;
  border: 1px solid ${({ theme }) => theme.darkGray};
  background-color: ${({ theme, active }) => (active ? theme.menuActive : theme.menuBlue)};

  ${({ year }) =>
    year &&
    css`
      width: 120px;
      font-size: ${({ theme }) => theme.fontSize.smaller};
      font-weight: bold;
    `}
`;

export default MenuItem;
