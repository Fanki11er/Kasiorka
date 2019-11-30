import React from 'react';
import styled from 'styled-components';
import DayName from '../../atoms/DayName/DayName';
import DayNumber from '../../atoms/DayNumber/DayNumber';
import NumberOfHours from '../../atoms/NumberOfHours/NumberOfHours';
import ArrowsButton from '../ArrowsButton/ArrowsButton';

const StyledWrapper = styled.div`
  display: flex;
`;

const DayOfTheWeek = ({ number, name, holiday, hours }) => (
  <StyledWrapper>
    <DayNumber>{number}</DayNumber>
    <DayName holiday={holiday}>{name}</DayName>
    <NumberOfHours>{hours}</NumberOfHours>
    <ArrowsButton></ArrowsButton>
  </StyledWrapper>
);

export default DayOfTheWeek;
