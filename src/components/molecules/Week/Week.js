import React from 'react';
import styled from 'styled-components';
import DayOfTheWeek from '../DayOfWeek/DayOfWeek';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 25px;
`;

const Week = () => (
  <StyledWrapper>
    <DayOfTheWeek number={1} name={'PN'} holiday={false} hours={9}></DayOfTheWeek>
    <DayOfTheWeek number={2} name={'WT'} holiday={false} hours={9}></DayOfTheWeek>
    <DayOfTheWeek number={3} name={'ŚR'} holiday={false} hours={9}></DayOfTheWeek>
    <DayOfTheWeek number={4} name={'CZ'} holiday={false} hours={9}></DayOfTheWeek>
    <DayOfTheWeek number={5} name={'PT'} holiday={false} hours={9}></DayOfTheWeek>
    <DayOfTheWeek number={6} name={'SO'} holiday={false} hours={0}></DayOfTheWeek>
    <DayOfTheWeek number={7} name={'ND'} holiday={true} hours={0}></DayOfTheWeek>
  </StyledWrapper>
);

export default Week;
