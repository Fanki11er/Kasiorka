import React from 'react';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MoneyRow from '../../atoms/MoneyRow/MoneyRow';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountStatus from '../../atoms/AccountStatus/AccountStatus';
import AccountStats from '../AccountStats/AccountStats';
import { createStats, calculateExpensesPercent } from '../../../tools/moneyTools';

const MainAccountHeaderSection = ({
  accountLabel,
  payment,
  currency,
  computedStatus,
  selectedMonth,
}) => {
  const showPayment = ({ paymentReceived, expectedPayout }) => {
    if (!paymentReceived && !expectedPayout) return { payment: 0, received: false };

    return payment.paymentReceived > 0
      ? { payment: paymentReceived, received: true }
      : { payment: expectedPayout, received: false };
  };

  const actualPayment = showPayment(payment);
  const stats = createStats(selectedMonth, actualPayment, 'mainAccount');
  const expensesPercents = calculateExpensesPercent(stats);

  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} />
      <MoneyRow label={'Wypłata'} content={actualPayment} units={currency} />
      <AccountStatus units={currency} status={computedStatus} />
      <AccountStats label={'Wydatki / Przychody'} expensesPercents={expensesPercents} />
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
    selectedMonth: months[selectedMonthId],
  };
};

MainAccountHeaderSection.propTypes = {
  accountLabel: PropTypes.string,
  selectedMonthId: PropTypes.number,
  currency: PropTypes.string,
  computedStatus: PropTypes.object,
  payment: PropTypes.object,
};

MainAccountHeaderSection.defaultProps = {
  accountLabel: 'Konto główne',
  selectedMonthId: 0,
};

export default connect(mapStateToProps)(MainAccountHeaderSection);
