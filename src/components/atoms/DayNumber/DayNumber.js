import styled from 'styled-components';

const DayNumber = styled.div`
  width: ${({ theme }) => theme.rowHeight};
  height: ${({ theme }) => theme.rowHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.dayColour};
  color: ${({ theme }) => theme.primaryFont};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  user-select: none;
  &:hover {
    cursor: default;
  }
  @media screen and (max-width: 1920px) {
    width: ${({ theme }) => theme.daysHeightMediumScreen};
    height: ${({ theme }) => theme.daysHeightMediumScreen};
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
  }

  @media screen and (max-width: 767px) {
    width: ${({ theme }) => theme.daysHeightSmallScreen};
    height: ${({ theme }) => theme.daysHeightSmallScreen};
    font-size: ${({ theme }) => theme.fontSizeMedium.small};
  }
`;

export default DayNumber;
