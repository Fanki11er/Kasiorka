import styled from 'styled-components';

const UserName = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.smaller};
  color: ${({ theme }) => theme.menuYellow};
  height: 40px;
  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.smaller};
  }
`;

export default UserName;
