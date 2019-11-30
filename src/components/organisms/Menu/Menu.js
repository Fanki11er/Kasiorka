import React from 'react';
import styled from 'styled-components';
import YearsMenu from '../../molecules/YearsMenu/YearsMenu';
import MonthMenu from '../../molecules/MonthsMenu/MonthsMenu';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px;
`;

const Menu = () => (
  <StyledWrapper>
    <YearsMenu />
    <MonthMenu />
  </StyledWrapper>
);

export default Menu;
