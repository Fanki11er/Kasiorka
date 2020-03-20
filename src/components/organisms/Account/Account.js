import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import withViewsContext from '../../../hoc/withViewsContext';
import AccountFixedExpensesSection from '../../molecules/AccountFixedExpensesSection/AccountFixedExpensesSection';
import MainAccountHeaderSection from '../../molecules/MainAccountHeaderSection/MainAccountHeaderSection';
import WalletHeaderSection from '../../molecules/WalletHeaderSection/WalletHeaderSection.js';
import TransactionsSection from '../../molecules/TransactionsSection/TransactionsSection';
import OtherAccountsSection from '../../molecules/OtherAccountsSection/OtherAccountsSection';
import withExpensesModal from '../../../hoc/withExpensesModal';
import MoneyRow from '../../atoms/MoneyRow/MoneyRow';

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
`;

const Account = ({
  accountName,
  viewsContext: { selectedMonthId },
  expensesModalContext: { toggleExpensesModal, toggleDeleteFixedTransactionsModal },
}) => {
  const renderExpenses = (expenses, currency, type) => {
    return expenses.map(({ name, percentage, predicted, real, action }, index) => (
      <MoneyRow
        label={name}
        content={{ percentage, predicted, real, action }}
        units={currency}
        key={index}
        type={type}
        id={index}
      />
    ));
  };

  return (
    <StyledAccount>
      {accountName === 'mainAccount' && (
        <MainAccountHeaderSection selectedMonthId={selectedMonthId} path={[accountName, null]} />
      )}
      {accountName === 'wallet' && (
        <WalletHeaderSection selectedMonthId={selectedMonthId} path={[accountName, null]} />
      )}
      {accountName === 'mainAccount' && (
        <OtherAccountsSection
          renderExpenses={renderExpenses}
          selectedMonthId={selectedMonthId}
          path={[accountName, 'accounts']}
        />
      )}
      <AccountFixedExpensesSection
        renderExpenses={renderExpenses}
        selectedMonthId={selectedMonthId}
        toggleExpensesModal={toggleExpensesModal}
        toggleDeleteFixedTransactionsModal={toggleDeleteFixedTransactionsModal}
        path={[accountName, 'fixedExpenses']}
      />
      <TransactionsSection
        renderExpenses={renderExpenses}
        toggleExpensesModal={toggleExpensesModal}
        selectedMonthId={selectedMonthId}
        path={[accountName, 'transactions']}
      />
    </StyledAccount>
  );
};

Account.propTypes = {
  viewsContext: PropTypes.object.isRequired,
};

export default compose(withViewsContext, withExpensesModal)(Account);
