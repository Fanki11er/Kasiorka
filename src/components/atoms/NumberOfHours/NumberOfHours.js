import styled from 'styled-components';

const NumberOfHours = styled.div`
  width: 85px;
  height: ${({ theme }) => theme.rowHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.hoursColour};
  color: ${({ theme }) => theme.primaryFont};
  margin: 0 2px;
  &:hover {
    cursor: default;
  }
  @media screen and (max-width: 1920px) {
    width: 55px;
    height: ${({ theme }) => theme.daysHeightMediumScreen};
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
    margin: 0 1px;
  }

  @media screen and (max-width: 767px) {
    width: 70px;
    height: ${({ theme }) => theme.daysHeightSmallScreen};
    font-size: ${({ theme }) => theme.fontSizeMedium.small};
    margin: 0 2px;
  }
`;

export default NumberOfHours;
