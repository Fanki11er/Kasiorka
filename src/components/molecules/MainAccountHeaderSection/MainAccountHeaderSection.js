import React from 'react';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MoneyRow from '../../atoms/MoneyRow/MoneyRow';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountStatus from '../../atoms/AccountStatus/AccountStatus';
import AccountStats from '../AccountStats/AccountStats';
import DebitCardInfo from '../DebitCardInfo/DebitCardInfo';
import MainAccountIcon from '../../atoms/MainAccountIcon/MainAccountIcon';
import {
  createStats,
  calculateExpensesPercent,
  createExtendedComputedStatus,
} from '../../../tools/moneyTools';

const StyledMargin = styled.div`
  margin: 5px 0;
`;

const StyledHeaderWithIcon = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(MainAccountIcon)`
  margin: 0 10px 0 0;
  user-select: none;
  pointer-events: none;
`;
const MainAccountHeaderSection = ({
  accountLabel,
  payment,
  currency,
  computedStatus,
  selectedMonth,
  debit,
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
  const debitStatus = createExtendedComputedStatus(computedStatus, { debit });

  return (
    <AccountStyledSection>
      <StyledHeaderWithIcon>
        <StyledIcon />
        <AccountHeader label={accountLabel} />
      </StyledHeaderWithIcon>
      <MoneyRow label={'Wypłata'} content={actualPayment} units={currency} />
      <StyledMargin />
      <DebitCardInfo
        amount={debit}
        label={'Debet:'}
        units={currency}
        settings={['mainAccount', 'debit']}
      />
      <AccountStatus units={currency} status={computedStatus} />
      {debit > 0 && <AccountStatus units={currency} status={debitStatus} label={'Z debetem'} />}
      <AccountStats
        label={'Wydatki / Przychody'}
        expensesPercents={expensesPercents}
        stats={stats}
        units={currency}
      />
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
    debit: months[selectedMonthId].mainAccount.cardSettings.debit || 0,
  };
};

MainAccountHeaderSection.propTypes = {
  accountLabel: PropTypes.string,
  selectedMonthId: PropTypes.number,
  currency: PropTypes.string,
  computedStatus: PropTypes.object,
  payment: PropTypes.object,
  debit: PropTypes.number,
};

MainAccountHeaderSection.defaultProps = {
  accountLabel: 'Konto główne',
  selectedMonthId: 0,
  debit: 0,
};

export default connect(mapStateToProps)(MainAccountHeaderSection);
