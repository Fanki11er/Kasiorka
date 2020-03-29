import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  width: 335px;
  @media screen and (max-width: 1920px) {
    width: 225px;
    padding-left: 10px;
  }
`;

const StyledViewItem = styled(MenuItem)`
  width: 150px;
  color: ${({ theme }) => theme.menuYellow};
  border: 2px solid ${({ theme }) => theme.menuYellow};
  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  padding-top: 10px;
  margin: 0;

  &.noActive {
    pointer-events: none;
    border: 2px solid gray;
    color: gray;
    opacity: 0.5;
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.menuYellow};
    &:hover {
      color: ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.menuYellow};
      border: 2px solid ${({ theme }) => theme.menuYellow};
      cursor: context-menu;
    }
  }

  @media screen and (max-width: 1920px) {
    padding-top: 6px;
    width: 95px;
  }
`;

class ViewMenu extends Component {
  render() {
    return (
      <StyledWrapper>
        <StyledViewItem as={NavLink} to="/user/hours" activeclass="active">
          Godziny
        </StyledViewItem>
        <StyledViewItem as={NavLink} to="/user/money" activeclass="active">
          Kasiorka
        </StyledViewItem>
      </StyledWrapper>
    );
  }
}

export default ViewMenu;
