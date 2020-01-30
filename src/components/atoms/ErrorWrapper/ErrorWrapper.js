import styled from 'styled-components';

const ErrorWrapper = styled.div`
  width: 100%;
  height: 40px;
  padding-left: 220px;
  @media screen and (max-width: 1920px) {
    height: 20px;
    padding-left: 120px;
  }
  @media screen and (max-width: 770px) {
    padding-left: 30px;
  }
`;

export default ErrorWrapper;
