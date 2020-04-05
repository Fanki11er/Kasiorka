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

const TransactionsSection = ({
  accountLabel,
  transactions,
  currency,
  type,
  toggleExpensesModal,
  renderExpenses,
  isClosed,
}) => {
  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} forSection={true} />
      <AccountButton
        onClick={() => toggleExpensesModal(null, type, 'add')}
        className={isClosed ? 'noActive' : null}
      >
        Add
      </AccountButton>
      <StyledMainSection>
        {transactions.length > 0 && renderExpenses(transactions, currency, type)}
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
    reRender:
      months[selectedMonthId][path[0]][path[1]].transactions &&
      months[selectedMonthId][path[0]][path[1]].transactions[0],
    isClosed: path[0] === 'debitCard' ? months[selectedMonthId][path[0]].isClosed : false,
  };
};

TransactionsSection.propTypes = {
  accountLabel: PropTypes.string,
  currency: PropTypes.string,
  transactions: PropTypes.array,
  type: PropTypes.array,
  toggleExpensesModal: PropTypes.func,
  renderExpenses: PropTypes.func,
  isClosed: PropTypes.bool,
};

TransactionsSection.defaultProps = {
  accountLabel: 'Transakcje',
  transactions: [],
  isClosed: false,
};

export default connect(mapStateToProps)(TransactionsSection);
