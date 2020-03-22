import React from 'react';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountStatus from '../../atoms/AccountStatus/AccountStatus';
import AccountStats from '../AccountStats/AccountStats';
import DebitCardInfo from '../DebitCardInfo/DebitCardInfo';
import { createStats, calculateExpensesPercent } from '../../../tools/moneyTools';

const DebitCardHeaderSection = ({
  accountLabel,
  cardSettings: { debit, interestRate },
  currency,
  computedStatus,
  selectedMonth,
  interests,
}) => {
  const stats = createStats(selectedMonth, { payment: debit }, 'debitCard');
  const expensesPercents = calculateExpensesPercent(stats);

  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} />
      <DebitCardInfo amount={debit} label={'Debet:'} units={currency} />
      <DebitCardInfo amount={interestRate} label={'Oprocentowanie:'} units={'%'} />
      <AccountStatus units={currency} status={computedStatus} label={'Środki'} />
      <DebitCardInfo amount={interests} label={'Odesetki:'} units={currency} editable={false} />
      <AccountStats label={'Wydatki / Środki'} expensesPercents={expensesPercents} />
    </AccountStyledSection>
  );
};

const mapStateToProps = (
  { money: { months }, user: { hoursSettings } },
  { selectedMonthId, path },
) => {
  return {
    accountLabel: months[selectedMonthId].debitCard.title,
    currency: hoursSettings.currency,
    computedStatus: months[selectedMonthId].computedData[path[0]],
    selectedMonth: months[selectedMonthId],
    cardSettings: months[selectedMonthId].debitCard.cardSettings,
    interests: months[selectedMonthId].debitCard.interests,
  };
};

DebitCardHeaderSection.propTypes = {
  accountLabel: PropTypes.string,
  selectedMonthId: PropTypes.number,
  currency: PropTypes.string,
  computedStatus: PropTypes.object,
  cardSettings: PropTypes.object,
  interests: PropTypes.number,
};

DebitCardHeaderSection.defaultProps = {
  accountLabel: 'Karta debetowa',
  selectedMonthId: 0,
  interests: 0,
  debit: {
    debit: 0,
    interestRate: 0,
  },
};

export default connect(mapStateToProps)(DebitCardHeaderSection);
