import React from 'react';
import styled from 'styled-components';
import DayOfTheWeek from '../DayOfWeek/DayOfWeek';
import { addDaysToSection, sections } from '../../../tools/index';

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  margin: 0 0 20px 0;
  width: 100%;
  justify-content: space-around;
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 20px;
  @media screen and (max-width: 1920px) {
    margin: 20px 15px;
  }
`;

const StyledInfo = styled.div`
  display: flex;
  font-size: 34px;
  text-align: center;
  align-self: center;
  justify-self: center;
  padding: 40px;
  color: ${({ theme }) => theme.hover};
  border: 2px solid ${({ theme }) => theme.hover};
  background-color: ${({ theme }) => theme.primary};
`;
const HoursSection = ({ months, monthId }) => {
  const days = months && months.length > 0 ? months[monthId].days : [];
  return (
    <StyledWrapper>
      {months && months.length > 0 ? (
        sections.map(({ rangeStart, rangeEnd }) => (
          <StyledSection key={rangeStart}>
            {addDaysToSection(days, rangeStart, rangeEnd).map(
              ({ dayId, nameOfDay, workHours, isSaturday, isSunday, isHoliday, holidayDesc }) => (
                <DayOfTheWeek
                  dayId={dayId}
                  nameOfDay={nameOfDay}
                  workHours={workHours}
                  isSaturday={isSaturday}
                  isSunday={isSunday}
                  isHoliday={isHoliday}
                  holidayDesc={holidayDesc}
                  key={dayId}
                  monthId={monthId}
                ></DayOfTheWeek>
              ),
            )}
          </StyledSection>
        ))
      ) : (
        <StyledInfo data-testid={'test'}>Nie udało się pobrać danych</StyledInfo>
      )}
    </StyledWrapper>
  );
};

export default HoursSection;
