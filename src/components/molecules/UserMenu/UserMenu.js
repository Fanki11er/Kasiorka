import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import UserName from '../../atoms/UserName/UserName';
import IsSavedInfo from '../../atoms/IsSavedInfo/IsSavedInfo';
import { signOut as signOutAction } from '../../../actions/authActions';

const StyledWrapper = styled.div`
  display: flex;
  flex-basis: 300px;
  justify-content: space-between;
`;

const StyledLogOut = styled(MenuItem)`
  width: 150px;
`;

const UserMenu = ({ signOut, userName, isSaved }) => {
  return (
    <StyledWrapper>
      <IsSavedInfo isSaved={isSaved} title={isSaved ? 'Saved' : 'Not saved'} />
      <UserName>{userName}</UserName>
      <StyledLogOut onClick={signOut}>Wyloguj</StyledLogOut>
    </StyledWrapper>
  );
};

UserMenu.propTypes = {
  signOut: PropTypes.func.isRequired,
  userName: PropTypes.string,
  isSaved: PropTypes.bool.isRequired,
};

UserMenu.defaultProps = {
  userName: 'Anonymous',
};

const mapStateToProps = state => {
  return {
    userName: state.user.name,
    isSaved: state.hours.isSaved,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
