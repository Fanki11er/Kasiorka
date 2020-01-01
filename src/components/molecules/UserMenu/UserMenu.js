import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import UserName from '../../atoms/UserName/UserName';
import { signOut as signOutAction } from '../../../actions/authActions';

const StyledWrapper = styled.div`
  display: flex;
  flex-basis: 300px;
  justify-content: space-between;
`;

const StyledLogOut = styled(MenuItem)`
  width: 150px;
`;

const UserMenu = ({ signOut }) => {
  return (
    <StyledWrapper>
      <UserName>Krzysiek</UserName>
      <StyledLogOut onClick={signOut} clicked={0}>
        Wyloguj
      </StyledLogOut>
    </StyledWrapper>
  );
};

UserMenu.propTypes = {
  signOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOutAction()),
  };
};

export default connect(null, mapDispatchToProps)(UserMenu);
