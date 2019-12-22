import styled from 'styled-components';
import { ErrorMessage } from 'formik';

const FormError = styled(ErrorMessage)`
  color: ${({ theme }) => theme.holidayRed};
  font-size: 24px;
  margin: 0;
`;
export default FormError;
