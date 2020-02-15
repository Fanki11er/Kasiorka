import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import AccountHeaderSection from '../../molecules/AccountHeaderSection/AccountHeaderSection';
import withViewsContext from '../../../hoc/withViewsContext';
import AccountFixedExpensesSection from '../../molecules/AccountFixedExpensesSection/AccountFixedExpensesSection';
import TransactionsSection from '../../molecules/TransactionsSection/TransactionsSection';
import withExpensesModal from '../../../hoc/withExpensesModal';
import MoneyRow from '../../atoms/MoneyRow/MoneyRow';

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoneyAccount = ({
  viewsContext: { selectedMonthId },
  expensesModalContext: { toggleExpensesModal },
}) => {
  const renderExpenses = (expenses, currency, type) => {
    return (
      expenses &&
      expenses.map(({ name, percentage, predicted, real, action }, index) => (
        <MoneyRow
          label={name}
          content={{ percentage, predicted, real, action }}
          units={currency}
          key={index}
          type={type}
          id={index}
        />
      ))
    );
  };

  return (
    <StyledAccount>
      <AccountHeaderSection selectedMonthId={selectedMonthId} />
      <AccountFixedExpensesSection
        selectedMonthId={selectedMonthId}
        renderExpenses={renderExpenses}
      />
      <TransactionsSection
        renderExpenses={renderExpenses}
        selectedMonthId={selectedMonthId}
        path={['mainAccount', 'transactions']}
        toggleExpensesModal={toggleExpensesModal}
      />
    </StyledAccount>
  );
};

MoneyAccount.propTypes = {
  viewsContext: PropTypes.object.isRequired,
};

export default compose(withViewsContext, withExpensesModal)(MoneyAccount);
