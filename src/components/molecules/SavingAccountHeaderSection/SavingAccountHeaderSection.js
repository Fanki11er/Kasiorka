import React from 'react';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountStatus from '../../atoms/AccountStatus/AccountStatus';

const SavingAccountHeaderSection = ({ accountLabel, currency, computedStatus }) => {
  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} />

      <AccountStatus units={currency} status={computedStatus} />
    </AccountStyledSection>
  );
};
const mapStateToProps = (
  { money: { months }, user: { hoursSettings } },
  { selectedMonthId, path },
) => {
  return {
    accountLabel: months[selectedMonthId].savingAccount.title,
    currency: hoursSettings.currency,
    computedStatus: months[selectedMonthId].computedData[path[0]],
    selectedMonth: months[selectedMonthId],
  };
};

SavingAccountHeaderSection.propTypes = {
  accountLabel: PropTypes.string,
  currency: PropTypes.string,
  computedStatus: PropTypes.object,
};

SavingAccountHeaderSection.defaultProps = {
  accountLabel: 'None',
  currency: 'zł',
};

export default connect(mapStateToProps)(SavingAccountHeaderSection);
