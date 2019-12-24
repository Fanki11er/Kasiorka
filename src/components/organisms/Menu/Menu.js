import React from 'react';
import styled from 'styled-components';
import YearsMenu from '../../molecules/YearsMenu/YearsMenu';
import MonthMenu from '../../molecules/MonthsMenu/MonthsMenu';
import TitleHeader from '../../atoms/TitleHeader/TitleHeader';

const StyledWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 30px 0 30px;
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
    <TitleHeader small />
    <StyledMenuWrapper>
      <YearsMenu />
      <MonthMenu />
    </StyledMenuWrapper>
  </StyledWrapper>
);

export default Menu;
