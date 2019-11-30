import styled from 'styled-components';

const NumberOfHours = styled.div`
  width: 120px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.hoursColour};
  color: ${({ theme }) => theme.primaryFont};
`;

export default NumberOfHours;
