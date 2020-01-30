import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const DayName = styled.div`
  width: ${({ theme }) => theme.rowHeight};
  height: ${({ theme }) => theme.rowHeight};
  margin: 0 0 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  border: 1px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.dayNameColour};
  color: ${({ theme }) => theme.primaryFont};

  ${({ isSaturday }) =>
    isSaturday &&
    css`
      background-color: ${({ theme }) => theme.saturdayYellow};
      color: ${({ theme }) => theme.lighterFont};
    `}

  ${({ isSunday }) =>
    isSunday &&
    css`
      background-color: ${({ theme }) => theme.sundayRed};
      color: ${({ theme }) => theme.lighterFont};
    `}

    ${({ isHoliday }) =>
      isHoliday &&
      css`
        background-color: ${({ theme }) => theme.isHoliday};
        color: ${({ theme }) => theme.lighterFont};
      `}

      &:hover {
        cursor: default;
      }

    @media screen and (max-width: 1920px) {
    width: ${({ theme }) => theme.daysHeightMediumScreen};
    height: ${({ theme }) => theme.daysHeightMediumScreen};
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
    margin: 0 0 0 1px;
  }

  @media screen and (max-width: 767px) {
    width: ${({ theme }) => theme.daysHeightSmallScreen};
    height: ${({ theme }) => theme.daysHeightSmallScreen};
    font-size: ${({ theme }) => theme.fontSizeMedium.small};
    margin: 0 0 0 2px;
  }
`;

DayName.propTypes = {
  isSaturday: PropTypes.bool,
  isSunday: PropTypes.bool,
  isHoliday: PropTypes.bool,
};

DayName.defaultProps = {
  isSaturday: false,
  isSunday: false,
  isHoliday: false,
};

export default DayName;
