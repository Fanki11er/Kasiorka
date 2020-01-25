import React, { Component } from 'react';
import styled from 'styled-components';
import { Settings } from 'styled-icons/feather';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px;
  height: 35%;
`;

const StyledMenuItem = styled(MenuItem)`
  width: 150px;
  color: ${({ theme }) => theme.green};
  border: 2px solid ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.smallest};
  transition: none;
  margin: 0 auto;
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

class ExtendedMenu extends Component {
  render() {
    const { addNewYear, toggleSettingsModal, autoFilHoursMonth, limitOfYears } = this.props;
    return (
      <StyledWrapper>
        <StyledMenuItem className={limitOfYears ? 'noActive' : null} onClick={addNewYear}>
          Dodaj nowy rok
        </StyledMenuItem>
        ;<StyledMenuItem onClick={autoFilHoursMonth}>Auto uzupełnianie</StyledMenuItem>;
        <StyledMenuItem title={'Ustawienia'} onClick={toggleSettingsModal}>
          <StyledIcon />
        </StyledMenuItem>
      </StyledWrapper>
    );
  }
}
ExtendedMenu.propTypes = {
  addNewYear: PropTypes.func.isRequired,
  toggleSettingsModal: PropTypes.func.isRequired,
};
export default ExtendedMenu;
