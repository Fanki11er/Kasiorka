import React, { Component } from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

class ViewMenu extends Component {
  render() {
    return (
      <StyledWrapper>
        <MenuItem clicked={0} viewItem selected>
          Godziny
        </MenuItem>
        <MenuItem clicked={0} viewItem>
          Kasiorka
        </MenuItem>
      </StyledWrapper>
    );
  }
}

export default ViewMenu;
