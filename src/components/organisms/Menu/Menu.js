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
        <YearsMenu
          selectedYear={menuContext.selectedYear}
          selectMonthOrYear={menuContext.selectMonthOrYear}
        />
        <ExtendedMenu
          addNewYear={menuContext.addNewYear}
          toggleSettingsModal={menuContext.toggleSettingsModal}
        />
      </StyledFlexWrapper>
      <MonthMenu
        selectMonthOrYear={menuContext.selectMonthOrYear}
        selectedMonthId={menuContext.selectedMonthId}
      />
    </StyledMenuWrapper>
  </StyledWrapper>
);

Menu.propTypes = {
  menuContext: PropTypes.object.isRequired,
};

export default withMenuContext(Menu);
