import React from 'react';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import AccountHeaderMainSection from '../AccountHeaderMainSection/AccountHeaderMainSection';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import PropTypes from 'prop-types';

const AccountHeaderSection = ({ accountLabel, selectedMonthId }) => {
  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} />
      <AccountHeaderMainSection selectedMonthId={selectedMonthId} />
    </AccountStyledSection>
  );
};

const mapStateToProps = ({ money: { months } }, { selectedMonthId }) => {
  return {
    accountLabel: months[selectedMonthId].mainAccount.header.title,
  };
};

AccountHeaderSection.propTypes = {
  accountLabel: PropTypes.string,
  selectedMonthId: PropTypes.number,
};

AccountHeaderSection.defaultProps = {
  accountLabel: 'Konto główne',
  selectedMonthId: 0,
};

export default connect(mapStateToProps)(AccountHeaderSection);
