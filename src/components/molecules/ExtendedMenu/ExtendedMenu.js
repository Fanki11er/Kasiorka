import React, { Component } from 'react';
import styled from 'styled-components';
import { Settings } from 'styled-icons/feather';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px;
`;

const StyledMenuItem = styled(MenuItem)`
  width: 150px;
  height: px;
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
`;

const StyledIcon = styled(Settings)`
  width: 25%;
`;

class ExtendedMenu extends Component {
  render() {
    const { addNewYear } = this.props;
    return (
      <StyledWrapper>
        <StyledMenuItem onClick={addNewYear}>Dodaj nowy rok</StyledMenuItem>;
        <StyledMenuItem>Auto uzupełniannie</StyledMenuItem>;
        <StyledMenuItem>
          <StyledIcon />
        </StyledMenuItem>
        ;
      </StyledWrapper>
    );
  }
}
ExtendedMenu.propTypes = {
  addNewYear: PropTypes.func.isRequired,
};
export default ExtendedMenu;
