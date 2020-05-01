import React from 'react';
import styled from 'styled-components';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountStatus from '../../atoms/AccountStatus/AccountStatus';
import AccountStats from '../AccountStats/AccountStats';
import DebitCardInfo from '../DebitCardInfo/DebitCardInfo';
import ClosePeriodButton from '../../atoms/ClosePeriodButton/ClosePeriodButton';
import CardIcon from '../../atoms/CardIcon/CardIcon';
import {
  createStats,
  calculateExpensesPercent,
  createExtendedComputedStatus,
  choseInterest,
  checkIsPrevPeriodClosed,
} from '../../../tools/moneyTools';
import { closePeriod as closePeriodAction } from '../../../actions/moneyActions';
import { debitCardErrOccurred as debitCardErrOccurredAction } from '../../../actions/moneyActions';

const StyledHeaderWithIcon = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(CardIcon)`
  margin: 0 10px 0 0;
  user-select: none;
  pointer-events: none;
`;

const closePeriodButtonTitle = 'Zamyka okres rozliczeniowy na karcie debetowej';

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
  debitCardErrOccurred,
}) => {
  const stats = createStats(selectedMonth, { payment: debit }, 'debitCard');
  const expensesPercents = calculateExpensesPercent(stats);
  const extendedComputedStatus = createExtendedComputedStatus(computedStatus, cardSettings);
  checkStatus(extendedComputedStatus, debit, debitCardErrOccurred);
  const interest = choseInterest(isPeriodClosed, interests);

  return (
    <AccountStyledSection>
      <StyledHeaderWithIcon>
        <StyledIcon />
        <AccountHeader label={accountLabel} />
      </StyledHeaderWithIcon>
      <DebitCardInfo
        amount={debit}
        label={'Debet:'}
        units={currency}
        settings={['debitCard', 'debit']}
        editable={isPeriodClosed ? false : true}
      />
      <DebitCardInfo
        amount={interestRate}
        label={'Oprocentowanie:'}
        units={'%'}
        settings={['debitCard', 'interestRate']}
        editable={isPeriodClosed ? false : true}
      />
      <AccountStatus units={currency} status={extendedComputedStatus} label={'Środki'} />
      <DebitCardInfo amount={interest} label={'Odsetki:'} units={currency} editable={false} />
      <AccountStats
        label={'Wydatki / Środki'}
        expensesPercents={expensesPercents}
        stats={stats}
        units={currency}
      />
      <ClosePeriodButton
        green="true"
        onClick={() => closePeriod(selectedMonthId, path)}
        className={isPeriodClosed || !isPrevPeriodClosed ? 'noActive' : null}
        disabled={isPeriodClosed || !isPrevPeriodClosed ? true : false}
        title={closePeriodButtonTitle}
      >
        {showText(isPeriodClosed, isPrevPeriodClosed)}
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
    debitCardErrOccurred: () => dispatch(debitCardErrOccurredAction()),
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
  debitCardErrOccurred: PropTypes.func,
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

const checkStatus = (status, debit, callbackAction) => {
  const { monthTotal, monthTotalPredicted } = status;
  if (monthTotal > debit || monthTotalPredicted > debit) callbackAction();
};

const showText = (isPeriodClosed, isPrevPeriodClosed) => {
  if (!isPrevPeriodClosed) return 'Zamknij poprzednie okresy';
  if (isPeriodClosed) return 'Okres zamknięty';
  return 'Zamknij okres';
};
