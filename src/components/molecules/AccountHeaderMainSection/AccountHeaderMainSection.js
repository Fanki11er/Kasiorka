import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MoneyRows from '../../atoms/MoneyRow/MoneyRow';
import { sumAll as sumAllAction } from '../../../actions/moneyActions';

const StyledSection = styled.section``;

const AccountHeaderMainSection = ({
  payment,
  currency,
  amountFromLastMonth,
  realAmountFromThisMonth,
  predictedAmountFromThisMonth,
  sumAll,
  selectedMonthId,
}) => {
  const amountFromThisMonth = {
    realAmountFromThisMonth,
    predictedAmountFromThisMonth,
  };
  const showPayment = ({ paymentReceived, expectedPayout }) => {
    if (!paymentReceived && !expectedPayout) return { payment: 0, received: false };

    return payment.paymentReceived > 0
      ? { payment: paymentReceived, received: true }
      : { payment: expectedPayout, received: false };
  };

  const accountStatus = (amountFromLastMonth, amountFromThisMonth, payment) => {
    const real =
      amountFromLastMonth + amountFromThisMonth.realAmountFromThisMonth + payment.payment;
    console.log(payment.payment, 'payment');
    console.log(amountFromLastMonth, 'last');
    console.log(amountFromThisMonth.realAmountFromThisMonth, 'real');
    console.log(real, 'Summed');
    sumAll(real, selectedMonthId);
  };
  return (
    <StyledSection>
      {accountStatus(amountFromLastMonth, amountFromThisMonth, showPayment(payment))}
      <MoneyRows label={'Wypłata:'} content={showPayment(payment)} units={currency} />
    </StyledSection>
  );
};
const mapStateToProps = (
  {
    money: { months },
    money,
    user: { hoursSettings },
    prevYearData: { prevPayments, prevMoney },
    hours: { months: hourMonths },
  },
  { selectedMonthId },
) => {
  return {
    payment: selectedMonthId > 0 ? hourMonths[selectedMonthId - 1].payments : prevPayments,
    amountFromLastMonth:
      selectedMonthId > 0
        ? months[selectedMonthId - 1].statistics.mainAccount.totalSum
        : prevMoney.mainAccount,
    currency: hoursSettings.currency,
    realAmountFromThisMonth: months[selectedMonthId].statistics.mainAccount.realSum,
    predictedAmountFromThisMonth: months[selectedMonthId].statistics.mainAccount.predictedSum,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sumAll: (data, path) => dispatch(sumAllAction(data, path)),
  };
};

AccountHeaderMainSection.propTypes = {};

AccountHeaderMainSection.defaultProps = {
  amountFromLastMonth: 0,
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountHeaderMainSection);
