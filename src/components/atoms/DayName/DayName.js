import styled from 'styled-components';
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
  background-color: ${({ theme, isHoliday }) =>
    isHoliday ? theme.holidayRed : theme.dayNameColour};
  color: ${({ theme }) => theme.primaryFont};
`;

DayName.propTypes = {
  isHoliday: PropTypes.bool,
};

DayName.defaultProps = {
  isHoliday: false,
};

export default DayName;
