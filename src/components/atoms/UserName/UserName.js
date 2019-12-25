import styled from 'styled-components';

const UserName = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.smaller};
  color: ${({ theme }) => theme.menuYellow};
`;

export default UserName;
