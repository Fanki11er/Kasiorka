import styled from 'styled-components';

const FormHeader = styled.h2`
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.normal};
  margin: 30px 0;
  transform: translateX(-30px);
  @media screen and (max-width: 1920px) {
    margin: 25px 0;
    font-size: ${({ theme }) => theme.fontSizeMedium.larger};
    transform: translateX(-40px);
  }
`;
export default FormHeader;
