import React from 'react';
import styled from 'styled-components';
import YearsMenu from '../../molecules/YearsMenu/YearsMenu';
import MonthMenu from '../../molecules/MonthsMenu/MonthsMenu';

const StyledWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px 0 30px;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.primary};
  min-height: 100vh;
  max-height: 100vh;
`;

const StyledMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Menu = () => (
  <StyledWrapper>
    <StyledMenuWrapper>
      <YearsMenu />
      <MonthMenu />
    </StyledMenuWrapper>
  </StyledWrapper>
);

export default Menu;
