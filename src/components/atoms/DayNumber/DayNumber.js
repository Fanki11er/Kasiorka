import styled from 'styled-components';

const DayNumber = styled.div`
  width: ${({ theme }) => theme.rowHeight};
  height: ${({ theme }) => theme.rowHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.dayColour};
  color: ${({ theme }) => theme.primaryFont};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export default DayNumber;
