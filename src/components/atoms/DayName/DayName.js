import styled from 'styled-components';

const DayName = styled.div`
  width: 85px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme, isHoliday }) =>
    isHoliday ? theme.holidayRed : theme.dayNameColour};
  color: ${({ theme }) => theme.primaryFont};
`;

export default DayName;
