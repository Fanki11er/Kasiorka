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

  @media screen and (max-width: 1920px) {
    width: 480px;
    height: 360px;
    border-radius: 15px;
    padding: 15px 0;
  }
  @media screen and (max-width: 770px) {
    width: 320px;
    height: 400px;
    align-self: center;
  }
`;

export default StyledForm;
