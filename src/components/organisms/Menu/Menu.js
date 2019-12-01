import React from 'react';
import styled from 'styled-components';
import YearsMenu from '../../molecules/YearsMenu/YearsMenu';
import MonthMenu from '../../molecules/MonthsMenu/MonthsMenu';

const StyledWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  padding: 55px 30px;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.primary};
  min-height: 100vh;
  max-height: 100vh;
`;

const Menu = () => (
  <StyledWrapper>
    <YearsMenu />
    <MonthMenu />
  </StyledWrapper>
);

export default Menu;
