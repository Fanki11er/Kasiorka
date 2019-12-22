import styled from 'styled-components';

const FormHeader = styled.h2`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.normal};
  margin: 30px 0;
  transform: translateX(-30px);
`;
export default FormHeader;
