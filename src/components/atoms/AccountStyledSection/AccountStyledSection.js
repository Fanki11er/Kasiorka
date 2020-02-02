import styled from 'styled-components';

const AccountStyledSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  min-width: 450px;
  margin: 2px;
`;

export default AccountStyledSection;
