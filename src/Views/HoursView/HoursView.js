import React from 'react';
import styled from 'styled-components';
import Month from '../../components/organisms/Month/Month';
import { theme } from '../../themes/mainTheme';
import MonthMenu from '../../components/molecules/MonthsMenu/MonthsMenu';

const StyledWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.primary};
`;

const HoursView = () => (
  <StyledWrapper>
    <MonthMenu></MonthMenu>
    <Month></Month>
  </StyledWrapper>
);

export default HoursView;
