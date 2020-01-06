import styled from 'styled-components';

const ErrorInfo = styled.div`
  color: ${({ theme }) => theme.holidayRed};
  font-size: ${({ theme }) => theme.fontSize.smallest};
  width: 100%;
  height: 100%;
`;

export default ErrorInfo;