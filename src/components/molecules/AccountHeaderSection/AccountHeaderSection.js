import React from 'react';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import MoneyRow from '../../atoms/MoneyRow/MoneyRow';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountStatus from '../../atoms/AccountStatus/AccountStatus';
import PropTypes from 'prop-types';

const AccountHeaderSection = ({ accountLabel, payment, currency, computedStatus }) => {
  const showPayment = ({ paymentReceived, expectedPayout }) => {
    if (!paymentReceived && !expectedPayout) return { payment: 0, received: false };

    return payment.paymentReceived > 0
      ? { payment: paymentReceived, received: true }
      : { payment: expectedPayout, received: false };
  };

  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} />
      <MoneyRow label={'Wypłata:'} content={showPayment(payment)} units={currency} />
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
    accountLabel: months[selectedMonthId].mainAccount.title,
    payment: selectedMonthId > 0 ? hourMonths[selectedMonthId - 1].payments : prevPayments,
    currency: hoursSettings.currency,
    computedStatus: months[selectedMonthId].computedData[path[0]],
  };
};

AccountHeaderSection.propTypes = {
  accountLabel: PropTypes.string,
  selectedMonthId: PropTypes.number,
  currency: PropTypes.string,
  computedStatus: PropTypes.object,
};

AccountHeaderSection.defaultProps = {
  accountLabel: 'Konto główne',
  selectedMonthId: 0,
};

export default connect(mapStateToProps)(AccountHeaderSection);
