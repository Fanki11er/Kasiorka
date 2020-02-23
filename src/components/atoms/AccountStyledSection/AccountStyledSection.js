import styled from 'styled-components';

const AccountStyledSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  min-width: 450px;
  margin: 2px;
  @media screen and (max-width: 1920px) {
    min-width: 320px;
    width: 320px;
  }
`;

export default AccountStyledSection;
