import React from 'react';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MoneyRow from '../../atoms/MoneyRow/MoneyRow';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountStatus from '../../atoms/AccountStatus/AccountStatus';
import AccountStats from '../AccountStats/AccountStats';

const WalletHeaderSection = ({ accountLabel, currency, computedStatus }) => {
  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} />

      <AccountStatus units={currency} status={computedStatus} />
    </AccountStyledSection>
  );
};
const mapStateToProps = (
  {
    money: { months },
    prevYearData: { prevPayments },
    hours: { months: hourMonths },
    user: { hoursSettings },
  },
  { selectedMonthId, path },
) => {
  return {
    accountLabel: months[selectedMonthId].wallet.title,
    currency: hoursSettings.currency,
    computedStatus: months[selectedMonthId].computedData[path[0]],
    selectedMonth: months[selectedMonthId],
  };
};

export default connect(mapStateToProps)(WalletHeaderSection);
