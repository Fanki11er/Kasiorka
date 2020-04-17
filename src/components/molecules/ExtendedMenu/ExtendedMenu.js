import React, { Component } from 'react';
import styled from 'styled-components';
import { Settings } from 'styled-icons/feather';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 3px 3px 15px 3px;
`;

const StyledMenuItem = styled(MenuItem)`
  width: 150px;
  color: ${({ theme }) => theme.green};
  border: 2px solid ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smallest};
  transition: none;
  margin: 5px auto;
  transition: color 0.2s, background-color 0.2s, border 0.2s;
  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.green};
    border: 2px solid ${({ theme }) => theme.green};
    cursor: pointer;
  }

  @media screen and (max-width: 1920px) {
    height: 38px;
    font-size: ${({ theme }) => theme.fontSizeMedium.smallest};
    width: 95px;
  }
`;

const StyledIcon = styled(Settings)`
  width: 25%;
`;
const addYearTitle = 'Dodaje kolejny rok';
const autoFillTitle = 'Uzupełnia ( nadpisuje ) miesiąc według zapisanych ustawień';
const optionsTitle = 'Ustawienia autouzupełniania';
class ExtendedMenu extends Component {
  render() {
    const {
      addNewYear,
      toggleSettingsModal,
      autoFilHoursMonth,
      limitOfYears,
      selectedPage,
    } = this.props;
    const { pathname } = selectedPage;
    return (
      <StyledWrapper>
        <StyledMenuItem
          className={limitOfYears ? 'noActive' : null}
          onClick={addNewYear}
          title={addYearTitle}
        >
          Dodaj nowy rok
        </StyledMenuItem>

        {pathname === '/user/hours' && (
          <StyledMenuItem onClick={autoFilHoursMonth} title={autoFillTitle}>
            Auto uzupełnianie
          </StyledMenuItem>
        )}
        {pathname === '/user/hours' && (
          <StyledMenuItem title={optionsTitle} onClick={toggleSettingsModal}>
            <StyledIcon />
          </StyledMenuItem>
        )}
      </StyledWrapper>
    );
  }
}
ExtendedMenu.propTypes = {
  addNewYear: PropTypes.func.isRequired,
  toggleSettingsModal: PropTypes.func.isRequired,
  autoFilHoursMonth: PropTypes.func.isRequired,
  limitOfYears: PropTypes.bool.isRequired,
  selectedPage: PropTypes.object.isRequired,
};
export default ExtendedMenu;
