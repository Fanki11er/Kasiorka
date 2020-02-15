import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountStyledSection from '../../atoms/AccountStyledSection/AccountStyledSection';
import AccountHeader from '../../atoms/AccountHeader/AccountHeader';
import SumInfo from '../../atoms/SumInfo/SumInfo';
import AccountButton from '../../atoms/AccountButton/AccountButton';

const StyledMainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-content: space-around;
`;

const TransactionsSection = ({
  accountLabel,
  expenses,
  currency,
  type,
  toggleExpensesModal,
  renderExpenses,
}) => {
  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} forSection={true} />
      <StyledMainSection>
        {renderExpenses(expenses, currency, type)}
        <AccountButton onClick={() => toggleExpensesModal(null, type, 'add')}>Add</AccountButton>
      </StyledMainSection>
      <SumInfo expenses={expenses} units={currency} />
    </AccountStyledSection>
  );
};

const mapStateToProps = (
  { money: { months }, user: { hoursSettings } },
  { selectedMonthId, path },
) => {
  return {
    accountLabel: months[selectedMonthId][path[0]][path[1]].name,
    expenses: months[selectedMonthId][path[0]][path[1]].expenses,
    currency: hoursSettings.currency,
    type: months[selectedMonthId][path[0]][path[1]].type,
    //reRender: months[selectedMonthId].mainAccount.fixedExpenses.expenses[0].real, // need to re render component
  };
};

TransactionsSection.propTypes = {
  accountLabel: PropTypes.string,
  currency: PropTypes.string,
  expenses: PropTypes.array,
};

TransactionsSection.defaultProps = {
  accountLabel: 'Transakcje',
};

export default connect(mapStateToProps)(TransactionsSection);
