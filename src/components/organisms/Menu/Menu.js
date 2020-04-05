import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  height: 100%;

  @media screen and (max-width: 1920px) {
    padding: 8px 20px 0 20px;
    max-width: ${({ theme }) => theme.menuWidth.mediumScreen};
  }
  @media screen and (max-width: 770px) {
    border: 2px solid ${({ theme }) => theme.menuBlue};
    border-radius: 10px;
    max-width: 100%;
    width: 100%;
    height: 100vh;
    z-index: 2;
    justify-content: center;
    transition: transform 0.8s;
    transform: translateX(-99.5%);
    transform: translateX(${({ isMenuOpened }) => (isMenuOpened ? 0 : `${-99.5}%`)});
  }
`;

const StyledMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 770px) {
    margin-top: 2%;
  }
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Menu = ({
  menuContext: {
    isMenuOpened,
    selectedYear,
    selectMonthOrYear,
    addNewYear,
    toggleSettingsModal,
    autoFilHoursMonth,
    limitOfYears,
    selectedMonthId,
    selectedPage,
  },
}) => (
  <StyledWrapper isMenuOpened={isMenuOpened}>
    <TitleHeader small />
    <StyledMenuWrapper>
      <StyledFlexWrapper>
        <YearsMenu selectedYear={selectedYear} selectMonthOrYear={selectMonthOrYear} />
        <ExtendedMenu
          addNewYear={addNewYear}
          toggleSettingsModal={toggleSettingsModal}
          autoFilHoursMonth={autoFilHoursMonth}
          limitOfYears={limitOfYears}
          selectedPage={selectedPage}
        />
      </StyledFlexWrapper>
      <MonthMenu selectMonthOrYear={selectMonthOrYear} selectedMonthId={selectedMonthId} />
    </StyledMenuWrapper>
  </StyledWrapper>
);

Menu.propTypes = {
  menuContext: PropTypes.object.isRequired,
};

export default withMenuContext(Menu);
