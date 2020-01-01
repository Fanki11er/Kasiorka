import React from 'react';
import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StateIsLoaded from '../../atoms/StateIsLoaded/StateIsLoaded';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 20px;
`;

const StyledListItem = styled.li``;

const YearsMenu = ({ yearsList }) => (
  <StyledList>
    {yearsList && yearsList.length > 0 ? (
      yearsList.map(yearName => (
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
  yearsList: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    yearsList: state.user.yearsList,
  };
};

export default connect(mapStateToProps)(YearsMenu);
