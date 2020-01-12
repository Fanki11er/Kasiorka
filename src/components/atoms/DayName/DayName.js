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
    `}

  ${({ isSunday }) =>
    isSunday &&
    css`
      background-color: ${({ theme }) => theme.sundayRed};
    `}
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
