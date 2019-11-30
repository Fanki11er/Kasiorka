import styled from 'styled-components';

const MonthName = styled.button`
  width: 185px;
  height: 60px;
  font-size: 24px;
  border: 1px solid ${({ theme }) => theme.darkGray};
  background-color: ${({ theme, active }) => (active ? theme.menuActive : theme.menuBlue)};
`;

export default MonthName;
