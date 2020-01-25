import styled from 'styled-components';
import { ErrorMessage } from 'formik';

const FormError = styled(ErrorMessage)`
  color: ${({ theme }) => theme.sundayRed};
  font-size: 24px;
  margin: 0;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.verySmall};
  }
`;
export default FormError;
