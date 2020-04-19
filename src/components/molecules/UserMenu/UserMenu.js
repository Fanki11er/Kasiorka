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
  align-items: center;

  @media screen and (max-width: 1920px) {
    flex-basis: 220px;
  }

  @media screen and (max-width: 770px) {
    width: 330px;
    height: 200px;
    justify-content: space-around;
  }
`;

const StyledLogOut = styled(MenuItem)`
  width: 150px;
  @media screen and (max-width: 1920px) {
    width: 95px;
  }
  @media screen and (max-width: 770px) {
    justify-self: flex-end;
    margin-left: 40px;
  }
`;

const UserMenu = ({
  signOut,
  userName,
  isSaved,
  moneyIsSaved,
  auth: { uid },
  sendHoursToDataBase,
}) => {
  const logOut = () => {
    sendHoursToDataBase(uid);
    setTimeout(signOut, 500);
  };
  return (
    <StyledWrapper>
      <IsSavedInfo
        isAllSaved={{ isSaved, moneyIsSaved }}
        title={isSaved ? 'Zapisane' : 'Nie zapisane'}
      />

      <UserName>{userName}</UserName>
      <StyledLogOut onClick={logOut}>Wyloguj</StyledLogOut>
    </StyledWrapper>
  );
};

UserMenu.propTypes = {
  signOut: PropTypes.func.isRequired,
  userName: PropTypes.string,
  isSaved: PropTypes.bool.isRequired,
  moneyIsSaved: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  sendHoursToDataBase: PropTypes.func.isRequired,
};

UserMenu.defaultProps = {
  userName: 'Anonymous',
};

const mapStateToProps = ({ user, hours, firebase, money }) => {
  return {
    userName: user.name,
    isSaved: hours.isSaved,
    moneyIsSaved: money.isSaved,
    auth: firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOutAction()),
    sendHoursToDataBase: (uid) => dispatch(sendHoursToDataBaseAction(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
