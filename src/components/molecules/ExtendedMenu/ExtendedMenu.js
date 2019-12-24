import React, { Component } from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';

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

class ExtendedMenu extends Component {
  render() {
    return (
      <StyledWrapper>
        <StyledMenuItem>Dodaj nowy rok</StyledMenuItem>;
        <StyledMenuItem>Auto uzupełniannie</StyledMenuItem>;
        <StyledMenuItem>Dodaj dzień świąteczny</StyledMenuItem>;
      </StyledWrapper>
    );
  }
}

export default ExtendedMenu;
