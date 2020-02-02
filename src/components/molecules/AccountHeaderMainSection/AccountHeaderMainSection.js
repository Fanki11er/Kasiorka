import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MoneyRows from '../../atoms/MoneyRow/MoneyRow';

const StyledSection = styled.section``;

const AccountHeaderMainSection = ({
  payment,
  currency,
  amountFromLastMonth,
  amountAvailableWithoutDebit,
}) => {
  const showPayment = ({ paymentReceived, expectedPayout }) => {
    if (!paymentReceived && !expectedPayout) return { payment: 0, received: false };

    return payment.paymentReceived > 0
      ? { payment: paymentReceived, received: true }
      : { payment: expectedPayout, received: false };
  };
  return (
    <StyledSection>
      <MoneyRows label={'Wypłata:'} content={showPayment(payment)} units={currency} />
      <MoneyRows label={'Poprzedni miesiąc:'} content={amountFromLastMonth} units={currency} />
      <MoneyRows
        label={'Dostępne bez debetu:'}
        content={amountAvailableWithoutDebit}
        units={currency}
      />
    </StyledSection>
  );
};
const mapStateToProps = (
  {
    money: { months },
    user: { hoursSettings },
    prevYearData: { prevPayments },
    hours: { months: hourMonths },
  },
  { selectedMonthId },
) => {
  return {
    payment: selectedMonthId > 0 ? hourMonths[selectedMonthId - 1].payments : prevPayments,
    amountFromLastMonth: months[selectedMonthId].mainAccount.header.amountFromLastMonth,
    amountAvailableWithoutDebit:
      months[selectedMonthId].mainAccount.header.amountAvailableWithoutDebit,
    currency: hoursSettings.currency,
  };
};
export default connect(mapStateToProps)(AccountHeaderMainSection);
