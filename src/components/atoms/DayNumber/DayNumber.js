import styled from 'styled-components';

const DayNumber = styled.div`
  width: 86px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.dayColour};
  color: ${({ theme }) => theme.primaryFont};
`;

export default DayNumber;
