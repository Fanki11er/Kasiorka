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

const StyledFlex = styled.div`
  display: flex;
  justify-content: center;
`;

const AccountFixedExpensesSection = ({
  accountLabel,
  transactions,
  currency,
  type,
  renderExpenses,
  toggleExpensesModal,
  toggleDeleteFixedTransactionsModal,
  selectedMonthId,
  path,
}) => {
  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} forSection={true} />
      <StyledMainSection>
        {transactions !== undefined &&
          transactions.length > 0 &&
          renderExpenses(transactions, currency, type)}
        <StyledFlex>
          <AccountButton onClick={() => toggleExpensesModal(null, type, 'addFixed')}>
            Add
          </AccountButton>
          <AccountButton onClick={() => toggleDeleteFixedTransactionsModal(selectedMonthId, path)}>
            Delete
          </AccountButton>
        </StyledFlex>
      </StyledMainSection>
    </AccountStyledSection>
  );
};

const mapStateToProps = (
  { money: { months }, user: { hoursSettings } },
  { selectedMonthId, path },
) => {
  return {
    accountLabel: months[selectedMonthId][path[0]][path[1]].name,
    transactions: months[selectedMonthId][path[0]][path[1]].transactions,
    currency: hoursSettings.currency,
    type: months[selectedMonthId][path[0]][path[1]].path,
  };
};

AccountFixedExpensesSection.propTypes = {
  accountLabel: PropTypes.string,
  currency: PropTypes.string,
  expenses: PropTypes.array,
};

AccountFixedExpensesSection.defaultProps = {
  accountLabel: 'Wydatki stałe',
  transactions: [],
};

export default connect(mapStateToProps)(AccountFixedExpensesSection);
