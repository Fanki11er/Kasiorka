import styled from 'styled-components';

const DayNumber = styled.div`
  width: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: #0a3ea6;
  color: ${({ theme }) => theme.primaryFont};
`;

export default DayNumber;
