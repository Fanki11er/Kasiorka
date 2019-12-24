import React from 'react';
import styled from 'styled-components';
import YearsMenu from '../../molecules/YearsMenu/YearsMenu';
import MonthMenu from '../../molecules/MonthsMenu/MonthsMenu';
import TitleHeader from '../../atoms/TitleHeader/TitleHeader';
import ExtendedMenu from '../../molecules/ExtendedMenu/ExtendedMenu';

const StyledWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 30px 0 30px;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.primary};
  min-height: 100%;
  max-height: 100vh;
`;

const StyledMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Menu = () => (
  <StyledWrapper>
    <TitleHeader small />
    <StyledMenuWrapper>
      <StyledFlexWrapper>
        <YearsMenu />
        <ExtendedMenu />
      </StyledFlexWrapper>
      <MonthMenu />
    </StyledMenuWrapper>
  </StyledWrapper>
);

export default Menu;
