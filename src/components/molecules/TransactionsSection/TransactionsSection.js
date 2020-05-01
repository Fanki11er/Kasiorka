import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { initGA, eventGa } from '../../../tools/reactGaSetup';
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
const addButtonTitle = 'Dodaj nową transakcję';
const deleteButtonTitle = 'Usuń transakcję';

const TransactionsSection = ({
  accountLabel,
  transactions,
  currency,
  type,
  path,
  toggleExpensesModal,
  toggleDeleteTransactionsModal,
  selectedMonthId,
  renderExpenses,
  isClosed,
  uid,
}) => {
  useEffect(() => initGA(uid), [uid]);
  return (
    <AccountStyledSection>
      <AccountHeader label={accountLabel} forSection={true} />
      <StyledFlex>
        <AccountButton
          onClick={() => {
            toggleExpensesModal(null, type, 'add');
            eventGa('Transactions', 'Add', type.toString());
          }}
          className={isClosed ? 'noActive' : null}
          disabled={isClosed ? true : false}
          title={addButtonTitle}
        >
          Dodaj
        </AccountButton>
        <AccountButton
          onClick={() => {
            toggleDeleteTransactionsModal(selectedMonthId, path);
            eventGa('Transactions', 'Delete', type.toString());
          }}
          className={isClosed || !transactions.length ? 'noActive' : null}
          disabled={isClosed || !transactions.length ? true : false}
          title={deleteButtonTitle}
        >
          Usuń
        </AccountButton>
      </StyledFlex>
      <StyledMainSection>
        {transactions.length > 0 && renderExpenses(transactions, currency, type)}
      </StyledMainSection>
    </AccountStyledSection>
  );
};

const mapStateToProps = (
  { money: { months }, user: { hoursSettings }, firebase: { auth } },
  { selectedMonthId, path },
) => {
  return {
    uid: auth.uid,
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
  uid: PropTypes.string,
};

TransactionsSection.defaultProps = {
  accountLabel: 'Transakcje',
  transactions: [],
  isClosed: false,
};

export default connect(mapStateToProps)(TransactionsSection);
