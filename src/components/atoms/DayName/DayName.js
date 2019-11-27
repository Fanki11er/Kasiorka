import styled from 'styled-components';

const DayName = styled.div`
  width: 90px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme, holiday }) => (holiday ? theme.holidayRed : theme.dayNameColour)};
  color: ${({ theme }) => theme.primaryFont};
`;

export default DayName;
