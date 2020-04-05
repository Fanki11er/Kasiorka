import React from 'react';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountStatus from '../../atoms/AccountStatus/AccountStatus';
import AccountStats from '../AccountStats/AccountStats';
import DebitCardInfo from '../DebitCardInfo/DebitCardInfo';
import ClosePeriodButton from '../../atoms/ClosePeriodButton/ClosePeriodButton';
import {
  createStats,
  calculateExpensesPercent,
  createExtendedComputedStatus,
  choseInterest,
  checkIsPrevPeriodClosed,
} from '../../../tools/moneyTools';
import { closePeriod as closePeriodAction } from '../../../actions/moneyActions';

const DebitCardHeaderSection = ({
  accountLabel,
  cardSettings: { debit, interestRate },
  cardSettings,
  currency,
  computedStatus,
  selectedMonth,
  interests,
  isPeriodClosed,
  selectedMonthId,
  path,
  closePeriod,
  isPrevPeriodClosed,
}) => {
  const stats = createStats(selectedMonth, { payment: debit }, 'debitCard');
  const expensesPercents = calculateExpensesPercent(stats);
  const extendedComputedStatus = createExtendedComputedStatus(computedStatus, cardSettings);
  const interest = choseInterest(isPeriodClosed, interests);

  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} />
      <DebitCardInfo amount={debit} label={'Debet:'} units={currency} />
      <DebitCardInfo amount={interestRate} label={'Oprocentowanie:'} units={'%'} />
      <AccountStatus units={currency} status={extendedComputedStatus} label={'Środki'} />
      <DebitCardInfo amount={interest} label={'Odsetki:'} units={currency} editable={false} />
      <AccountStats label={'Wydatki / Środki'} expensesPercents={expensesPercents} />
      <ClosePeriodButton
        green="true"
        onClick={() => closePeriod(selectedMonthId, path)}
        className={isPeriodClosed || !isPrevPeriodClosed ? 'noActive' : null}
      >
        Zakończ okres
      </ClosePeriodButton>
    </AccountStyledSection>
  );
};

const mapStateToProps = (
  { money: { months }, user: { hoursSettings }, prevYearData: { prevMoney } },
  { selectedMonthId, path },
) => {
  return {
    accountLabel: months[selectedMonthId].debitCard.title,
    currency: hoursSettings.currency,
    computedStatus: months[selectedMonthId].computedData[path[0]],
    selectedMonth: months[selectedMonthId],
    cardSettings: months[selectedMonthId].debitCard.cardSettings,
    interests: months[selectedMonthId].debitCard.interests,
    isPeriodClosed: months[selectedMonthId].debitCard.isClosed,
    isPrevPeriodClosed: checkIsPrevPeriodClosed(prevMoney, selectedMonthId, months),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closePeriod: (selectedMonthId, path) => dispatch(closePeriodAction(selectedMonthId, path)),
  };
};

DebitCardHeaderSection.propTypes = {
  accountLabel: PropTypes.string,
  selectedMonthId: PropTypes.number,
  currency: PropTypes.string,
  computedStatus: PropTypes.object,
  cardSettings: PropTypes.object,
  interests: PropTypes.object,
  isPeriodClosed: PropTypes.bool,
  closePeriod: PropTypes.func,
  isPrevPeriodClosed: PropTypes.bool,
};

DebitCardHeaderSection.defaultProps = {
  accountLabel: 'Karta debetowa',
  selectedMonthId: 0,
  interests: {
    realInterest: 0,
    predictedInterest: 0,
  },
  debit: {
    debit: 0,
    interestRate: 0,
  },
  isPeriodClosed: false,
  isPrevPeriodClosed: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(DebitCardHeaderSection);
