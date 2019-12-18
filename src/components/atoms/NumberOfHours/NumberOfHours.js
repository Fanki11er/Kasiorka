import styled from 'styled-components';

const NumberOfHours = styled.div`
  width: 85px;
  height: ${({ theme }) => theme.rowHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.hoursColour};
  color: ${({ theme }) => theme.primaryFont};
  margin: 0 2px;
`;

export default NumberOfHours;
