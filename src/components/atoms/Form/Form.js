import styled from 'styled-components';
import { Form } from 'formik';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 700px;
  height: 600px;
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 30px;
  align-self: flex-end;
  padding: 30px 0;
`;

export default StyledForm;
