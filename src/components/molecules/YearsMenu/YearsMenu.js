import React from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import PropTypes from 'prop-types';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 20px;
`;

const StyledListItem = styled.li``;

const YearsMenu = ({ yearsNames }) => (
  <StyledList>
    {yearsNames.length > 0 ? (
      yearsNames.map(yearName => (
        <StyledListItem key={yearName}>
          <MenuItem year clicked={0}>
            {yearName}
          </MenuItem>
        </StyledListItem>
      ))
    ) : (
      <StyledListItem>
        <MenuItem year className="noActive">
          Brak
        </MenuItem>
      </StyledListItem>
    )}
    ;
  </StyledList>
);

YearsMenu.propTypes = {
  yearsNames: PropTypes.array.isRequired,
};

export default YearsMenu;
