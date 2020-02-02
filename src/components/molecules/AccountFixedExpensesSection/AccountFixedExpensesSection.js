import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import MoneyRow from '../../atoms/MoneyRow/MoneyRow';

const StyledMainSection = styled.section``;

const AccountFixedExpensesSection = ({ accountLabel, expenses, currency }) => {
  const renderExpenses = expenses => {
    return (
      expenses &&
      expenses.map(({ name, percentage, predicted, real }) => (
        <MoneyRow
          label={name}
          content={{ percentage, predicted, real }}
          units={currency}
          key={name}
        />
      ))
    );
  };

  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} forSection={true} />
      <StyledMainSection>{renderExpenses(expenses)}</StyledMainSection>
    </AccountStyledSection>
  );
};

const mapStateToProps = ({ money: { months }, user: { hoursSettings } }, { selectedMonthId }) => {
  return {
    accountLabel: months[selectedMonthId].mainAccount.fixedExpenses.name,
    expenses: months[selectedMonthId].mainAccount.fixedExpenses.expenses,
    currency: hoursSettings.currency,
  };
};

AccountFixedExpensesSection.propTypes = {
  accountLabel: PropTypes.string,
  currency: PropTypes.string,
  expenses: PropTypes.array,
};

AccountFixedExpensesSection.defaultProps = {
  accountLabel: 'Wydatki stałe',
};

export default connect(mapStateToProps)(AccountFixedExpensesSection);
