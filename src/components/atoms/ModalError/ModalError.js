import styled from 'styled-components';
import { ErrorMessage } from 'formik';

const ModalError = styled(ErrorMessage)`
  color: ${({ theme }) => theme.sundayRed};
  font-size: 18px;
  margin: 0 0 3px 0;
  font-weight: bold;
  padding: 0;
  height: 15px;
  @media screen and (max-width: 1920px) {
    font-size: 14px;
  }
`;

export default ModalError;
