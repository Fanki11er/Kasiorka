import React from 'react';
import styled from 'styled-components';
import DayOfWeek from '../DayOfWeek/DayOfWeek';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 25px 20px;
`;

const Week = ({ children }) => <StyledWrapper>{children}</StyledWrapper>;

export default Week;
