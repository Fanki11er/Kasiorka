import React from 'react';
import styled from 'styled-components';
import YearsMenu from '../../molecules/YearsMenu/YearsMenu';
import MonthMenu from '../../molecules/MonthsMenu/MonthsMenu';
import TitleHeader from '../../atoms/TitleHeader/TitleHeader';
import ExtendedMenu from '../../molecules/ExtendedMenu/ExtendedMenu';
import withMenuContext from '../../../hoc/withMenuContext';

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

  justify-content: space-between;
`;

const Menu = ({ menuContext }) => (
  <StyledWrapper>
    <TitleHeader small />
    <StyledMenuWrapper>
      <StyledFlexWrapper>
        <YearsMenu />
        <ExtendedMenu addNewYear={menuContext.addNewYear} />
      </StyledFlexWrapper>
      <MonthMenu
        selectMonth={menuContext.selectMonth}
        selectedMonthId={menuContext.selectedMonthId}
      />
    </StyledMenuWrapper>
  </StyledWrapper>
);

export default withMenuContext(Menu);
