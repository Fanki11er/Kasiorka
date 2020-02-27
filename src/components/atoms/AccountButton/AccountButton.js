import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const AccountButton = styled(MenuItem)`
  color: ${({ theme }) => theme.green};
  border: 2px solid ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smallest};
  height: ${({ theme }) => theme.rowHeightSmaller};
  align-self: center;
  margin: 10px 10px 5px;
  width: 100px;

  @media screen and (max-width: 1920px) {
    width: 70px;
    height: ${({ theme }) => theme.rowHeightMediumScreen};
    font-size: ${({ theme }) => theme.fontSizeMedium.verySmall};
    border-radius: 8px;
    margin: 10px 10px 0;
  }
`;

export default AccountButton;
