import styled from 'styled-components';

const ErrorInfo = styled.div`
  color: ${({ theme }) => theme.sundayRed};
  font-size: ${({ theme }) => theme.fontSize.smallest};
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.verySmall};
  }
`;

export default ErrorInfo;
