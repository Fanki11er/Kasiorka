import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import AccountButton from '../../atoms/AccountButton/AccountButton';

const StyledMainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-content: space-around;
`;

const AccountFixedExpensesSection = ({
  accountLabel,
  expenses,
  currency,
  type,
  renderExpenses,
}) => {
  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} forSection={true} />
      <StyledMainSection>
        {expenses !== undefined && expenses.length > 0 && renderExpenses(expenses, currency, type)}
        <AccountButton>Edit</AccountButton>
      </StyledMainSection>
    </AccountStyledSection>
  );
};

const mapStateToProps = ({ money: { months }, user: { hoursSettings } }, { selectedMonthId }) => {
  return {
    accountLabel: months[selectedMonthId].mainAccount.fixedExpenses.name,
    expenses: months[selectedMonthId].mainAccount.fixedExpenses.transactions,
    currency: hoursSettings.currency,
    type: months[selectedMonthId].mainAccount.fixedExpenses.type,

    // reRender: months[selectedMonthId].mainAccount.fixedExpenses.expenses[0].real, // need to re render component
  };
};

AccountFixedExpensesSection.propTypes = {
  accountLabel: PropTypes.string,
  currency: PropTypes.string,
  expenses: PropTypes.array,
};

AccountFixedExpensesSection.defaultProps = {
  accountLabel: 'Wydatki stałe',
  expenses: [],
};

export default connect(mapStateToProps)(AccountFixedExpensesSection);
