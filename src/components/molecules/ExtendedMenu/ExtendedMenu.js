import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Settings } from 'styled-icons/feather';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import DataBaseIcon from '../../atoms/DataBaseIcon/DataBaseIcon';
import CheckIcon from '../../atoms/CheckIcon/CheckIcon';
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

const StyledSettingsIcon = styled(Settings)`
  width: 25%;
`;

const addYearTitle = 'Dodaje kolejny rok';
const autoFillTitle = 'Uzupełnia ( nadpisuje ) miesiąc według zapisanych ustawień';
const optionsTitle = 'Ustawienia autouzupełniania';
const savingTitle =
  'Zapisz (Dane zapisują się automatycznie, w razie potrzeby można zapisać je za pomocą tego przycisku)';
class ExtendedMenu extends Component {
  render() {
    const {
      addNewYear,
      toggleSettingsModal,
      autoFilHoursMonth,
      limitOfYears,
      selectedPage,
      forceDataSave,
      isMoneySaved,
      isHoursSaved,
    } = this.props;
    const { pathname } = selectedPage;
    return (
      <StyledWrapper>
        <StyledMenuItem title={savingTitle} onClick={forceDataSave}>
          <DataBaseIcon />
          <CheckIcon className={!isHoursSaved || !isMoneySaved ? 'notActiveIcon' : null} />
        </StyledMenuItem>

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
            <StyledSettingsIcon />
          </StyledMenuItem>
        )}
      </StyledWrapper>
    );
  }
}

const mapStateToProps = ({ money, hours }) => {
  return {
    isMoneySaved: money.isSaved,
    isHoursSaved: hours.isSaved,
  };
};
ExtendedMenu.propTypes = {
  addNewYear: PropTypes.func.isRequired,
  toggleSettingsModal: PropTypes.func.isRequired,
  autoFilHoursMonth: PropTypes.func.isRequired,
  limitOfYears: PropTypes.bool.isRequired,
  selectedPage: PropTypes.object.isRequired,
  isHoursSaved: PropTypes.bool,
  isMoneySaved: PropTypes.bool,
};
export default connect(mapStateToProps)(ExtendedMenu);
