import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import UserName from '../../atoms/UserName/UserName';
import IsSavedInfo from '../../atoms/IsSavedInfo/IsSavedInfo';
import { signOut as signOutAction } from '../../../actions/authActions';
import { sendHoursToDataBase as sendHoursToDataBaseAction } from '../../../actions/dataBaseActions';

const StyledWrapper = styled.div`
  display: flex;
  flex-basis: 300px;
  justify-content: space-between;
  @media screen and (max-width: 1920px) {
    flex-basis: 220px;
  }
`;

const StyledLogOut = styled(MenuItem)`
  width: 150px;
  @media screen and (max-width: 1920px) {
    width: 95px;
  }
`;

const UserMenu = ({ signOut, userName, isSaved, auth, sendHoursToDataBase }) => {
  const logOut = () => {
    const uid = auth.uid;
    sendHoursToDataBase(uid);
    setTimeout(signOut, 500);
  };
  return (
    <StyledWrapper>
      <IsSavedInfo isSaved={isSaved} title={isSaved ? 'Saved' : 'Not saved'} />
      <UserName>{userName}</UserName>
      <StyledLogOut onClick={logOut}>Wyloguj</StyledLogOut>
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
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOutAction()),
    sendHoursToDataBase: uid => dispatch(sendHoursToDataBaseAction(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
